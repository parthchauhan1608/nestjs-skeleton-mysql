import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import { User } from 'db/entities/user.entity';
import utils from '../../../libs/utils';
import jwt from '../../../libs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async isAuthenticatedUser(request: any): Promise<boolean> {
    let token = request.headers && request.headers['x-auth-token'];
    if (utils.empty(token)) {
      // get token from swagger
      token = request.headers && request.headers['authorization'];
      token = token && token.split(' ')[1] ? token.split(' ')[1] : token;
    }
    if (utils.empty(token)) {
      token = request.body && request.body['x-auth-token'];
    }

    const userData: any = jwt.verify(token);
    if (utils.empty(userData.userId)) {
      return false;
    }

    /* send UNAUTHORISED for non expiration token */
    const currentTime = moment();
    const tokenTime = moment(userData.iat, 'X');
    const duration = moment.duration(currentTime.diff(tokenTime));
    const hours = duration.asHours();
    if (hours >= 2) {
      try {
        global.logger.info(`User is identified that he has used expired/invalid token userId : ${userData.userId}`);
        return false;
      } catch (error) {
        global.logger.error(`User is identified invalid ERROR : ${error}`);
      }
    }
    /**********************************************/

    const user: any = this.userModel.findOne({
      where: { id: userData.userId }
    });

    if (!user || userData.role !== user.role) {
      return false;
    } else {
      request.authUser = user;
      return true;
    }
  }
}
