// ============================================================
// [Flow: 앙 부트스트랩 → Prisma 초기화 → 미들웨어 등록 → 서버 시작]
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // 전역 밸리데이션 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API 프리픽스
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`SueTogether API running on port ${port}`);
}

bootstrap();
