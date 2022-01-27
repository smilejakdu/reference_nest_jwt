import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Request,
  Res,
  HttpStatus,
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
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post("login")
  async login(@Body() body: LoginRequestDto) {
    const { username, password } = body;
    const foundUserWithOutPassword = await this.userService.login(
      username,
      password
    );
    if (!foundUserWithOutPassword.ok) {
      return foundUserWithOutPassword;
    }
    const madeToken = await this.authService.makeToken(
      foundUserWithOutPassword.username,
      foundUserWithOutPassword.userId
    );
    return {
      user: foundUserWithOutPassword,
      token: madeToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get("profile")
  getProfile(@Request() req, @Res() res: Response) {
    console.log("asdlfklsakdhf", req);
    return req;
    // const { userId, username } = req.user;
    // const responseFoundUserProfile = await this.userService.userProfile(
    //   userId,
    //   username
    // );
    // return res.status(HttpStatus.OK).json({
    //   responseFoundUserProfile,
    // });
  }
}
