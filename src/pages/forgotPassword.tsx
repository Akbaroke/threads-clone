import axios from '@/axios';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { toastError, toastSuccess } from '@/components/atoms/Toast';
import CardAuth from '@/components/organisms/CardAuth';
import { errorMessage } from '@/utils/error';
import { isEmail, useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type FormType = {
  email: string;
};

export default function ForgotPassword() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Email is not valid.'),
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('/auth/resetpassword', {
        email: form.values.email,
      });
      toastSuccess(
        'Send email success, check your email inbox. If you don`t see it, you may need to check your spam folder',
        'resetpassword'
      );
      push('/signin');
    } catch (error) {
      toastError(errorMessage(error), 'resetpassword');
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
      <div className="border p-3 rounded-lg bg-gray-100 my-5 text-[14px]">
        provide the email connected to the account you want to recover. Make
        sure the <b>email must be active</b>.
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          id="email"
          label="Email"
          type="email"
          maxLength={100}
          value={form.values.email}
          errorLabel={form.errors.email as string}
          onChange={(e) => form.setFieldValue('email', e as string)}
        />
        <Button className="my-3" type="submit" isLoading={isLoading}>
          Send
        </Button>
      </form>
    </CardAuth>
  );
}
