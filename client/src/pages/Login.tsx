import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { isEmail, useForm } from '@mantine/form';
import { FcGoogle } from 'react-icons/fc';
import LOGO from '@/assets/threads-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

type FormType = {
  email: string;
  password: string;
};

interface UsersResponse {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    try {
      const data = await axios.get('http://localhost:5000/users');
      const query = data.data.find(
        (user: UsersResponse) => user.email === form.values.email
      );
      if (query) {
        if (query.password === form.values.password) {
          form.reset();
          navigate('/');
        }
      } else {
        alert('Email and Password does not match');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-xl rounded-xl p-5 max-w-md m-auto my-14">
      <div className="flex flex-col items-center gap-2">
        <img src={LOGO} alt="logo" className="w-[35px]" />
        <h1 className="font-bold text-[22px]">Sign in</h1>
      </div>
      <div className="my-6 flex flex-col gap-6">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2">
          <FcGoogle size={18} />
          Sign in with google
        </Button>
        <div className="flex items-center gap-2 [&>span]:w-full [&>span]:border [&>span]:border-gray-100 [&>span]:h-max [&>span]:rounded-full font-semibold text-[14px]">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>
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
      <div className="my-3">
        Dont have an account ?{' '}
        <Link to="/signup" className="font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
