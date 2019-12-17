import { Controller, Post, Body, Get } from '@nestjs/common';
import { PathientService } from './pathient.service';
import { PathientDto, Pathient } from './dto/pathient.dto';

@Controller('pathient')
export class PathientController {
  constructor(private readonly pathientService: PathientService) {}
  @Post()
  async create(@Body() pathientDto: PathientDto) {
    this.pathientService.create(pathientDto);
  }

  @Get('all')
  async findAll(): Promise<Pathient[]> {
    return this.pathientService.findAll();
  }

  @Get()
  async findOne(): Promise<Pathient | null> {
    return this.pathientService.findOne();
  }
}
