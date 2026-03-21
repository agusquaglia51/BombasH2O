import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone?: string;
  acceptStatement: boolean;
  verificationToken: string;
  verificationTokenExp: Date;
}

export interface FullUser {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone: string | null;
  acceptStatement: boolean;
  emailVerified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phone: string | null;
  acceptStatement: boolean;
  emailVerified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<FullUser | null> {
    return (this.prisma.user as any).findUnique({
      where: { email },
    }) as Promise<FullUser | null>;
  }

  async findByVerificationToken(token: string) {
    return (this.prisma.user as any).findUnique({
      where: { verificationToken: token },
    }) as Promise<{
      id: string;
      email: string;
      emailVerified: boolean;
      verificationTokenExp: Date | null;
    } | null>;
  }

  async create(data: CreateUserData): Promise<SafeUser> {
    const user = await (this.prisma.user as any).create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        lastName: data.lastName,
        phone: data.phone,
        acceptStatement: data.acceptStatement,
        verificationToken: data.verificationToken,
        verificationTokenExp: data.verificationTokenExp,
      },
    });

    const {
      password: _pw,

      verificationToken: _vt,

      verificationTokenExp: _vte,
      ...safeUser
    } = user;

    return safeUser as SafeUser;
  }

  async findByResetPasswordToken(token: string) {
    return (this.prisma.user as any).findUnique({
      where: { resetPasswordToken: token },
    }) as Promise<{
      id: string;
      resetPasswordTokenExp: Date | null;
    } | null>;
  }

  async setResetPasswordToken(userId: string, token: string, exp: Date) {
    return (this.prisma.user as any).update({
      where: { id: userId },
      data: { resetPasswordToken: token, resetPasswordTokenExp: exp },
    });
  }

  async resetPassword(userId: string, hashedPassword: string) {
    return (this.prisma.user as any).update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExp: null,
      },
    });
  }

  async markEmailVerified(userId: string) {
    return (this.prisma.user as any).update({
      where: { id: userId },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExp: null,
      },
    });
  }
}
