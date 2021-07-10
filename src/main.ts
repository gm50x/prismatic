import { NestFactory } from '@nestjs/core';

import { PrismaService } from '@prismatic/services';
import { AppModule } from '@prismatic/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
