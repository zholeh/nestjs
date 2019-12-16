import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ModelsModule } from './models/models.module';
import { ConfigService } from './shared/config/config.service';
import { ConfigModule } from './shared/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
