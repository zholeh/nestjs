import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { DatabaseModule } from '../../../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Models } from '../../../shared/const';
import { PathienEmailsSchema } from '../dto/email.dto';

describe('EmailService', () => {
  let service: EmailService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
      imports: [DatabaseModule, MongooseModule.forFeature([{ name: Models.email.name, schema: PathienEmailsSchema }])],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
