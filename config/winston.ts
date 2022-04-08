import { createLogger, format, transports } from 'winston';
const rTracer = require('cls-rtracer')

const customFormat = format.printf((info) => {
    const requestId: any = rTracer.id();
    const logData: any = {
        timestamp: info.timestamp,
        level: info.level,
    };
    if (requestId) {
        logData.requestId = requestId;
    }
    logData.message = info.message;
    return JSON.stringify(logData);
});

function createLoggerFor(level) {
    return createLogger({
        format: format.combine(format.timestamp(), customFormat),
        transports: [new transports.Console()],
    });
}

global.logger = createLoggerFor("log");
