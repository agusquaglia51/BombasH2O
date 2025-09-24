import { User } from "../types/user-types";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/me`, {
      cache: "no-store", // evita caching del SSR
      credentials: "include", // envía cookies HTTP-only
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
};
