import axios from '@/axios';
import Button from '@/components/atoms/Button';
import { toastLoading, toastSuccess } from '@/components/atoms/Toast';
import CardAuth from '@/components/organisms/CardAuth';
import useCountdown from '@/hooks/useCountdown';
import { decryptData } from '@/utils/cipher';
import errorMessage from '@/utils/error';
import hideEmail from '@/utils/hideEmail';
import promise from '@/utils/promise';
import { Loader } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  email: string;
  token: string;
};

export default function Verify({ email, token }: Props) {
  const { countdown, setCountdown } = useCountdown(20);
  const [isLoading, setIsLoading] = useState(token ? true : false);

  const animateCountdown = {
    '--value': countdown,
  } as React.CSSProperties;

  const handleResend = async () => {
    setIsLoading(true);
    toastLoading('Please wait...', 'resend');
    await promise();
    setCountdown(20);
    toastSuccess('Email sent', 'resend');
    setIsLoading(false);
  };

  useEffect(() => {
    const fetch = async (token: string) => {
      try {
        const res = await axios.post('/verify/user', {
          token,
        });
        console.log(res.data);
      } catch (error) {
        console.log(errorMessage(error));
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
        <div className="text-center text-[14px]">
          <div className="flex flex-col gap-4 my-7">
            <Loader color="dark" className="mx-auto" size="sm" />
            <p>Please wait for verification to be processed</p>
          </div>
          {!isLoading && (
            <>
              <div className="border p-3 rounded-lg bg-gray-100">
                Just click on the link that email to complete your signup. If
                you don`t see it, you may need to <b>check your spam</b> folder.
              </div>
              <Button onClick={handleResend}>Sign in</Button>
            </>
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
