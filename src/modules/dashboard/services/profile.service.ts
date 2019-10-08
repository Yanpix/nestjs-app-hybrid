import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserService } from '../../user/user.service';
import { SelectUserDto } from '../../user/dto';
import { ProfileError } from '@exceptions';

@Injectable()
export class ProfileService {
    constructor(
        private readonly userService: UserService,
    ) { }
    
    /**
     * Update user profile in database
     * @param avatar Object: get - filename
     * @param userData Object: UpdateUserDto
     */
    async getUpdate(avatar: { filename: string }, userData): Promise<SelectUserDto> {

        let updateInfo: any = {
            fullname: userData.fullname,
            email: userData.email,
        }

        if (avatar != undefined) {
            updateInfo.image = `/images/avatar/${avatar.filename}`;
        }

        let verifPass = await this.comparePasswords(userData);
        if (verifPass) {
            updateInfo.password = verifPass;
        }

        let user = await this.userService.updateProfile(userData.id, updateInfo);

        return plainToClass(SelectUserDto, user);
    }

    /**
     * Compare passwords
     * @param data Object: get - User ID, password and old password
     */
    async comparePasswords(data: { id: string, password: string, old_password: string }) {
        if (data.password != '' && data.old_password == '') {
            throw new ProfileError('Old password and new password should not be empty');
        }

        if (data.old_password != '' && data.old_password != undefined && data.password != '' && data.password != undefined) {
            let user = await this.userService.findById(data.id);
            if (await user.validatePassword(data.old_password)) {
                let entity = await user.setPassword(data.password);
                return entity.password;
            } else {
                throw new ProfileError('Old password is incorrect');
            }
        } else {
            return false;
        }
    }
}