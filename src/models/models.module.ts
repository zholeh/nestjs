import { Module } from '@nestjs/common';
import { PathientModule } from './pathient/pathient.module';

@Module({
  imports: [PathientModule],
})
export class ModelsModule {}
