import os
import secrets
import hashlib
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from jinja2 import Environment, FileSystemLoader

class EmailService:
    def __init__(self):
        self.sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
        self.from_email = os.getenv("FROM_EMAIL")
        self.frontend_url = os.getenv("CLIENT_URL", "http://localhost:3000")
        self.env = Environment(loader=FileSystemLoader("app/templates"))
        
        if not self.sendgrid_api_key:
            print("⚠️ SendGrid API key not configured")
            
    def render_template(self, template_name: str, **kwargs) -> str:
        """Render HTML template with given variables"""
        template = self.env.get_template(template_name)
        return template.render(**kwargs)

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
        
        html_content = self.render_template("verification_email.html", 
                                            first_name=first_name, verification_url=verification_url)

        try:
            message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(email),
                subject="Verificar tu cuenta - Confirma tu email",
                html_content=Content("text/html", html_content)
            )
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

        html_content = self.render_template("welcome_email.html", first_name=first_name)

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
