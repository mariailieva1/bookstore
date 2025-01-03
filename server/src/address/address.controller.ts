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
import { Address, User } from '../database/entities';
import { AddressService } from './address.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/address')
export class AddressController {
  constructor(
    private addressService: AddressService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllForUser(@CurrentUser() user: User): Promise<Address[]> {
    return this.addressService.findAllForUser(user.id);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Put('admin/:id')
  @UseGuards(JwtAuthGuard)
  async updateAdmin(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() addressData: Partial<Address>,
  ): Promise<any> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.addressService.updateAdmin(id, addressData);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard)
  async createAdmin(
    @Body() addressData: Partial<Address>,
    @CurrentUser() user: User,
  ): Promise<any> {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.addressService.create(addressData);
  }

  @Delete('admin/:id')
  @UseGuards(JwtAuthGuard)
  deleteAddress(@Param('id') id: number, @CurrentUser() user: User) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.addressService.remove(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<Address> {
    return this.addressService.findOne(id, user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: User,
    @Body() addressData: Partial<Address>,
  ): Promise<Address> {
    const address = await this.addressService.create(addressData);
    await this.authService.addUserAddress(address, user.id);
    return address;
  }

  @Post('anonymous')
  async createAnonymous(
    @Body() addressData: Partial<Address>,
  ): Promise<Address> {
    const address = await this.addressService.create(addressData);
    // await this.authService.addUserAddress(address);
    return address;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() addressData: Partial<Address>,
  ): Promise<Address> {
    return this.addressService.update(id, user.id, addressData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<void> {
    return this.addressService.remove(id, user.id);
  }
}
