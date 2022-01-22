import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(private readonly jwtService: JwtService) {
    this.users = [
      {
        userId: 1,
        username: "john",
        password: "changeme",
      },
      {
        userId: 2,
        username: "chris",
        password: "secret",
      },
      {
        userId: 3,
        username: "maria",
        password: "guess",
      },
    ];
  }
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.user.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async findOne(username: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.username === username);
    if (foundUser && foundUser.password) {
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userProfile() {
    return;
  }
}
