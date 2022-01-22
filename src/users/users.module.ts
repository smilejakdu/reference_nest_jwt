import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/constants";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtStrategy } from "src/strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/UserEntity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
