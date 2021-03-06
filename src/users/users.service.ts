import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findOne(username: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (foundUser && foundUser.password) {
      const { password, ...result } = foundUser;
      return {
        ok: true,
        userId: result.userId,
        username: result.username,
      };
    }
    return null;
  }

  async findUser(username: string, password: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { username: username, password: password },
    });
    if (!foundUser) {
      return {
        ok: false,
        statusCode: 400,
      };
    }
    delete foundUser.password;
    return {
      ok: true,
      userId: foundUser.userId,
      username: foundUser.username,
    };
  }

  async userProfile(userId: number, username: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { userId: userId, username: username },
    });
    if (!foundUser) {
      return "does not exist user";
    }
    delete foundUser.password;
    return foundUser;
  }
}
