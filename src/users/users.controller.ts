import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() body) {
    const { username, password } = body;
    return await this.userService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
