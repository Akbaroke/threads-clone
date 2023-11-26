import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { isEmail, useForm } from '@mantine/form';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import CardAuth from '@/components/organisms/CardAuth';
import { loginUser } from '@/store/actions/authAsync';
import Link from 'next/link';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { encryptData } from '@/utils/cipher';
import { resendEmailVerification } from '@/services/resendEmailVerification';
import { HeadMetaData } from '@/components/HeadMetaData';

type FormType = {
  email: string;
  password: string;
};

export default function Signin() {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Email is not valid.'),
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters.' : null,
    },
  });

  const handleSubmit = () => {
    // @ts-ignore
    dispatch(loginUser(form.values)).then((res) => {
      switch (res.payload?.statusCode) {
        case 200:
          push('/');
          break;
        case 403:
          form.reset();
          push({
            pathname: '/verify',
            query: {
              data: encryptData(form.values.email),
            },
          });
          resendEmailVerification(form.values.email);
          break;
      }
    });
  };

  return (
    <CardAuth
      tittle="Sign in"
      oAuth={
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2">
          <FcGoogle size={18} />
          Sign in with google
        </Button>
      }
      footer={
        <>
          Dont have an account ?{' '}
          <Link href="/signup" className="font-semibold hover:underline">
            Sign up
          </Link>
        </>
      }>
      <HeadMetaData title="Signin" />
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
        <Input
          id="password"
          label="Password"
          type="password"
          maxLength={100}
          value={form.values.password}
          errorLabel={form.errors.password as string}
          onChange={(e) => form.setFieldValue('password', e as string)}
        />
        <Link
          href="/forgotPassword"
          className="text-[14px] ml-auto w-max hover:underline">
          Forgot password?
        </Link>
        <Button className="my-3" type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </CardAuth>
  );
}
