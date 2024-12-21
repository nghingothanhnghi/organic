
import type { Route } from './+types/login';
import React from 'react';
import LoginForm from '~/components/loginForm';

const Login = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default Login;
