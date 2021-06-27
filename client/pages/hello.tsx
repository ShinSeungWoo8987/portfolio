import axios from 'axios';
import React, { useEffect } from 'react';
import { useHelloQuery } from '../src/generated/graphql';
import Cookies from 'js-cookie';
import { getAccessToken } from '../src/accessToken';

interface helloProps {}

const hello: React.FC<helloProps> = () => {
  const { loading, data, error } = useHelloQuery();

  if (data) return <>{data.hello}</>;
  return <>not logged in</>;
};

export default hello;
