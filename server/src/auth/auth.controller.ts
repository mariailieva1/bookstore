import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { IUser } from '@interfaces/user.interface';
import { Response } from 'express';
import { IRequestStatusDto } from '@common/dtos/request-status.dto';
import { Tag, User } from 'src/database/entities';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const jwtToken = await this.authService.register(name, email, password);

    res.cookie('jwt', jwtToken, { sameSite: 'none', secure: true });

    return { status: 'success' };
  }

  @Put('tags')
  @UseGuards(JwtAuthGuard)
  updateTags(@CurrentUser() user: User, @Body('tags') tags: Tag[]) {
    return this.authService.updateUserTags(tags, user.id);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<IRequestStatusDto> {
    const user = await this.authService.validateUser(email, password);
    const jwtToken = this.authService.signJWT(user);
    res.cookie('jwt', jwtToken, { sameSite: 'none', secure: true });

    return { status: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: IUser) {
    return this.authService.findOne(user.id);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  getAllUsers(@CurrentUser() user: User) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');
    return this.authService.getAllUsers();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') userId: number, @CurrentUser() user: User) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.authService.remove(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('id') userId: number,
    @Body() userPayload,
    @CurrentUser() user: User,
  ) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return this.authService.update(userId, userPayload);
  }

  @Get('is-admin')
  @UseGuards(JwtAuthGuard)
  isAdmin(@CurrentUser() user: User) {
    if (!user.isAdmin) throw new UnauthorizedException('User is not an admin');

    return true;
  }
}
