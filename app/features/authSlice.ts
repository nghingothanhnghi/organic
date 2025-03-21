import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import type { AuthResponse, ForgotPasswordResponse, AuthState } from '~/types/user';
import {
    loginService,
    registerService,
    refreshTokenService,
    forgotPasswordService,
    loginWithFacebookService
} from '~/services/authService';
import { safeSessionStorage } from '~/utils/storage';

const initialState: AuthState = {
    user: safeSessionStorage.getItem('user') ? JSON.parse(safeSessionStorage.getItem('user')!) : null,
    token: safeSessionStorage.getItem('userToken') || null,
    // isAuthenticated: false,
    isAuthenticated: !!safeSessionStorage.getItem('userToken'), // ✅ Check token existence
    loading: false,
    error: null,
};

// Async thunks for login, registration, etc.
export const login = createAsyncThunk<AuthResponse, { email: string; password: string }>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginService(email, password);
            console.log('Login Thunk Response:', response); 
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk<AuthResponse, { username: string; email: string; password: string }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerService(userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshTokenService();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
        }
    }
);

export const forgotPassword = createAsyncThunk<ForgotPasswordResponse, string>(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await forgotPasswordService(email);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send reset email');
        }
    }
);


// ✅ Add Facebook login thunk
export const loginWithFacebook = createAsyncThunk(
    'auth/loginWithFacebook',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await loginWithFacebookService(accessToken);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Facebook login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            safeSessionStorage.removeItem('user');
            safeSessionStorage.removeItem('userToken');
            toast.info(i18n.t('success.auth.message_01'));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('Redux fulfilled:', action.payload); // Debug
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                // Store user and token in sessionStorage
                safeSessionStorage.setItem('user', JSON.stringify(action.payload.user));
                safeSessionStorage.setItem('userToken', action.payload.jwt);
                toast.success(i18n.t('success.auth.message_02'));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                toast.success('Registration successful!');
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.jwt;
                localStorage.setItem('userToken', action.payload.jwt);
                toast.info('Token refreshed!');
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                toast.success(action.payload.message);
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.error = action.payload as string;
                toast.error(action.payload as string);
            })
            .addCase(loginWithFacebook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithFacebook.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                safeSessionStorage.setItem('user', JSON.stringify(action.payload.user));
                safeSessionStorage.setItem('userToken', action.payload.jwt);
                toast.success('Facebook login successful');
            })
            .addCase(loginWithFacebook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
