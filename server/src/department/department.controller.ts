import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from '../database/entities/department.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/database/entities';

@Controller('api/departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  async findAllAdmin(@CurrentUser() user: User): Promise<Department[]> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.departmentService.findAllAdmin();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() departmentData: Partial<Department>,
    @CurrentUser() user: User,
  ): Promise<Department> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.departmentService.create(departmentData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() departmentData: Partial<Department>,
    @CurrentUser() user: User,
  ): Promise<Department> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.departmentService.update(id, departmentData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<void> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.departmentService.remove(id);
  }
}
