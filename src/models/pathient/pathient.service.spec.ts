import { Test, TestingModule } from '@nestjs/testing';
import { PathientService } from './pathient.service';
import { DatabaseModule } from '../../database/database.module';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { PathientSchema, PathientDoc } from './dto/pathient.dto';
import { PathienEmailsSchema, PathientEmailsDoc } from './dto/email.dto';
import * as fs from 'fs';
import * as Path from 'path';
import { Models } from '../../shared/const';
import { Model } from 'mongoose';

class TestService {
  public constructor(
    @InjectModel(Models.pathient.name)
    public readonly pathientModel: Model<PathientDoc>,
    @InjectModel(Models.email.name)
    public readonly emailModel: Model<PathientEmailsDoc>,
  ) {}
}

describe('PathientService', () => {
  let service: PathientService;
  let pathients: string;

  beforeAll(async () => {
    const module1: TestingModule = await Test.createTestingModule({
      providers: [PathientService, TestService],
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

    const testService = module1.get<TestService>(TestService);
    await testService.pathientModel.remove({});
    await testService.emailModel.remove({});
    service = module1.get<PathientService>(PathientService);
    pathients = fs.readFileSync(
      Path.join(__dirname, '../../../mock/pathients.csv'),
      'utf8',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('read pathients', async () => {
    let res;
    try {
      res = await service.uploadFromString(pathients);
    } catch (err) {
      res = err;
    }
    expect(res).toBe(true);
  });
});
