import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Настройка глобального пайпа для валидации
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const messages = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return {
        statusCode: 400,
        message: 'Validation failed',
        errors: messages,
      };
    },
  }));
  
  await app.listen(process.env.MY_APP_PORT ?? 3000);
}
bootstrap();
