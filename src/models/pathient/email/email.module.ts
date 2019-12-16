import { Module } from '@nestjs/common';
import { Models } from '../../../shared/const';
import { PathienEmailsSchema } from '../dto/email.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from './email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Models.email.name, schema: PathienEmailsSchema },
    ]),
  ],
  providers: [EmailService],
})
export class EmailModule {}
