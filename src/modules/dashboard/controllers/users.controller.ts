import { Controller, Get, Post, Res, Req, Param, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { Roles } from '@decorators';
import { UserService } from '../../user/user.service';
import { UpdateUserDto } from '../../user/dto';
import { PassportAuthGuard, RolesGuard } from '@guards';

@UseGuards(PassportAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) { }

    /**
     * Get all dashboard users
     */
    @Get()
    @Roles('admin')
    async getUsers(@Res() res) {
        try {
            let users = await this.userService.findAll();
            return res.render('admin/users', { users: users });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Update user status (ability to "Sign in" into Dashboard)
     * @param res Response
     * @param updateDto 
     */
    @Get('activate/:id/:status')
    @Roles('admin')
    async setUserStatus(@Res() res, @Param() updateDto: UpdateUserDto) {
        try {
            let updated = await this.userService.updateStatus(updateDto);
            return res.json({ message: updated });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
