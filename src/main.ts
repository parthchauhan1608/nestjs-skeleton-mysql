import * as dotenv from 'dotenv';
dotenv.config();
import '../config/winston';
const rTracer = require('cls-rtracer');
import { NestFactory } from '@nestjs/core';
import retrieveSecrets from '../config/retrieveSecrets';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import i18n from '../config/i18n';

retrieveSecrets
  .initializeEnv()
  .then(() => {
    return import('./app.module');
  })
  .then(async ({ AppModule }) => {
    const app = await NestFactory.create(AppModule);
    const port = +process.env.PORT || 8000;
    app.enableCors();

    /* Set Localisation  */
    app.use(i18n.init);

    /* Centralised incoming api call logs */
    const modifyResponseBody = (req: any, res: any, next: any) => {
      let logDetail: any = {
        action: "apiCallInward",
        apiCall: {
          request: {
            clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            hostname: req.headers.host,
            method: req.method,
            uri: req.url,
            body: req.body,
            time: new Date(),
          },
          response: {
            statusCode: 0,
            time: ''
          }
        },
        totalTime: 0,
      };

      let oldSend = res.send;
      res.send = function (data: any) {
        logDetail.apiCall.response.time = new Date();
        logDetail.totalTime = logDetail.apiCall.response.time - logDetail.apiCall.request.time;
        logDetail.apiCall.response.statusCode = res.statusCode;

        global.logger.log({
          level: 'info',
          message: logDetail
        });
        const requestId = rTracer.id();
        if (requestId && !res.getHeader('X-Request-Id')) {
          res.setHeader('X-Request-Id', requestId);
        }
        oldSend.apply(res, arguments);
      };
      next();
    };
    app.use(modifyResponseBody);
    app.use(rTracer.expressMiddleware());

    /* Swagger cnfiguration */
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Jeeves API')
      .setDescription('Jeeves API Documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          bearerFormat: 'JWT',
          scheme: 'bearer',
          in: 'header',
          name: 'jwt',
          description: 'JWT token validation',
        },
        'bearer',
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(port);
    global.logger.info(`Listing on Port ${port}.....`);
  })
  .catch((error) => {
    global.logger.error(`Error in initializing server ${error}`);
  });
