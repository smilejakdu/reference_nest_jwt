import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "src/users/users.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/UserEntity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: "ash_jwt",
      signOptions: { expiresIn: "6000s" },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
