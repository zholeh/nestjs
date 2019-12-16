import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    this.envConfig = dotenv.parse(
      fs.readFileSync(`${__dirname}\\..\\..\\..\\config\\${filePath}`),
    );
  }

  get(key: string): string {
    return this.envConfig[key];
  }
  getNumber(key: string): number {
    return parseInt(this.envConfig[key], 10);
  }
}
