import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { UserEntity } from "./entities/UserEntity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { LoggerMiddleware } from "./middlewares/logger.middlewares";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity], // 사용할 entity의 클래스명을 넣어둔다.
      synchronize: true, // false로 해두는 게 안전하다.
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
