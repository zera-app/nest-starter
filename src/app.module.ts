import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MailModule } from './mail.module';
import { FileController } from './controllers/file.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), MailModule, PrismaModule],
  controllers: [AppController, FileController],
  providers: [],
})
export class AppModule {}
