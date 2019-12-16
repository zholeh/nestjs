import { Schema, Document } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export interface Pathient {
  programIdentifier?: string;
  dataSource?: string;
  cardNumber?: string;
  memberID?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  telephoneNumber?: string;
  mobilePhone?: string;
}

export interface PathientDoc extends Document, Pathient {}

export const PathientSchema = new Schema(
  {
    programIdentifier: String,
    dataSource: String,
    cardNumber: String,
    memberID: String,
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    telephoneNumber: String,
    mobilePhone: String,
  },
  {
    timestamps: true,
  },
);

export const PathienEmailsSchema = new Schema({
  emailAddress: String,
  consent: String,
});

export class PathientDto implements Pathient {
  @ApiPropertyOptional()
  programIdentifier?: string;
  @ApiPropertyOptional()
  dataSource?: string;
  @ApiPropertyOptional()
  cardNumber?: string;
  @ApiPropertyOptional()
  memberID?: string;
  @ApiPropertyOptional()
  firstName?: string;
  @ApiPropertyOptional()
  lastName?: string;
  @ApiPropertyOptional()
  dateOfBirth?: string;
  @ApiPropertyOptional()
  address1?: string;
  @ApiPropertyOptional()
  address2?: string;
  @ApiPropertyOptional()
  city?: string;
  @ApiPropertyOptional()
  state?: string;
  @ApiPropertyOptional()
  zipCode?: string;
  @ApiPropertyOptional()
  telephoneNumber?: string;
  @ApiPropertyOptional()
  mobilePhone?: string;
}
