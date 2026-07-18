import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import {
  registerUser,
  sendOTP,
  verifyOTP,
  resendOTP,
} from '../features/auth/auth.api';

import { useAuthStore } from '../features/auth/auth.store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { OTPModal } from '../components/ui/OTPModal';
import { TruvaLogo } from '../components/ui/TruvaLogo';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { cn } from '../utils/cn';


const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


type RegisterFormData = z.infer<typeof registerSchema>;


type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};


const getErrorMessage = (error: unknown, fallback: string): string => {
  const err = error as ApiError;
  return err.response?.data?.message || fallback;
};


export default function Register() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore(
    (state) => state.setAuthenticated
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [error, setError] = useState<string | null>(null);


  const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
});


const email = useWatch({
  control,
  name: 'email',
});


  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    if (errors.email) {
      toast.error('Please enter a valid email');
      return;
    }


    try {
      await sendOTP(email);

      setIsOTPModalOpen(true);
      toast.success('OTP sent to your email!');

    } catch (err: unknown) {
      toast.error(
        getErrorMessage(err, 'Failed to send OTP')
      );
    }
  };


  const handleVerifyOTP = async (otp: string) => {
    setIsVerifying(true);

    try {
      await verifyOTP(email, otp);

      setIsEmailVerified(true);
      setIsOTPModalOpen(false);

      toast.success('Email verified successfully!');

    } catch (err: unknown) {
      toast.error(
        getErrorMessage(err, 'Invalid OTP')
      );

      throw err;

    } finally {
      setIsVerifying(false);
    }
  };


  const handleResendOTP = async () => {
    try {
      await resendOTP(email);

      toast.success('OTP resent successfully!');

    } catch (err: unknown) {
      toast.error(
        getErrorMessage(err, 'Failed to resend OTP')
      );
    }
  };


  const onSubmit = async (data: RegisterFormData) => {

    if (!isEmailVerified) {
      toast.error('Please verify your email first');
      return;
    }


    setIsLoading(true);
    setError(null);


    try {

      const response = await registerUser({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
      });


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


      toast.success('Welcome to Truva!');

      navigate('/dashboard');


    } catch (err: unknown) {

      const message = getErrorMessage(
        err,
        'Registration failed. Please try again.'
      );

      setError(message);

      toast.error(message);
      console.log('Register error:', err);


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
              <TruvaLogo size="lg" showText />
            </div>

            <p className="text-gray-400 mt-2">
              Create your account
            </p>

          </div>


          <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              <Input
                type="text"
                placeholder="Full name"
                {...register('full_name')}
                error={errors.full_name?.message}
              />


              <div>

                <div className="relative">

                  <Input
                    type="email"
                    placeholder="Email address"
                    {...register('email')}
                    error={errors.email?.message}
                    className={cn(
                      isEmailVerified &&
                      'border-emerald-500 pr-28'
                    )}
                    disabled={isEmailVerified}
                  />


                  <div className="absolute right-2 top-1/2 -translate-y-1/2">

                    {isEmailVerified ? (

                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-xs">

                        <CheckCircle size={14} />
                        Verified

                      </div>

                    ) : (

                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={!email || !!errors.email}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50"
                      >
                        Verify
                      </button>

                    )}

                  </div>

                </div>


                {!isEmailVerified && (
                  <p className="mt-1 text-xs text-gray-400">
                    Verify your email to complete registration
                  </p>
                )}

              </div>


              <div className="relative">

                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password')}
                  error={errors.password?.message}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>

              </div>


              <div className="relative">

                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
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
                disabled={!isEmailVerified}
              >
                {!isEmailVerified
                  ? 'Verify email first'
                  : 'Create Account'}
              </Button>


            </form>


            <div className="mt-6 text-center text-sm text-gray-400">

              Already have an account?{' '}

              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Sign in
              </Link>

            </div>

          </div>

        </div>


        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          email={email}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          isLoading={isVerifying}
        />

      </div>
    </>
  );
}