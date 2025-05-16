import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Droplet } from 'lucide-react';
import Button from '../../components/ui/Button';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

const LoginPage = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  if (user) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = '/';
    switch (user.role) {
      case 'admin':
        redirectPath = '/admin';
        break;
      case 'cleaner':
        redirectPath = '/cleaner';
        break;
      case 'customer':
      case 'agency':
        redirectPath = '/customer';
        break;
      default:
        redirectPath = '/';
    }
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (values: { username: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setLoginError(null);
      await login(values.username, values.password);
    } catch (error) {
      setLoginError('Invalid username or password. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-primary-100">
            <Droplet className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Cleaning Service</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {loginError && (
                <div className="rounded-md bg-error-50 p-4">
                  <div className="text-sm text-error-700">{loginError}</div>
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                  <ErrorMessage name="username" component="div" className="mt-1 text-sm text-error-600" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-error-600" />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-3"
                  isLoading={isSubmitting || loading}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            This is a demo system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;