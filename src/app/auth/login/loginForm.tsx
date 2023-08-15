'use client';

import { Button, Card, Flex, Text, TextInput } from '@tremor/react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

type Props = {
  fetchSubmit: (inputs: Inputs) => void;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    localStorage.setItem('user_id', json.userId);
  };

  return (
    <Card className='max-w-xs mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection='col' className='gap-6'>
          <div>
            <Text>Username</Text>
            <TextInput {...register('username', { required: true })} />
          </div>
          <div>
            <Text>Password</Text>
            <TextInput
              {...register('password', {
                required: true,
              })}
              type='password'
            />
          </div>
          <div className='w-full flex'>
            <Button className='ml-auto' type='submit'>
              Enviar
            </Button>
          </div>
        </Flex>
      </form>
    </Card>
  );
}
