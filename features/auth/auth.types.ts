// features/auth/auth.types.ts

export interface UserProfile {
  id: string | number;
  username: string;
  fullName?: string;
  email?: string;
  roles?: string[];
  [key: string]: any;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}
