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
import { EmailService } from './email/email.service';
import { Yes } from './dto/email.dto';

class TestService {
  public constructor(
    @InjectModel(Models.pathient.name)
    public readonly pathientModel: Model<PathientDoc>,
    @InjectModel(Models.email.name)
    public readonly emailModel: Model<PathientEmailsDoc>,
  ) {}
}

describe('PathientService', () => {
  let service!: PathientService;
  let serviceEmail: EmailService;
  let pathients: Array<{ file: string; data: string }>;
  let uploadData!: boolean;
  let uploadPathient!: any;
  let uploadEmail!: any;

  beforeAll(async () => {
    const module1: TestingModule = await Test.createTestingModule({
      providers: [PathientService, TestService, EmailService],
      imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: Models.pathient.name, schema: PathientSchema }]),
        MongooseModule.forFeature([{ name: Models.email.name, schema: PathienEmailsSchema }]),
      ],
    }).compile();

    const testService = module1.get<TestService>(TestService);
    await testService.pathientModel.deleteMany({});
    await testService.emailModel.deleteMany({});

    service = module1.get<PathientService>(PathientService);
    serviceEmail = module1.get<EmailService>(EmailService);
    const testFolder = Path.join(__dirname, '../../../mock/');
    pathients = fs
      .readdirSync(testFolder)
      .filter(file => {
        return /^day\d+\.csv$/i.test(file);
      })
      .map(file => {
        const path = Path.join(testFolder, file);
        return {
          file: (file.match(/day\d+/i) || [''])[0],
          data: fs.readFileSync(path, 'utf8'),
        };
      });

    try {
      uploadData = await service.uploadFromString(pathients);
    } catch (err) {
      uploadData = err;
    }

    if (uploadData) {
      uploadPathient = await service.findAll();
      uploadEmail = await serviceEmail.findAll();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('upload pathients', async () => {
    expect(uploadData).toBe(true);
  });

  it('first name is missing', () => {
    const msg = uploadPathient.reduce((acc: any, el: any, i: number) => {
      if (el.firstName.trim() === '') {
        acc.push(`Row # ${i}: missing first name`);
      }
      return acc;
    }, [] as string[]);
    expect(msg.join('\n')).toEqual('');
  });

  it('Email address is missing but consent is Y ', () => {
    const msg = uploadEmail.reduce((acc: any, el: any, i: number) => {
      const consent = (el.consent as string).trim().toLowerCase();
      if (el.emailAddress.trim() === '' && (consent === 'yes' || consent === 'y')) {
        acc.push(`Row # ${i}: missing email`);
      }
      return acc;
    }, [] as string[]);
    expect(msg.join('\n')).toEqual('');
  });

  it('Verify Emails for consent is Y ', () => {
    const validator = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const msg = uploadEmail.reduce((acc: any, el: any, i: number) => {
      const consent = (el.consent as string).trim().toLowerCase();
      const emailAddress = (el.emailAddress as string).trim().toLowerCase();
      if (emailAddress !== '' && !validator.test(emailAddress) && (consent === 'yes' || consent === 'y')) {
        acc.push(`Row # ${i}, email ${el.emailAddress}: missing email`);
      }
      return acc;
    }, [] as string[]);
    expect(msg.join('\n')).toEqual('');
  });
});
