import { useState, useEffect } from 'react';
import { X, Mail, Clock, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { Input } from './Input';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
}

export function OTPModal({
  isOpen,
  onClose,
  email,
  onVerify,
  onResend,
  isLoading = false,
}: OTPModalProps) {

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);


  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setTimer(60);
      setCanResend(false);
      setOtp('');
      setError('');
    }
  }, [isOpen]);



  // Countdown timer
  useEffect(() => {

    if (!isOpen) return;

    if (timer > 0) {

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);


      return () => clearInterval(interval);

    } else {

      setCanResend(true);

    }

  }, [timer, isOpen]);




  const handleVerify = async () => {

    if (otp.length !== 4) {

      setError(
        'Please enter the 4-digit OTP'
      );

      return;

    }


    setError('');


    try {

      await onVerify(otp);


    } catch {

      setError(
        'Invalid OTP. Please try again.'
      );

    }

  };




  const handleResend = async () => {

    try {

      setTimer(60);
      setCanResend(false);
      setError('');

      await onResend();


    } catch {

      setError(
        'Failed to resend OTP'
      );

    }

  };



  if (!isOpen) {
    return null;
  }




  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">


      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />



      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">


        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20}/>
        </button>




        {/* Header */}
        <div className="text-center mb-6">

          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">

            <Mail className="w-6 h-6 text-emerald-400"/>

          </div>


          <h3 className="text-xl font-semibold text-white">
            Verify Your Email
          </h3>


          <p className="text-sm text-gray-400 mt-1">

            We sent a 4-digit code to{' '}

            <span className="text-white">
              {email}
            </span>

          </p>


        </div>





        <div className="space-y-4">


          {/* OTP Input */}
          <div className="flex justify-center">

            <Input
              type="text"
              maxLength={4}
              value={otp}

              onChange={(e) => {

                const value =
                  e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 4);


                setOtp(value);


                if(error){
                  setError('');
                }

              }}

              placeholder="Enter OTP"

              className="w-48 text-center text-2xl tracking-widest"

              error={error}

              autoFocus

            />

          </div>





          {/* Timer */}
          <div className="flex items-center justify-between text-sm">


            <div className="flex items-center gap-2 text-gray-400">

              <Clock size={16}/>


              <span>

                {timer > 0
                  ? `Resend in ${timer}s`
                  : 'Code expired'
                }

              </span>


            </div>




            <button

              type="button"

              onClick={handleResend}

              disabled={!canResend || isLoading}


              className={cn(
                'flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition',
                (!canResend || isLoading) &&
                'opacity-50 cursor-not-allowed'
              )}

            >

              <RefreshCw
                size={16}
                className={cn(
                  isLoading && 'animate-spin'
                )}
              />


              Resend


            </button>


          </div>





          {/* Verify */}
          <Button

            onClick={handleVerify}

            className="w-full"

            isLoading={isLoading}

          >

            Verify Email


          </Button>



        </div>



      </div>



    </div>

  );

}