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
import {
  ApiBearerAuth,
  ApiHeader,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";

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
  constructor(private userService: UsersService) {}

  // @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() body: LoginRequestDto) {
    const { username, password } = body;
    return await this.userService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @Get("profile")
  getProfile(@Request() req) {
    console.log("123");
    console.log(req);
    const { username, userId } = req.user;
    return this.userService.userProfile(userId, username);
  }
}
