import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DatabaseExceptionsFilter } from './middleware/database-exceptions.filter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('sql_injection_demo')
    .setDescription('Here we get all the APIs of SQL_injection_demo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //database config
  app.useGlobalFilters(new DatabaseExceptionsFilter());

  //Email config
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  //cors origin config
  const corsOrigins = process.env.URL_ORGIN;
  console.log('Cross origin', process.env.URL_ORIGIN);
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
