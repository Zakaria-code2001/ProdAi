// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string; // matches your GROQ API key env variable name
      // Add any other environment variables you're using
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      // ... any other env variables you have
    }
  }
