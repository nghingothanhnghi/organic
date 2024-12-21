// app/types/user.ts
export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    // Add any other fields returned by your backend for the user
}

export interface AuthResponse {
    jwt: string;
    user: User;
}

export interface ForgotPasswordResponse {
    message: string;
}

// Define the AuthState for Redux
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
