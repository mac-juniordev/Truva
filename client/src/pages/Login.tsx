import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { loginUser } from '../features/auth/auth.api';
import { useAuthStore } from '../features/auth/auth.store';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TruvaLogo } from '../components/ui/TruvaLogo';
import { LoadingScreen } from '../components/ui/LoadingScreen';


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});


type LoginFormData = z.infer<typeof loginSchema>;


type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};


const getErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  const err = error as ApiError;

  return err.response?.data?.message || fallback;
};


export default function Login() {

  const navigate = useNavigate();

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const setAuthenticated = useAuthStore(
    (state) => state.setAuthenticated
  );


  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);



  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });



  const onSubmit = async (
    data: LoginFormData
  ) => {

    setIsLoading(true);
    setError(null);


    try {

      const response = await loginUser(data);


      localStorage.setItem(
        'access_token',
        response.access_token
      );

      localStorage.setItem(
        'refresh_token',
        response.refresh_token
      );


      setUser(response.user);
      setAuthenticated(true);


      toast.success('Welcome back!');

      navigate('/dashboard');


    } catch (err: unknown) {

      const message = getErrorMessage(
        err,
        'Login failed. Please try again.'
      );


      setError(message);

      toast.error(message);


    } finally {

      setIsLoading(false);

    }
  };



  return (
    <>
      <LoadingScreen isLoading={isLoading} />


      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">

        <div className="w-full max-w-md">


          <div className="text-center mb-8">

            <div className="flex justify-center">
              <TruvaLogo
                size="lg"
                showText
              />
            </div>


            <p className="text-gray-400 mt-2">
              Sign in to your account
            </p>

          </div>



          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8">


            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >


              <Input
                type="email"
                placeholder="Email address"
                {...register('email')}
                error={errors.email?.message}
              />



              <div className="relative">

                <Input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Password"
                  {...register('password')}
                  error={errors.password?.message}
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                  }

                </button>

              </div>




              {error && (

                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">

                  {error}

                </div>

              )}




              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Sign In
              </Button>


            </form>




            <div className="mt-6 text-center text-sm text-gray-400">

              Don't have an account?{' '}


              <Link
                to="/register"
                className="text-emerald-400 hover:text-emerald-300 transition"
              >
                Create one
              </Link>


            </div>


          </div>


        </div>


      </div>

    </>
  );
}