import axios from '@/axios';

export async function resendEmailVerification(email: string) {
  const { data } = await axios.post('/auth/resendverification', {
    email,
  });

  return data;
}
