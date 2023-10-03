import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { isEmail, useForm } from '@mantine/form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/actions/authAsync';
import CardAuth from '@/components/organisms/CardAuth';

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

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
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(loginUser(form.values)).then((user) => {
        console.log('Login :', user.meta.requestStatus);
        if (user.meta.requestStatus === 'fulfilled') {
          console.log('Login Success');
          navigate(from, { replace: true });
          form.reset();
        } else {
          console.log('Login Failed');
        }
      });
    } catch (error) {
      console.error('Login Failed', error);
    }
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
          <Link to="/signup" className="font-semibold hover:underline">
            Sign up
          </Link>
        </>
      }>
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
        <Button className="my-3" type="submit">
          Sign in
        </Button>
      </form>
    </CardAuth>
  );
}
