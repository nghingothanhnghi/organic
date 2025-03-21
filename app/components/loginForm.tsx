import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login } from '~/features/authSlice';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { loginValidationSchema } from '~/validation/userInfo';
import FacebookLoginButton from './facebookLoginButton';

const LoginForm = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // ✅ Redirect if already logged in
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response =  await dispatch(login(values)).unwrap(); // Using .unwrap() to handle rejected promises
      console.log('Login successful:', response); // Debug
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">{t("page_title.login")}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema(t)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("input.password.label")}
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`w-full text-sm text-white font-semibold py-3 px-4 rounded-lg shadow-md ${
                  loading || isSubmitting
                    ? 'bg-green-200 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? t("btn.loggingIn") : t("btn.login")}
              </button>

              {error && (
                <div className="text-red-500 text-sm text-center mt-4">
                  {error}
                </div>
              )}
            </Form>
          )}
        </Formik>
        <div className="flex justify-center mt-4">
          <FacebookLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
