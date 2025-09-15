# app/services/email_service.py
import os
import secrets
import hashlib
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content

class EmailService:
    def __init__(self):
        self.sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
        self.from_email = os.getenv("FROM_EMAIL")
        self.frontend_url = os.getenv("CLIENT_URL", "http://localhost:3000")
        if not self.sendgrid_api_key:
            print("⚠️ SendGrid API key not configured")

    def generate_verification_token(self, email: str) -> str:
        """Generate a secure verification token"""
        random_token = secrets.token_urlsafe(32)
        combined = f"{email}:{datetime.utcnow().isoformat()}:{random_token}"
        return hashlib.sha256(combined.encode()).hexdigest()

    async def send_verification_email(self, email: str, first_name: str, verification_token: str) -> bool:
        """Send email verification email via SendGrid"""
        if not self.sendgrid_api_key:
            return False

        verification_url = f"{self.frontend_url}/auth/verify-email?token={verification_token}&email={email}"
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verificación de Email</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #4299e1; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 30px; background-color: #f7fafc; }}
                .button {{ display: inline-block; padding: 12px 24px; background-color: #38b2ac; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
                .footer {{ padding: 20px; text-align: center; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><h1>¡Bienvenido/a {first_name}!</h1></div>
                <div class="content">
                    <h2>Verificar tu dirección de email</h2>
                    <p>Gracias por registrarte. Para completar tu registro, necesitas verificar tu dirección de email.</p>
                    <div style="text-align: center;">
                        <a href="{verification_url}" class="button">Verificar Email</a>
                    </div>
                    <p>Si no puedes hacer clic en el botón, copia y pega el siguiente enlace en tu navegador:</p>
                    <p style="word-break: break-all; background-color: #e2e8f0; padding: 10px; border-radius: 5px;">{verification_url}</p>
                    <p><strong>Este enlace expirará en 24 horas.</strong></p>
                    <p>Si no creaste esta cuenta, puedes ignorar este email de forma segura.</p>
                </div>
                <div class="footer">
                    <p>Este es un email automático, por favor no respondas a este mensaje.</p>
                </div>
            </div>
        </body>
        </html>
        """

        try:
            message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(email),
                subject="Verificar tu cuenta - Confirma tu email",
                html_content=Content("text/html", html_content)
            )
            print(f"api key: {self.sendgrid_api_key}")
            sg = SendGridAPIClient(self.sendgrid_api_key)
            response = sg.send(message)
            print(f"Verification email sent to {email}, status code {response.status_code}")
            return True
        except Exception as e:
            print(f"Failed to send verification email to {email}: {e}")
            return False


    async def send_welcome_email(self, email: str, first_name: str) -> bool:
        """Send welcome email after successful verification"""
        if not self.sendgrid_api_key:
            return False

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cuenta Verificada</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #38a169; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 30px; background-color: #f7fafc; }}
                .button {{ display: inline-block; padding: 12px 24px; background-color: #4299e1; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><h1>¡Cuenta Verificada!</h1></div>
                <div class="content">
                    <h2>¡Hola {first_name}!</h2>
                    <p>Tu cuenta ha sido verificada exitosamente. Ya puedes acceder a todas las funcionalidades de nuestra plataforma.</p>
                    <div style="text-align: center;">
                        <a href="{self.frontend_url}/auth/login" class="button">Iniciar Sesión</a>
                    </div>
                    <p>¡Gracias por unirte a nosotros!</p>
                </div>
            </div>
        </body>
        </html>
        """

        try:
            message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(email),
                subject="¡Cuenta verificada exitosamente!",
                html_content=Content("text/html", html_content)
            )
            sg = SendGridAPIClient(self.sendgrid_api_key)
            response = sg.send(message)
            print(f"Welcome email sent to {email}, status code {response.status_code}")
            return True
        except Exception as e:
            print(f"Failed to send welcome email to {email}: {e}")
            return False

# Global email service instance
email_service = EmailService()
