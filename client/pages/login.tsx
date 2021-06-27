import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react';
import { FieldError, useLoginMutation } from '../src/generated/graphql';
import { setAccessToken } from '../src/accessToken';

interface loginProps {}

const login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [login, { loading, data }] = useLoginMutation();
  const [error, setError] = useState<FieldError>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameRef.current?.value && passwordRef.current?.value)
      login({
        variables: {
          login: {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          },
        },
      });
  };

  useEffect(() => {
    if (data?.login.error) setError(data.login.error);

    if (data?.login.accessToken) {
      // set accessToken
      setAccessToken(data.login.accessToken);
      //
      router.push('/admin');
    }
  }, [loading, data]);

  // console.log(document.cookie);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input ref={usernameRef} />
        <input type="password" ref={passwordRef} />
        <button type="submit" disabled={loading}>
          submit
        </button>
      </form>
      {error?.message}
    </>
  );
};

export default login;
