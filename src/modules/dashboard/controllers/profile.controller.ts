import { Controller, Get, Post, Res, Req, Body, UseInterceptors, UploadedFile, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProfileService } from '../services/profile.service';
import { UpdateUserDto } from '../../user/dto';
import { PassportAuthGuard, RolesGuard } from '@guards';

@UseGuards(PassportAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) { }

    @Get()
    async getProfile(@Res() res) {
        try {
            return res.render('admin/profile');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    /**
     * Post form data (user profile)
     * @param req Request
     * @param res Response
     * @param bodyDto Update User profile fields
     * @param avatar Uploaded file
     */
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/images/avatar')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '_' + file.originalname.replace(/#|\'|%/gi, ''));
            }
        })
    }))
    @Post()
    async updateProfile(@Req() req, @Res() res, @Body() bodyDto: UpdateUserDto, @UploadedFile() avatar) {
        try {
            let updatedUser = await this.profileService.getUpdate(avatar, bodyDto);
            req.session.passport.user = updatedUser;
            return res.render('admin/profile', { user: updatedUser, status: 'success', message: 'Profile updated successfully' });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
