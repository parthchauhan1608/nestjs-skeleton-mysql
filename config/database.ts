import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { MYSQL_CONFIG } from './config';

let config: SequelizeModuleOptions = {
  username: MYSQL_CONFIG.user,
  password: MYSQL_CONFIG.password,
  database: MYSQL_CONFIG.database,
  host: MYSQL_CONFIG.host,
  dialect: 'mysql',
  autoLoadModels: true,
  synchronize: false,
  retry: {
    match: [/Deadlock/i],
    max: 5,
  },
};

const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  config = {
    ...config,
    logging: false,
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
    },
  };
}

export default config;
