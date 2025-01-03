import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, User } from 'src/database/entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), AuthModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
