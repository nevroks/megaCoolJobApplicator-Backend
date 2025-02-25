import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/services';


@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  
  async getCount() {
    return await this.prisma.user.count();
  }
}
