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
import { Author, User } from 'src/database/entities';
import { AuthorService } from './author.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('api/author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() authorData: Partial<Author>,
    @CurrentUser() user: User,
  ): Promise<Author> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.authorService.create(authorData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() authorData: Partial<Author>,
    @CurrentUser() user: User,
  ): Promise<Author> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.authorService.update(id, authorData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.authorService.remove(id);
  }
}
