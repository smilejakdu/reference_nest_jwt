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
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.userService.findUser(username, password);
    const payload = { username: user.username, userId: user.userId };
    const token = await this.jwtService.signAsync(payload);
    return {
      ok: true,
      user: {
        userId: user.userId,
        username: user.username,
      },
      token: token,
    };
  }

  async makeToken(username: string, userId: number) {
    const payload = { username: username, userId: userId };
    return await this.jwtService.signAsync(payload);
  }
  async checkToken(token: any) {
    return this.jwtService.verify(token);
  }
}
