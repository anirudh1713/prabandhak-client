/* eslint-disable react/jsx-props-no-spreading */
import type { NextPage } from 'next';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import Input from '../../components/Input';
import Button from '../../components/Button';

const registerFormSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty(),
});
type RegisterFormData = z.infer<typeof registerFormSchema>

const Register: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    reValidateMode: 'onChange',
  });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = handleSubmit(() => {
    // TODO - Call register API
  });

  return (
    <div className="h-screen w-full bg-white grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-col mx-20 space-y-5">
          <header>
            <h1 className="text-5xl font-extrabold mb-8 flex flex-col">
              <span>Create your</span>
              <span>
                Account
              </span>
            </h1>
          </header>
          <form
            className="flex flex-col space-y-8 justify-center items-start"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col space-y-6 w-full">
              <Input
                type="text"
                placeholder="Full Name"
                label="Full Name"
                {...register('fullName')}
                error={errors.fullName?.message}
              />
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
            </div>
            <Button
              type="submit"
              rightIcon={<BsArrowRight className="w-5 h-5" />}
            >
              Register
            </Button>
          </form>
          <span className="text-base text-gray-600">
            Already have an account?
            {' '}
            <Link href="/login">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="font-semibold text-blue-600 hover:underline hover:underline-offset-2">
                Login
              </a>
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-[length:400%_400%] bg-gradient-to-l from-sky-400 to-indigo-900 animate-gradient-flow hidden md:block" />
    </div>
  );
};

export default Register;
