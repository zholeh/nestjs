import { Module } from '@nestjs/common';
import { PathientService } from './pathient.service';
import { PathientController } from './pathient.controller';
import { EmailModule } from './email/email.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PathientSchema } from './dto/pathient.dto';
import { Models } from '../../shared/const';
import { PathienEmailsSchema } from './dto/email.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Models.pathient.name, schema: PathientSchema }]),
    MongooseModule.forFeature([{ name: Models.email.name, schema: PathienEmailsSchema }]),
    EmailModule,
  ],
  providers: [PathientService],
  controllers: [PathientController],
})
export class PathientModule {}
