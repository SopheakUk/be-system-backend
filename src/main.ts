import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });

    swagger(app);

    await app.listen(process.env.PORT ?? 3001);
}

function swagger(app: INestApplication<any>) {
    const config = new DocumentBuilder()
        .setTitle('Nest API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addBearerAuth() // optional, if using JWT
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}

bootstrap();
