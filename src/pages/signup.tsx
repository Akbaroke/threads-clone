import Button from '@/components/atoms/Button';
import GoogleButton from '@/components/atoms/GoogleButton';
import Input from '@/components/atoms/Input';
import {
  toastError,
  toastLoading,
  toastSuccess,
} from '@/components/atoms/Toast';
import CardAuth from '@/components/organisms/CardAuth';
import { encryptData } from '@/utils/cipher';
import { isEmail, matchesField, useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from '@/axios';
import { HeadMetaData } from '@/components/HeadMetaData';
import { errorMessage } from '@/utils/error';

type FormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const { push } = useRouter();

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => {
        if (!/^[a-z0-9/:_#@\s]{3,10}$/.test(value)) {
          return 'Invalid input. Use only letters and number with 3 - 10 characters.';
        }
        return null;
      },
      email: isEmail('Email is not valid.'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters.' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });

  const handleSubmit = async () => {
    toastLoading('Siginup prosess...', 'signup');
    try {
      const { data } = await axios.post('/auth/signup', {
        username: form.values.username,
        email: form.values.email,
        password: form.values.password,
        confirmPassword: form.values.confirmPassword,
      });
      toastSuccess('Signup success', 'signup');
      form.reset();
      push({
        pathname: '/verify',
        query: {
          data: encryptData(form.values.email),
        },
      });
    } catch (error) {
      toastError(`Signup failed, ${errorMessage(error)}`, 'signup');
      console.log(error);
    }
  };

  return (
    <CardAuth
      tittle="Sign up"
      oAuth={<GoogleButton>Sign up with google</GoogleButton>}
      footer={
        <>
          Already have an account?{' '}
          <Link href="/signin" className="font-semibold hover:underline">
            Signin
          </Link>
        </>
      }>
      <HeadMetaData title="Signup" />
      <form
        className="flex flex-col gap-2"
        onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          id="username"
          label="Username"
          type="text"
          maxLength={100}
          value={form.values.username}
          errorLabel={form.errors.username as string}
          onChange={(e) => form.setFieldValue('username', e as string)}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          maxLength={100}
          value={form.values.email}
          errorLabel={form.errors.email as string}
          onChange={(e) => form.setFieldValue('email', e as string)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          maxLength={100}
          value={form.values.password}
          errorLabel={form.errors.password as string}
          onChange={(e) => form.setFieldValue('password', e as string)}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          maxLength={100}
          value={form.values.confirmPassword}
          errorLabel={form.errors.confirmPassword as string}
          onChange={(e) => form.setFieldValue('confirmPassword', e as string)}
        />
        <Button className="my-3" type="submit">
          Sign up
        </Button>
      </form>
    </CardAuth>
  );
}
