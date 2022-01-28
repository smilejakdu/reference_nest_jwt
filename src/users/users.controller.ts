import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Request,
  Res,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";

export class LoginRequestDto {
  @ApiProperty({
    example: "ash",
    description: "username",
  })
  public username: string;

  @ApiProperty({
    example: "123",
    description: "password",
  })
  public password: string;
}

@ApiTags("USERS")
@Controller("users")
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginRequestDto) {
    const { username, password } = body;
    return await this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get("profile")
  async getProfile(@Request() req) {
    const { userId, username } = req.user;
    return {
      userId: userId,
      username: username,
    };
  }
}
