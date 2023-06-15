import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3600

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3600, () => {
    console.log(`server is running on ${PORT}`)
  });

}
bootstrap();
