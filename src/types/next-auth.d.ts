import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extends the built-in session types to include the `role` property
   */
  interface Session {
    user: {
      role?: string;
    };
    accessToken?: string | undefined;
  }

  /**
   * Extends the built-in user types to include the `role` property
   */
  interface User {
    role?: string;
    access_token?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Extends the JWT type with role */
  interface JWT {
    role?: string;
    accessToken?: string;
  }
}
