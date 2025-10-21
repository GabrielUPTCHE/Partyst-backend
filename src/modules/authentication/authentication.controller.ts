import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly authservice: AuthenticationService){}

    @Post('login')
    async login(@Body() credentials: { email: string, password: string }) {
        const { email, password } = credentials;
        const user: User | null = await this.authservice.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = await this.authservice.generateJwtToken(user);
        return { token };
    }
}
