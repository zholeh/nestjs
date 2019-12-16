import { Schema, Document } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Models } from '../../../shared/const';

export type Yes = 'Y' | 'YES';
export type No = 'N' | 'NO';
export type Consent = Yes | No;

export interface PathientEmails {
  EmailAddress?: string;
  pathientId?: string;
  consent?: Consent;
  day?: string;
}

export interface PathientEmailsDoc extends Document, PathientEmails {}

export const PathienEmailsSchema = new Schema({
  emailAddress: String,
  pathientId: { type: 'ObjectId', ref: Models.pathient.name },
  consent: String,
  day: String,
});

export class PathientEmailDto implements PathientEmails {
  @ApiPropertyOptional()
  emailAddress?: string;
  @ApiPropertyOptional()
  consent?: Consent;
  @ApiPropertyOptional()
  day?: string;
}
