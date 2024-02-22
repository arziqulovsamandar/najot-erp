import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    const port = process.env.PORT || 1;
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Clening Service Project')
      .setDescription('Mini project for clening service finder')
      .setVersion('1.0.0')
      .addTag('NESTJS,NODEJS,JWT,OTP,Postgres,Sequielize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('dosc', app, document);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    app.listen(port, () => {
      console.log(`server ${port}-Portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
