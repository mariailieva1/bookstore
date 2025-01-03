import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Publisher, User } from 'src/database/entities';
import { PublisherService } from './publisher.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('api/publisher')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  async findAll(): Promise<Publisher[]> {
    return this.publisherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Publisher> {
    return this.publisherService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() publisherData: Partial<Publisher>,
    @CurrentUser() user: User,
  ): Promise<Publisher> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.publisherService.create(publisherData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() publisherData: Partial<Publisher>,
    @CurrentUser() user: User,
  ): Promise<Publisher> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.publisherService.update(id, publisherData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.publisherService.remove(id);
  }
}
