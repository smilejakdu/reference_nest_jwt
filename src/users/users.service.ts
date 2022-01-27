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
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
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
      userId: foundUser.userId,
      username: foundUser.username,
    };
  }

  async userProfile(userId: number, username: string) {
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
