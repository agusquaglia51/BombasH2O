import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Res,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { Response, Request } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body.email, body.password);

    res.cookie('access_token', result.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    const userPayload = await this.authService.verifyToken(result.idToken);

    return {
      message: 'Login exitoso',
      isAuthenticated: true,
      user: userPayload,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });

    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });

    return { message: 'Sesión cerrada exitosamente.' };
  }

  @Get('me')
  async getAuthenticatedUser(@Req() req: Request) {
    try {
      const accessToken = req.cookies?.['access_token'] as string;

      if (!accessToken) {
        return { isAuthenticated: false, user: null };
      }

      const userPayload = await this.authService.verifyToken(accessToken);

      if (!userPayload) {
        return { isAuthenticated: false, user: null };
      }

      return {
        isAuthenticated: true,
        user: userPayload,
      };
    } catch (error) {
      return { isAuthenticated: false, user: null };
    }
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.confirmForgotPassword(body.token, body.newPassword);
  }

  @Post('google-login')
  async googleLogin(@Body() _body: { idToken: string }) {
    return this.authService.googleLogin();
  }
}
