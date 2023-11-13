import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppStart } from './common/config/appStart.config';
import './common/extensions/index'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  AppStart.setApp(app);
  app.useStaticAssets(join(__dirname, '/uploads/Location'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
 