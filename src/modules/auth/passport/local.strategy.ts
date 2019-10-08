import { Injectable, Req, Res } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthError } from '@exceptions';

@Injectable()
export class LocalStrategySignIn extends PassportStrategy(Strategy, 'signin') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        });
    }

    public async validate(@Res() res, email: string, password: string) {
        const user = await this.authService.signIn({ email, password });
        if (!user) {
            throw new AuthError('Incorrect email or password');
        }
        return user;
    }
}

@Injectable()
export class LocalStrategySignUp extends PassportStrategy(Strategy, 'signup') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        });
    }

    public async validate(@Req() req, email: string, password: string) {
        if (req.user) {
            return req.user;
        }
        const user = await this.authService.signUp({
            email,
            password,
            fullname: req.body.fullname,
        });
        return user;
    }
}
