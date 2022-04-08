import { SequelizeModule } from '@nestjs/sequelize';
import dbConfig from '../../config/database';

export default SequelizeModule.forRoot(dbConfig);
