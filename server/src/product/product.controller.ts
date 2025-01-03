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
import { ProductService } from './product.service';
import { Product, User } from 'src/database/entities';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('recommended')
  @UseGuards(JwtAuthGuard)
  getRecommended(@CurrentUser() user: User) {
    return this.productService.findRecommended(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() productData: Partial<Product>,
    @CurrentUser() user: User,
  ): Promise<Product> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.productService.create(productData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
    @CurrentUser() user: User,
  ): Promise<Product> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.productService.remove(id);
  }
}
