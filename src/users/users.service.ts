import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.user.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async findOne(username: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (foundUser && foundUser.password) {
      const { password, ...result } = foundUser;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { username: username, password: password },
    });
    if (!foundUser) {
      return "does not exist user";
    }
    const payload = { username: foundUser.username, sub: foundUser.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userProfile(userId: number, username: string) {
    console.log(userId, username);
    const foundUser = await this.usersRepository.findOne({
      where: { userId: userId, username: username },
    });
    console.log(foundUser);
    if (!foundUser) {
      return "does not exist user";
    }
    delete foundUser.password;
    return foundUser;
  }
}
