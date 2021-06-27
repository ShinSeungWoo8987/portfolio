import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getAccessToken, setAccessToken, setupAxiosInterceptors } from '../../src/accessToken';
import { useIntroduceLazyQuery, useLogoutMutation, useProjectsLazyQuery } from '../../src/generated/graphql';
import Create from '../../src/components/admin/Create';
import Update from '../../src/components/admin/Update';
import Delete from '../../src/components/admin/Delete';
import { Container } from '../../styles/globals';
import styled from 'styled-components';

const index: NextPage = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const [mode, setMode] = useState('create');

  const [getProjects, projects] = useProjectsLazyQuery();
  const [getIntroduce, introduces] = useIntroduceLazyQuery();

  const onlogout = () => {
    setAccessToken();
    logout().then((res) => {
      if (res.data?.logout) router.push('/');
    });
  };

  useEffect(() => {
    if (!getAccessToken()) router.push('/admin/refresh');
    else {
      setupAxiosInterceptors();
      getProjects();
      getIntroduce();
    }
  }, []);

  if (!getAccessToken()) return <></>;
  else
    return (
      <AdminContainer>
        <Top>
          Admin Page
          <button onClick={() => onlogout()}>Logout</button>
        </Top>

        <Select onChange={(e) => setMode(e.target.value)}>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </Select>

        {mode === 'create' && <Create />}
        {mode === 'update' && <Update projects={projects} introduces={introduces} />}
        {mode === 'delete' && <Delete projects={projects} />}
      </AdminContainer>
    );
};

export default index;

const AdminContainer = styled(Container)`
  padding: 2rem 4rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  display: block;
  margin: 2rem 0;
`;
