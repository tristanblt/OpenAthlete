import { Controller, Get } from '@nestjs/common';

import { user } from '@openathlete/database';

import { PrismaService } from './prisma/services/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getHello(): Promise<user[]> {
    return this.prisma.user.findMany();
  }
}
