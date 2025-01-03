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
import { Category, User } from 'src/database/entities';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() categoryData: Partial<Category>,
    @CurrentUser() user: User,
  ): Promise<Category> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.categoryService.create(categoryData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() categoryData: Partial<Category>,
    @CurrentUser() user: User,
  ): Promise<Category> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.categoryService.update(id, categoryData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.categoryService.remove(id);
  }
}
