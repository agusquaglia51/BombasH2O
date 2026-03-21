import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
  NotImplementedException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('El email ya esta registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationToken = uuidv4();
    const verificationTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

    let user: Awaited<ReturnType<typeof this.usersService.create>>;
    try {
      user = await this.usersService.create({
        ...dto,
        password: hashedPassword,
        verificationToken,
        verificationTokenExp,
      });
    } catch (error) {
      this.logger.error('Error al registrar usuario', error);
      throw new InternalServerErrorException('Error al registrar el usuario');
    }

    await this.emailService.sendVerificationEmail(
      user.email,
      verificationToken,
    );

    return {
      message: 'Usuario registrado. Revisa tu email para verificar tu cuenta.',
      user,
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException('Token de verificacion invalido');
    }

    if (user.verificationTokenExp && user.verificationTokenExp < new Date()) {
      throw new BadRequestException('El token de verificacion expiro');
    }

    try {
      await this.usersService.markEmailVerified(user.id);
    } catch (error) {
      this.logger.error('Error al verificar email', error);
      throw new InternalServerErrorException('Error al verificar el email');
    }

    return { message: 'Email verificado exitosamente' };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciales invalidas');

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        'Debes verificar tu email antes de iniciar sesion',
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const idToken = this.jwtService.sign(payload);

    return { idToken, refreshToken: null };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      this.logger.warn('Token invalido o expirado');
      throw new UnauthorizedException('Token invalido o expirado');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return {
        message:
          'Si el email está registrado, recibirás un correo con instrucciones.',
      };
    }

    const resetToken = uuidv4();
    const resetTokenExp = new Date(Date.now() + 60 * 60 * 1000);

    await this.usersService.setResetPasswordToken(
      user.id,
      resetToken,
      resetTokenExp,
    );

    try {
      await this.emailService.sendPasswordResetEmail(user.email, resetToken);
    } catch (error) {
      this.logger.error('Error al enviar email de reset', error);
      throw new InternalServerErrorException(
        'Error al enviar el email de restablecimiento',
      );
    }
    await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message:
        'Si el email está registrado, recibirás un correo con instrucciones.',
    };
  }

  async confirmForgotPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetPasswordToken(token);

    if (!user) {
      throw new BadRequestException('Token de reset inválido');
    }

    if (
      !user.resetPasswordTokenExp ||
      user.resetPasswordTokenExp < new Date()
    ) {
      throw new BadRequestException('El token de reset expiró');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
      await this.usersService.resetPassword(user.id, hashedPassword);
    } catch (error) {
      this.logger.error('Error al resetear contraseña', error);
      throw new InternalServerErrorException('Error al resetear la contraseña');
    }

    return { message: 'Contraseña actualizada exitosamente' };
  }

  async googleLogin() {
    throw new NotImplementedException();
  }
}
