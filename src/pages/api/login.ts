import { setCookie } from '@app/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type Inputs = {
  username: string;
  password: string;
};

async function login({ password, username }: Inputs) {
  const res = await fetch('https://api.controlbyweb.cloud/api/v1/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'password',
      username,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  try {
    const response = await login({ username, password });

    const parseUser = JSON.stringify({
      userId: response.user_id,
      token: response.access_token,
    });

    setCookie(res, 'user', parseUser, {
      path: '/',
      maxAge: 2592000,
    });

    res.getHeader('Set-Cookie');
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
