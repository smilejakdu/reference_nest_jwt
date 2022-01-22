import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("jwt example")
    .setDescription("JWT TEST API description")
    .setVersion("1.0")
    .addTag("jwt_test")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apis", app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
