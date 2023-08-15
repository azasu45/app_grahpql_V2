import type { NextApiRequest, NextApiResponse } from 'next';

async function revalidate(userId: string, token: string) {
  const res = await fetch(
    `https://api.controlbyweb.cloud/api/v1/accounts/3816414018/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.cookies;
  const { userId } = req.body;
  try {
    if (!userId || !token) throw new Error('Invalid cookie');

    const response = await revalidate(userId, token);

    res.status(200).json(response);
  } catch (error) {
    res.redirect('/auth/login');
  }
}
