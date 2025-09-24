export class AuthService {
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cellphone: string;
  }): Promise<{ message: string; user: object }> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          cellphone: userData.cellphone,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Registration failed");
    }

    return response.json();
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<object> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Login failed");
    }

    return response.json();
  }

  static async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("No se pudo reenviar el email de verificación");
    }

    return response.json();
  }
}