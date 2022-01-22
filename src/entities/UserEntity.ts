import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
