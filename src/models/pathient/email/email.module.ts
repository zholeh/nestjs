import { Module } from '@nestjs/common';
import { Models } from '~shared/const';
import { PathienEmailsSchema } from '../dto/pathient.dto';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Models.email.name, schema: PathienEmailsSchema },
    ]),
  ],
})
export class EmailModule {}
