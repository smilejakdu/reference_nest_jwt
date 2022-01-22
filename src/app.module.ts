import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      entities: [User], // 사용할 entity의 클래스명을 넣어둔다.
      synchronize: true, // false로 해두는 게 안전하다.
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
