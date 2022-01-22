import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("userId", ["userId"], { unique: true })
@Entity({ schema: "jwt_test2", name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
