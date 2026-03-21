import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);
  private readonly logger = new Logger(EmailService.name);
  private readonly fromAddress =
    process.env.EMAIL_FROM || 'onboarding@resend.dev';

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

    const { error } = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: 'Restablecé tu contraseña en BombasH2O',
      html: `
        <h2>Restablecé tu contraseña</h2>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
        <a href="${resetUrl}" style="
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        ">Restablecer contraseña</a>
        <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
          Este enlace expira en 1 hora. Si no solicitaste esto, ignorá este email.
        </p>
      `,
    });

    if (error) {
      this.logger.error('Error enviando email de reset de contrasenia', error);
      throw new Error('No se pudo enviar el email de reset de contrasenia');
    }
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verifyUrl = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

    const { error } = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: 'Verificá tu cuenta en BombasH2O',
      html: `
        <h2>Verificá tu email</h2>
        <p>Hacé click en el siguiente enlace para confirmar tu cuenta:</p>
        <a href="${verifyUrl}" style="
          display: inline-block;
          padding: 12px 24px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        ">Verificar cuenta</a>
        <p style="margin-top: 16px; color: #6b7280; font-size: 14px;">
          Este enlace expira en 24 horas. Si no creaste una cuenta, ignorá este email.
        </p>
      `,
    });

    if (error) {
      this.logger.error('Error enviando email de verificacion', error);
      throw new Error('No se pudo enviar el email de verificacion');
    }
  }
}
