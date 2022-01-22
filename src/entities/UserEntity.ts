import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("userId", ["userId"], { unique: true })
@Entity({ schema: "jwt_test2", name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public userId: number;

  @ApiProperty({
    example: "username",
    description: "username",
  })
  @Column()
  public username: string;

  @ApiProperty({
    example: "password",
    description: "password",
  })
  @Column()
  public password: string;
}
