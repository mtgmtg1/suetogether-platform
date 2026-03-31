// ============================================================
// [Flow: 앙 부트스트랩 → Prisma 초기화 → 미들웨어 등록 → 서버 시작]
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 (로컬 개발 & Vercel 배포 도메인 대응)
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true);
      // Vercel Preview URL (*.vercel.app), Vercel Production, Localhost 등 환경 모두 허용
      const allowedOrigins = [
        /^http:\/\/localhost:\d+$/,
        /^https:\/\/.*\.vercel\.app$/, // Vercel Preview/Production URL
        /^https:\/\/suetogether\.com$/,  // 향후 사용될 프로덕션 도메인
      ];

      const isAllowed = allowedOrigins.some((regex) => regex.test(origin));
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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

  // Swagger (OpenAPI) 설정
  const config = new DocumentBuilder()
    .setTitle('SueTogether API')
    .setDescription('SueTogether B2B LegalTech Platform API 명세서')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`SueTogether API running on port ${port}`);
}

bootstrap();
