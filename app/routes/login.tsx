
import type { Route } from './+types/login';
import React from 'react';
import LoginForm from '~/components/loginForm';

const Login = () => {
  return (
    <div className="login-page">
      <LoginForm />
      {/* Footer */}
      <footer className="w-full border-t shadow-md bg-gray-100 p-4 text-center text-gray-600 text-xs">
        <div className="flex justify-center space-x-6">
          <span>©️ Organic Ltd</span>
          <a href="/help" className="hover:underline">Help</a>
          <a href="/user-agreement" className="hover:underline">User Agreement</a>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
