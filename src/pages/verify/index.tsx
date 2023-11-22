import axios from '@/axios';
import Button from '@/components/atoms/Button';
import {
  toastError,
  toastLoading,
  toastSuccess,
} from '@/components/atoms/Toast';
import CardAuth from '@/components/organisms/CardAuth';
import useCountdown from '@/hooks/useCountdown';
import { resendEmailVerification } from '@/services/resendEmailVerification';
import { decryptData } from '@/utils/cipher';
import { errorMessage, errorStatus } from '@/utils/error';
import hideEmail from '@/utils/hideEmail';
import { Loader } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  email: string;
  token: string;
};

type VerifyStatusType = 'expired' | 'verified' | 'invalid' | null;

export default function Verify({ email, token }: Props) {
  const LIMIT_RESEND_EMAIL_VERIFY = 60;
  const { push } = useRouter();
  const { countdown, setCountdown } = useCountdown(LIMIT_RESEND_EMAIL_VERIFY);
  const [isLoading, setIsLoading] = useState(token ? true : false);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatusType>(null);

  const animateCountdown = {
    '--value': countdown,
  } as React.CSSProperties;

  const handleResend = async () => {
    setIsLoading(true);
    toastLoading('Please wait...', 'resend');
    try {
      await resendEmailVerification(email);
      setCountdown(LIMIT_RESEND_EMAIL_VERIFY);
      toastSuccess('Email sent', 'resend');
    } catch (error) {
      console.log(errorMessage(error));
      toastError('Email failed to send', 'resend');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async (token: string) => {
      try {
        const res = await axios.post('/verify/user', {
          token,
        });
        console.log(res);
      } catch (error) {
        if (errorStatus(error) === 410) {
          setVerifyStatus('expired');
          return;
        }
        setVerifyStatus('invalid');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetch(token);
    }
  }, [token]);

  if (token) {
    return (
      <CardAuth tittle="Email Verification">
        <div className="text-center text-[14px] mt-5">
          {!isLoading ? (
            <div className="flex flex-col gap-5">
              {verifyStatus === 'expired' && (
                <div className="border p-3 rounded-lg bg-red-500/90 text-white">
                  Sorry, the verification link has expired.
                </div>
              )}
              {verifyStatus === 'invalid' && (
                <div className="border p-3 rounded-lg bg-red-500/90 text-white">
                  Sorry, your account verification was unsuccessful. Make sure
                  you follow the verification link correctly.
                </div>
              )}
              {verifyStatus === 'verified' && (
                <div className="border p-3 rounded-lg bg-green-500/90">
                  Congrats! Your account has been successfully verified. Now you
                  can access all the features and benefits it has to offer.
                </div>
              )}
              <Button onClick={() => push('/signin')}>Sign in</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 my-7">
              <Loader color="dark" className="mx-auto" size="sm" />
              <p>Please wait for verification to be processed</p>
            </div>
          )}
        </div>
      </CardAuth>
    );
  }

  return (
    <CardAuth
      tittle="Email Verification"
      footer={
        <>
          Already verified email ?{' '}
          <Link href="/signin" className="font-semibold hover:underline">
            Sign in
          </Link>
        </>
      }>
      <div className="text-center text-[14px]">
        <div className="flex flex-col gap-5 my-7">
          <div>
            <p>You`re almost there! We sent an email to</p>
            <b className="text-[16px]">{hideEmail(email)}</b>
          </div>
          <div className="border p-3 rounded-lg bg-gray-100">
            Just click on the link that email to complete your signup. If you
            don`t see it, you may need to <b>check your spam</b> folder.
          </div>
        </div>
        {countdown === 0 ? (
          <Button onClick={handleResend}>Resend Verification email</Button>
        ) : (
          <Button
            className="flex items-center justify-center gap-1"
            isDisabled={true}>
            <p>Resend in</p>
            <span className="countdown">
              <p style={animateCountdown}></p>s
            </span>
          </Button>
        )}
      </div>
    </CardAuth>
  );
}

export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  const { data, token } = query;

  if (!(!!data || !!token)) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: data ? decryptData(data) : '',
      token: token ? token : '',
    },
  };
}
