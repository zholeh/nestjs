import { Test, TestingModule } from '@nestjs/testing';
import { PathientController } from './pathient.controller';
import { DatabaseModule } from '../../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PathientSchema, PathienEmailsSchema } from './dto/pathient.dto';
import { PathientService } from './pathient.service';
import { Models } from '../../shared/const';

describe('Pathient Controller', () => {
  let controller: PathientController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathientController],
      providers: [PathientService],
      imports: [
        DatabaseModule,
        MongooseModule.forFeature([
          { name: Models.pathient.name, schema: PathientSchema },
        ]),
        MongooseModule.forFeature([
          { name: Models.email.name, schema: PathienEmailsSchema },
        ]),
      ],
    }).compile();

    controller = module.get<PathientController>(PathientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
