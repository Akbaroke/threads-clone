import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonGoogle from '@/components/atoms/ButtonGoogle';
import CardAuth from '@/components/organisms/CardAuth';

type FormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    try {
      axios.post('http://localhost:5000/users', {
        username: form.values.username,
        email: form.values.email,
        password: form.values.password,
      });
      form.reset();
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardAuth
      tittle="Sign up"
      oAuth={<ButtonGoogle>Sign up with google</ButtonGoogle>}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold hover:underline">
            Signin
          </Link>
        </>
      }>
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
