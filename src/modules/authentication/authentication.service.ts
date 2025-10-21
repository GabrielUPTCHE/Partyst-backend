import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {


    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user: User = await this.userService.getByEmail(email);
        if (user && user.email === email && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async generateJwtToken(user: User): Promise<string> {
        const payload = { user };
        return await this.jwtService.signAsync(payload);
    }
}
