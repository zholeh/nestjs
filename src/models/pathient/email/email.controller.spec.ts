import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { DatabaseModule } from '../../../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Models } from '../../../shared/const';
import { PathienEmailsSchema } from '../dto/email.dto';

describe('Email Controller', () => {
  let controller: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [EmailService],
      imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: Models.pathient.name, schema: PathienEmailsSchema }]),
        MongooseModule.forFeature([{ name: Models.email.name, schema: PathienEmailsSchema }]),
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
