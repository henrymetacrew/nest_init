import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';

@Module({
  providers: [ChaptersService],
  controllers: [ChaptersController],
})
export class ChaptersModule {}
