import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,
    AuthenticationModule,
     JwtModule.register({
      global:true,
      secret:`${process.env.SECRET_KEY}`,
      signOptions:{expiresIn:'1h'}
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthenticationModule],
})
export class AppModule {}
