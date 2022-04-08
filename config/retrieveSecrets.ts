import * as AWS from 'aws-sdk';
/* load AWS Secrets Manager */
const SECRETS_MANAGER_CONFIG = {
  region: process.env.AWS_SECRETS_MANAGER_REGION,
  accessKeyId: process.env.AWS_SECRETS_MANAGER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRETS_MANAGER_SECRET_KEY,
  sessionToken: process.env.AWS_SECRETS_MANAGER_SESSION_TOKEN,
};
const secretsManager = new AWS.SecretsManager(SECRETS_MANAGER_CONFIG);

/******************** Secrets Manager Methods *****************************/
/* In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
 See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
 We rethrow the exception by default. */
const initializeEnv = () => {
  return new Promise((resolve, reject) => {
    secretsManager.getSecretValue(
      { SecretId: process.env.AWS_SECRETS_MANAGER_SECRET_ID },
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        if ('SecretString' in data) {
          const secret = JSON.parse(data.SecretString);
          for (const key in secret) {
            if (key) {
              process.env[key] = secret[key];
            }
          }
          resolve(true);
        } else {
          reject(new Error('Could not receive secret keys from aws manager.'));
        }
      },
    );
  });
};

export default {
  initializeEnv,
};
