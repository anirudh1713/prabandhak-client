/* eslint-disable react/jsx-props-no-spreading */
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import axios from '../../lib/axios';
import Button from '../../components/Button';
import Input from '../../components/Input';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
type LoginFormData = z.infer<typeof loginFormSchema>

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    reValidateMode: 'onChange',
  });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = handleSubmit(async (data) => {
    await axios.post('/auth/login', {
      ...data,
    });
  });

  return (
    <div className="h-screen w-full bg-white grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-col mx-20 space-y-10">
          <header>
            <h1 className="text-5xl font-extrabold mb-8 flex flex-col">
              <span>Welcome back</span>
              <span>
                to
                {' '}
                <span className="text-blue-700">Prabandhak</span>
              </span>
            </h1>
            <h5 className="text-lg text-gray-600">Sign in to your account.</h5>
          </header>
          <form
            className="flex flex-col space-y-8 justify-center items-start"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col space-y-6 w-full">
              <Input
                type="email"
                placeholder="Email"
                label="Email"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                type="password"
                placeholder="Password"
                label="Password"
                {...register('password')}
                error={errors.password?.message}
              />
              <Link href="/forgot-password">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="w-max text-base text-gray-600 underline underline-offset-2">Forgot password?</a>
              </Link>
            </div>
            <Button
              type="submit"
              rightIcon={<BsArrowRight className="w-5 h-5" />}
            >
              Sign in
            </Button>
          </form>
          <span className="text-base text-gray-600">
            Don&apos;t have an account?
            {' '}
            <Link href="/register">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="font-semibold text-blue-600 hover:underline hover:underline-offset-2">
                Register
              </a>
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-[length:400%_400%] bg-gradient-to-l from-sky-400 to-indigo-900 animate-gradient-flow hidden md:block" />
    </div>
  );
};

export default Login;
