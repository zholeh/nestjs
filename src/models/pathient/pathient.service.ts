import { Model, Document, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PathientDoc, PathientDto, Pathient } from './dto/pathient.dto';
import { Models } from '../../shared/const';
import { PathientEmailsDoc } from './dto/email.dto';

interface StrObject {
  [key: string]: string;
}

@Injectable()
export class PathientService {
  public constructor(
    @InjectModel(Models.pathient.name)
    private readonly pathientModel: Model<PathientDoc>,
    @InjectModel(Models.email.name)
    private readonly emailModel: Model<PathientEmailsDoc>,
  ) {}

  private validateUploadingData(arrValidate: string[][]): string {
    if (arrValidate.length === 0) {
      return 'Empty data';
    }
    const firstRowLength = arrValidate[0].length;
    let errString = '';
    for (let index = 1; index < arrValidate.length; index++) {
      const element = arrValidate[index];
      if (element.length !== firstRowLength) {
        errString += `/n
          Mistake in row number ${index + 1}`;
      }
    }
    return errString;
  }

  // tslint:disable: object-literal-key-quotes
  private readonly pathientsDataSynonyms = {
    'Program Identifier': 'programIdentifier',
    'Data Source': 'dataSource',
    'Card Number': 'cardNumber',
    'Member ID': 'memberID',
    'First Name': 'firstName',
    'Last Name': 'lastName',
    'Date of Birth': 'dateOfBirth',
    'Address 1': 'address1',
    'Address 2': 'address2',
    City: 'city',
    State: 'state',
    'Zip code': 'zipCode',
    'Telephone number': 'telephoneNumber',
    'Email Address': 'emailAddress',
    CONSENT: 'CONSENT',
    'Mobile Phone': 'mobilePhone',
  } as StrObject;
  // tslint:enable: object-literal-key-quotes

  private getColumnIdentificator(columnSynonym: string): string {
    return this.pathientsDataSynonyms[columnSynonym] || '';
  }

  async uploadFromString(data: string): Promise<boolean> {
    const arr = data.split(/\r?\n/).map(el => el.split('|'));
    const err = this.validateUploadingData(arr);
    if (err) {
      throw new Error(err);
    }
    const header = arr[0].reduce((acc, el) => {
      acc.push(this.getColumnIdentificator(el));
      return acc;
    }, [] as string[]);

    const { pathients: pathientsData, emails: emailsData } = arr.reduce(
      (acc, el, i) => {
        if (i !== 0) {
          const pathientData = el.reduce(
            (accPathient, elPathient, iPathient) => {
              accPathient[header[iPathient]] = elPathient;
              return accPathient;
            },
            {} as any,
          );
          const pathients = new this.pathientModel(pathientData);
          acc.pathients.push(pathients);

          const emails = new this.emailModel(pathientData);
          emails.pathientId = pathients._id;
          acc.emails.push(emails);
        }

        return acc;
      },
      { pathients: [] as PathientDoc[], emails: [] as PathientEmailsDoc[] },
    );

    return Promise.all([
      this.pathientModel.insertMany(pathientsData),
      this.emailModel.insertMany(emailsData),
    ])
      .then((res: any[]) => {
        return true;
      })
      .catch(error => {
        throw error;
      });
  }

  async create(pathientDto: PathientDto): Promise<PathientDoc> {
    const createdPathient = new this.pathientModel(pathientDto);

    return await createdPathient.save();
  }

  async findAll(): Promise<PathientDoc[]> {
    return await this.pathientModel
      .find()
      .lean()
      .exec();
  }

  async findOne(filter?: Pathient): Promise<PathientDoc | null> {
    const user = await this.pathientModel
      .findOne(filter)
      .lean()
      .exec();

    return user;
  }
}
