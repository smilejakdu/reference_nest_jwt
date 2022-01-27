import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      return user;
    }
    return null;
  }

  async makeToken(username: string, userId: number) {
    const payload = { username: username, userId: userId };
    return await this.jwtService.signAsync(payload);
  }
}
