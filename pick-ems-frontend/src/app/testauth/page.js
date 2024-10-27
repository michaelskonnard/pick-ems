import axios, { axiosPrivate } from '@/api/axios';
import { cookies } from 'next/headers';

const fetchTestData = async (cookie) => {
  try {
    const response = await axiosPrivate.get('/', {
      headers: {
        Cookie: `jwt=${cookie}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
    return null;
  }
};

export default async function testAuth() {
  const jwtcookies = cookies().get('jwt')?.value ?? '';
  const data = await fetchTestData(jwtcookies);
  return (
    <div>
      <h1>This page should be protected</h1>
      <p>{data ? JSON.stringify(data) : 'No data available'}</p>
    </div>
  );
}
