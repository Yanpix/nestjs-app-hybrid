import { Controller, Get, Post, Res, Req, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { PassportAuthGuard, RolesGuard } from '@guards';
import { MainService } from '../services';
import { ITiles } from '../interfaces';
import * as currencyFormatter from 'currency-formatter';

@UseGuards(PassportAuthGuard, RolesGuard)
@Controller()
export class DashboardController {

    constructor(
        private readonly mainService: MainService,
    ) { }

    @Get()
    async getIndex(@Res() res) {
        try {
            let tilesCounters: ITiles = await this.mainService.getTilesData();
            return res.render('admin/index', { ...tilesCounters, currencyFormatter: currencyFormatter });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Dashboard logout (finish session)
     */
    @Get('logout')
    getLogout(@Req() req, @Res() res) {
        req.logout()
        return res.render('auth/login');
    }
}
