import axios from '@/axios';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { toastError, toastSuccess } from '@/components/atoms/Toast';
import LabelVerifyStatus, {
  VerifyStatusType,
} from '@/components/molecules/LabelVerifyStatus';
import CardAuth from '@/components/organisms/CardAuth';
import { decryptData } from '@/utils/cipher';
import { errorStatus } from '@/utils/error';
import { isEmail, matchesField, useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
  token: string;
};

type FormType = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ResetPassword({ token }: Props) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatusType>(null);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      newPassword: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters.' : null,
      confirmNewPassword: matchesField(
        'newPassword',
        'New Passwords are not the same'
      ),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('/verify/resetpassword', {
        newPassword: form.values.newPassword,
        token,
      });
      setVerifyStatus('verified');
      toastSuccess('Reset password success', 'resetpassword');
      push('/signin');
    } catch (error) {
      form.reset();
      toastError('Reset password failed', 'resetpassword');
      if (errorStatus(error) === 404) return setVerifyStatus('expired');
      setVerifyStatus('invalid');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardAuth
      tittle="Forgot Password"
      footer={
        <>
          I have remembered the password ?{' '}
          <Link href="/signin" className="font-semibold hover:underline">
            Sign in
          </Link>
        </>
      }>
      <div className="flex flex-col gap-5 mt-8">
        <LabelVerifyStatus verifyStatus={verifyStatus} />
        <form
          className="flex flex-col gap-2"
          onSubmit={form.onSubmit(handleSubmit)}>
          <Input
            id="newPassword"
            label="New Password"
            type="password"
            maxLength={100}
            value={form.values.newPassword}
            errorLabel={form.errors.newPassword as string}
            onChange={(e) => form.setFieldValue('newPassword', e as string)}
          />
          <Input
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            maxLength={100}
            value={form.values.confirmNewPassword}
            errorLabel={form.errors.confirmNewPassword as string}
            onChange={(e) =>
              form.setFieldValue('confirmNewPassword', e as string)
            }
          />
          <Button className="my-3" type="submit" isLoading={isLoading}>
            Send
          </Button>
        </form>
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
