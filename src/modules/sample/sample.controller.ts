import { Controller, Get, Post, UseGuards, Res, Req, Put, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AdminAuthGuard } from '../auth/admin_auth.guard';
import { SampleService } from './sample.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { ERROR400, SERVERERROR, SUCCESSCODE } from 'constants/common';

@ApiTags('sample')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
@Controller('sample')
export class SampleController {
    constructor(private readonly sampleService: SampleService) { }

    @Get('')
    findAll(@Req() req: Request, @Res() res: Response): any {
        try {
            const data = this.sampleService.getSampleData();
            return res.status(SUCCESSCODE.STANDARD).send({
                data: data,
                msg: global.t("SUCCESS"),
                status: true
            });
        } catch (error) {
            global.logger.error(`Error at findAll ${JSON.stringify(error)}`);
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: global.t(SERVERERROR.CODE) },
                status: false,
            });
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', required: true, })
    findById(@Req() req: Request, @Res() res: Response): any {
        try {
            const {
                id: id
            } = req.params;
            const data = this.sampleService.getSampleDataById(parseInt(id));
            return res.status(SUCCESSCODE.STANDARD).send({
                data: data,
                msg: global.t("SUCCESS"),
                status: true
            });
        } catch (error) {
            global.logger.error(`Error at findById ${JSON.stringify(error)}`);
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: global.t(SERVERERROR.CODE) },
                status: false,
            });
        }
    }

    @Post('')
    @ApiBody({ type: CreateSampleDto })
    create(@Req() req: Request, @Res() res: Response): any {
        try {
            const id = this.sampleService.addSampleData(req.body);
            return res.status(SUCCESSCODE.STANDARD).send({
                data: { id: id },
                msg: global.t("SUCCESS"),
                status: true
            });
        } catch (error) {
            global.logger.error(`Error at create ${JSON.stringify(error)}`);
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: global.t(SERVERERROR.CODE) },
                status: false,
            });
        }
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: 'number', required: true, })
    @ApiBody({ type: UpdateSampleDto })
    update(@Req() req: Request, @Res() res: Response): any {
        try {
            const {
                body: data,
                params: {
                    id: id
                }
            } = req;
            const sampledata = this.sampleService.getSampleDataById(parseInt(id));
            if (!sampledata) {
                return res.status(ERROR400).send({
                    msg: global.t("NO_RECORDS_FOUND"),
                    status: false
                });
            }
            this.sampleService.updateSampleData(parseInt(id), data);
            return res.status(SUCCESSCODE.STANDARD).send({
                msg: global.t("SUCCESS"),
                status: true
            });
        } catch (error) {
            global.logger.error(`Error at update ${JSON.stringify(error)}`);
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: global.t(SERVERERROR.CODE) },
                status: false,
            });
        }
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number', required: true, })
    delete(@Req() req: Request, @Res() res: Response): any {
        try {
            const {
                id: id
            } = req.params;
            const sampledata = this.sampleService.getSampleDataById(parseInt(id));
            if (!sampledata) {
                return res.status(ERROR400).send({
                    msg: global.t("NO_RECORDS_FOUND"),
                    status: false
                });
            }
            this.sampleService.deleteSampleData(parseInt(id));
            return res.status(SUCCESSCODE.STANDARD).send({
                msg: global.t("SUCCESS"),
                status: true
            });
        } catch (error) {
            global.logger.error(`Error at delete ${JSON.stringify(error)}`);
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: global.t(SERVERERROR.CODE) },
                status: false,
            });
        }
    }
}   
