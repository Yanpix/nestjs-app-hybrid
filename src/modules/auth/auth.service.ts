import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto, LoginUserDto, SelectUserDto } from '../user/dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ){};
    
    /**
     * Check login in system
     * @param options User email and password
     */
    async signIn(options: LoginUserDto) {
        try {
            const { user } = await this.userService.findByEmail(options);
            if (!(await user.validatePassword(options.password))) {
                return false;
            }
            return plainToClass(SelectUserDto, user);
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * New user registration
     * @param options 
     */
    async signUp(options: CreateUserDto) {
        try {
            await this.userService.assertEmail({
                email: options.email,
            });
        } catch (error) {
            throw error;
        }

        const newUser = await plainToClass(UserEntity, options).setPassword(options.password);

        return this.userService.create({ item: newUser });
    }
}
