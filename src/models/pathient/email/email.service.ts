import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Models } from '../../../shared/const';
import { PathientEmailsDoc, PathientEmailDto, PathientEmails } from '../dto/email.dto';

@Injectable()
export class EmailService {
  public constructor(
    @InjectModel(Models.email.name)
    private readonly emailModel: Model<PathientEmailsDoc>,
  ) {}

  public async create(emailDto: PathientEmailDto): Promise<PathientEmailsDoc> {
    const createdEmail = new this.emailModel(emailDto);

    return await createdEmail.save();
  }

  public async findAll(): Promise<PathientEmailsDoc[]> {
    const res = await this.emailModel
      .find()
      .lean()
      .exec();

    return res;
  }

  public async findOne(filter?: PathientEmails): Promise<PathientEmailsDoc | null> {
    const user = await this.emailModel
      .findOne(filter)
      .lean()
      .exec();

    return user;
  }
}
