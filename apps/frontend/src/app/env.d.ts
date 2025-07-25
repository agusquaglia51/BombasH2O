declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "staging";
    NEXT_PUBLIC_URL: string;
    NEXT_PUBLIC_SERVER_URL: string;
  }
}
