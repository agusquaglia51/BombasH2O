export class AuthService {
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cellphone: string;
  }): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Registration failed");
    }
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<void> {
    const response = await fetch("/users/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
  }
}
