import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;
const publicKEY = process.env.JWTPUBLICKEY;

export default {
  verify: (token) => {
    let decoded = {};
    if (token) {
      try {
        decoded = jwt.verify(token, publicKEY, {
          algorithms: ['RS256'],
          issuer: issuer,
          audience: audience,
        });
      } catch (err) {
        global.logger.error(`Error at verify() - An error occurred while verifying jwt token... ${JSON.stringify(err)}`);
      }
    }
    return decoded;
  },
};
