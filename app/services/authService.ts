// services/authService.ts
import { axiosPrivate } from '~/api/axios';

export const loginService = async (email: string, password: string) => {
  const response = await axiosPrivate.post('/auth/local', {
    identifier: email,
    password,
  });
  console.log('Login Service Response:', response); 
  return response.data;
};

export const registerService = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const response = await axiosPrivate.post('/auth/local/register', {
    username,
    email,
    password,
  });
  return response.data;  // Contains user data and JWT token
};

export const refreshTokenService = async () => {
  const response = await axiosPrivate.post('/auth/refresh-token');
  return response.data;  // Contains new JWT token
};

export const forgotPasswordService = async (email: string) => {
  const response = await axiosPrivate.post('/auth/forgot-password', { email });
  return response.data;  // Contains message indicating success/failure
};


// ✅ New Facebook Login Service
export const loginWithFacebookService = async (accessToken: string) => {
  const response = await axiosPrivate.get(`/auth/facebook/callback?access_token=${accessToken}`);
  console.log('Facebook Login Service Response:', response);
  return response.data;
};
