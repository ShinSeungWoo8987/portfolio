import React, { useRef, useState } from 'react';
import { LazyQueryResult } from '@apollo/client';
import { Exact, ProjectsQuery, useDeleteProjectMutation } from '../../generated/graphql';
import { Select } from './Create';
import { useRouter } from 'next/router';

interface DeleteProps {
  projects: LazyQueryResult<
    ProjectsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}

const Delete: React.FC<DeleteProps> = ({ projects: { data, loading, error } }) => {
  const router = useRouter();
  const _project = Boolean(data?.projects.projects) ? data?.projects.projects! : [];
  const projectRef = useRef<HTMLSelectElement>(null);

  const [deleteProject] = useDeleteProjectMutation();

  const onDelete = () => {
    if (projectRef.current?.value)
      deleteProject({ variables: { id: projectRef.current.value } })
        .then((res) => {
          if (res.data) {
            window.alert('Successfully Delete Project');
            router.push('/admin');
          } else window.alert('Delete Project Failed.');
        })
        .catch(() => window.alert('Delete Project Failed.'));
  };

  return (
    <>
      Delete
      <Select ref={projectRef}>
        {_project.map((i, idx) => (
          <option key={i.id} value={i.id}>
            {i.title}
          </option>
        ))}
      </Select>
      <button onClick={() => onDelete()}>Delete</button>
    </>
  );
};

export default Delete;
