import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import cookies from 'next-cookies';
import { useRefreshTokenMutation } from '../../src/generated/graphql';
import { setAccessToken } from '../../src/accessToken';
import { useRouter } from 'next/dist/client/router';

interface refreshProps {
  refreshToken: string | null;
}

const refresh: NextPage<refreshProps> = ({ refreshToken }) => {
  const [refresh, { loading, data, error }] = useRefreshTokenMutation();
  const router = useRouter();

  if (refreshToken) refresh({ variables: { token: refreshToken! } });
  else router.push('/login');

  useEffect(() => {
    if (error || data?.refreshToken.error) router.push('/login');
    if (data?.refreshToken.accessToken) {
      setAccessToken(data?.refreshToken.accessToken);
      router.push('/admin');
    }
  }, [data, error]);

  return null;
};

export default refresh;

export const getServerSideProps: GetServerSideProps<refreshProps> = async (context) => {
  const { jid } = cookies(context);

  return { props: { refreshToken: jid ? jid : null } };
};
