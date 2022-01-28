import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/UserEntity";
import { AuthModule } from "src/auth/auth.module";
import { UsersService } from "./users.service";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}
