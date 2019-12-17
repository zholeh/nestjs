import { Controller, Body, Post, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { PathientEmailDto, PathientEmails } from '../dto/email.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post()
  async create(@Body() emailDto: PathientEmailDto) {
    this.emailService.create(emailDto);
  }

  @Get('all')
  async findAll(): Promise<PathientEmails[]> {
    return this.emailService.findAll();
  }

  @Get()
  async findOne(): Promise<PathientEmails | null> {
    return this.emailService.findOne();
  }
}
