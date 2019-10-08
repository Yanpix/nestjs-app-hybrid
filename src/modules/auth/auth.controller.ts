import { Controller, Get, Post, Res, Req, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginsService } from '../logger/services';
import { ActiveGuard } from '@guards';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly loginsService: LoginsService,
    ) { }

    @Get('login')
    getLogin(@Res() res) {
        return res.render('auth/login');
    }

    /**
     * Success login and save this login to statistic
     */
    @UseGuards(ActiveGuard)
    @Post('login')
    async postLogin(@Res() res, @Req() req) {
        await this.loginsService.saveData({ userEmail: req.user.email });
        return res.redirect('/');
    }

    /**
     * API Documentation
     */
    @Get('api-doc')
    getApiDoc(@Res() res) {
        return res.render('auth/alicia-api');
    }
}
