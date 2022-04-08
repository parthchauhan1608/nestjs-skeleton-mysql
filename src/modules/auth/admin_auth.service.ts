import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import { Admin } from 'db/entities/admin.entity';
import utils from '../../../libs/utils';
import jwt from '../../../libs/jwt';

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectModel(Admin)
        private adminModel: typeof Admin,
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
        const adminData: any = jwt.verify(token);
        if (utils.empty(adminData.adminId)) {
            return false;
        }

        /* send UNAUTHORISED for non expiration token */
        const currentTime = moment();
        const tokenTime = moment(adminData.iat, 'X');
        const duration = moment.duration(currentTime.diff(tokenTime));
        const hours = duration.asHours();
        if (hours >= 2) {
            try {
                global.logger.info(`User is identified that he has used expired/invalid token adminId : ${adminData.adminId}`);
                return false;
            } catch (error) {
                global.logger.error(`User is identified invalid ERROR : ${JSON.stringify(error)}`);
            }
        }
        /**********************************************/

        const user: any = this.adminModel.findOne({
            where: { id: adminData.adminId }
        });

        if (!user || adminData.role !== user.role) {
            return false;
        } else {
            request.authUser = user;
            return true;
        }
    }
}
