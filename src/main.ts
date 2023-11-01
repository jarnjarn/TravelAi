import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppStart } from './common/config/appStart.config';
import './common/extensions/index'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppStart.setApp(app);
  await app.listen(3000);
}
bootstrap();
 