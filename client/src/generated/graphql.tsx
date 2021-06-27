import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Introduce = {
  __typename?: 'Introduce';
  id?: Scalars['String'];
  field: Scalars['String'];
  content: Scalars['String'];
};

export type IntroduceInput = {
  field: Scalars['String'];
  content: Scalars['String'];
};

export type IntroduceResponse = {
  __typename?: 'IntroduceResponse';
  error?: Maybe<FieldError>;
  introduce?: Maybe<Introduce>;
  introduces?: Maybe<Array<Introduce>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  refreshToken: UserResponse;
  logout: Scalars['Boolean'];
  createUser: UserResponse;
  createProject: ProjectResponse;
  updateProject: ProjectResponse;
  deleteProject: Scalars['Boolean'];
  createIntroduce: IntroduceResponse;
  updateIntroduce: IntroduceResponse;
};

export type MutationLoginArgs = {
  login: UserInput;
};

export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};

export type MutationCreateUserArgs = {
  register: UserInput;
};

export type MutationCreateProjectArgs = {
  project_img: Array<ProjectImgInput>;
  database: Array<Scalars['String']>;
  cloud: Array<Scalars['String']>;
  back_end: Array<Scalars['String']>;
  front_end: Array<Scalars['String']>;
  project: ProjectInput;
};

export type MutationUpdateProjectArgs = {
  project_img: Array<ProjectImgInput>;
  database: Array<Scalars['String']>;
  cloud: Array<Scalars['String']>;
  back_end: Array<Scalars['String']>;
  front_end: Array<Scalars['String']>;
  project: UpdateProjectInput;
};

export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};

export type MutationCreateIntroduceArgs = {
  introduce: IntroduceInput;
};

export type MutationUpdateIntroduceArgs = {
  introduce: UpdateIntroduceInput;
};

export type Project = {
  __typename?: 'Project';
  id?: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  background_up_color: Scalars['String'];
  background_down_color: Scalars['String'];
  line_color: Scalars['String'];
  font_color: Scalars['String'];
  platform: Scalars['String'];
  domain: Scalars['String'];
  func: Scalars['String'];
  github: Scalars['String'];
  front_end: Array<Scalars['String']>;
  back_end: Array<Scalars['String']>;
  database: Array<Scalars['String']>;
  cloud: Array<Scalars['String']>;
  project_img?: Array<ProjectImg>;
};

export type ProjectImg = {
  __typename?: 'ProjectImg';
  order: Scalars['Int'];
  url: Scalars['String'];
};

export type ProjectImgInput = {
  order: Scalars['Int'];
  url: Scalars['String'];
};

export type ProjectInput = {
  title: Scalars['String'];
  subtitle: Scalars['String'];
  platform: Scalars['String'];
  domain: Scalars['String'];
  func: Scalars['String'];
  github: Scalars['String'];
  background_up_color: Scalars['String'];
  background_down_color: Scalars['String'];
  line_color: Scalars['String'];
  font_color: Scalars['String'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  error?: Maybe<FieldError>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  projects: ProjectResponse;
  introduce: IntroduceResponse;
};

export type UpdateIntroduceInput = {
  field: Scalars['String'];
  content: Scalars['String'];
  id: Scalars['String'];
};

export type UpdateProjectInput = {
  title: Scalars['String'];
  subtitle: Scalars['String'];
  platform: Scalars['String'];
  domain: Scalars['String'];
  func: Scalars['String'];
  github: Scalars['String'];
  background_up_color: Scalars['String'];
  background_down_color: Scalars['String'];
  line_color: Scalars['String'];
  font_color: Scalars['String'];
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
};

export type CreateProjectMutationVariables = Exact<{
  platform: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
  domain: Scalars['String'];
  github: Scalars['String'];
  func: Scalars['String'];
  background_up_color: Scalars['String'];
  background_down_color: Scalars['String'];
  line_color: Scalars['String'];
  font_color: Scalars['String'];
  back_end: Array<Scalars['String']> | Scalars['String'];
  front_end: Array<Scalars['String']> | Scalars['String'];
  database: Array<Scalars['String']> | Scalars['String'];
  cloud: Array<Scalars['String']> | Scalars['String'];
  project_img: Array<ProjectImgInput> | ProjectImgInput;
}>;

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'ProjectResponse' } & {
    error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    project?: Maybe<
      { __typename?: 'Project' } & Pick<
        Project,
        | 'id'
        | 'title'
        | 'subtitle'
        | 'background_up_color'
        | 'background_down_color'
        | 'line_color'
        | 'font_color'
        | 'platform'
        | 'domain'
        | 'func'
        | 'github'
        | 'front_end'
        | 'back_end'
        | 'database'
        | 'cloud'
      > & { project_img: Array<{ __typename?: 'ProjectImg' } & Pick<ProjectImg, 'order' | 'url'>> }
    >;
  };
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteProjectMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deleteProject'>;

export type LoginMutationVariables = Exact<{
  login: UserInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & Pick<UserResponse, 'accessToken'> & {
      error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;

export type RefreshTokenMutation = { __typename?: 'Mutation' } & {
  refreshToken: { __typename?: 'UserResponse' } & Pick<UserResponse, 'accessToken'> & {
      error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    };
};

export type UpdateIntroduceMutationVariables = Exact<{
  introduce: UpdateIntroduceInput;
}>;

export type UpdateIntroduceMutation = { __typename?: 'Mutation' } & {
  updateIntroduce: { __typename?: 'IntroduceResponse' } & {
    error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    introduce?: Maybe<{ __typename?: 'Introduce' } & Pick<Introduce, 'id' | 'field' | 'content'>>;
  };
};

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['String'];
  platform: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
  domain: Scalars['String'];
  github: Scalars['String'];
  func: Scalars['String'];
  background_up_color: Scalars['String'];
  background_down_color: Scalars['String'];
  line_color: Scalars['String'];
  font_color: Scalars['String'];
  back_end: Array<Scalars['String']> | Scalars['String'];
  front_end: Array<Scalars['String']> | Scalars['String'];
  database: Array<Scalars['String']> | Scalars['String'];
  cloud: Array<Scalars['String']> | Scalars['String'];
  project_img: Array<ProjectImgInput> | ProjectImgInput;
}>;

export type UpdateProjectMutation = { __typename?: 'Mutation' } & {
  updateProject: { __typename?: 'ProjectResponse' } & {
    error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    project?: Maybe<
      { __typename?: 'Project' } & Pick<
        Project,
        | 'id'
        | 'title'
        | 'subtitle'
        | 'background_up_color'
        | 'background_down_color'
        | 'line_color'
        | 'font_color'
        | 'platform'
        | 'domain'
        | 'func'
        | 'github'
        | 'front_end'
        | 'back_end'
        | 'database'
        | 'cloud'
      > & { project_img: Array<{ __typename?: 'ProjectImg' } & Pick<ProjectImg, 'order' | 'url'>> }
    >;
  };
};

export type IntroduceQueryVariables = Exact<{ [key: string]: never }>;

export type IntroduceQuery = { __typename?: 'Query' } & {
  introduce: { __typename?: 'IntroduceResponse' } & {
    error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    introduces?: Maybe<Array<{ __typename?: 'Introduce' } & Pick<Introduce, 'id' | 'field' | 'content'>>>;
  };
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>;

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = { __typename?: 'Query' } & {
  projects: { __typename?: 'ProjectResponse' } & {
    error?: Maybe<{ __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>>;
    projects?: Maybe<
      Array<
        { __typename?: 'Project' } & Pick<
          Project,
          | 'id'
          | 'title'
          | 'subtitle'
          | 'platform'
          | 'domain'
          | 'func'
          | 'github'
          | 'background_up_color'
          | 'background_down_color'
          | 'line_color'
          | 'font_color'
          | 'front_end'
          | 'back_end'
          | 'database'
          | 'cloud'
        > & { project_img: Array<{ __typename?: 'ProjectImg' } & Pick<ProjectImg, 'order' | 'url'>> }
      >
    >;
  };
};

export const CreateProjectDocument = gql`
  mutation CreateProject(
    $platform: String!
    $subtitle: String!
    $title: String!
    $domain: String!
    $github: String!
    $func: String!
    $background_up_color: String!
    $background_down_color: String!
    $line_color: String!
    $font_color: String!
    $back_end: [String!]!
    $front_end: [String!]!
    $database: [String!]!
    $cloud: [String!]!
    $project_img: [ProjectImgInput!]!
  ) {
    createProject(
      project: {
        platform: $platform
        subtitle: $subtitle
        title: $title
        domain: $domain
        github: $github
        func: $func
        background_up_color: $background_up_color
        background_down_color: $background_down_color
        line_color: $line_color
        font_color: $font_color
      }
      back_end: $back_end
      front_end: $front_end
      database: $database
      cloud: $cloud
      project_img: $project_img
    ) {
      error {
        field
        message
      }
      project {
        id
        title
        subtitle
        background_up_color
        background_down_color
        line_color
        font_color
        platform
        domain
        func
        github
        front_end
        back_end
        database
        cloud
        project_img {
          order
          url
        }
      }
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      platform: // value for 'platform'
 *      subtitle: // value for 'subtitle'
 *      title: // value for 'title'
 *      domain: // value for 'domain'
 *      github: // value for 'github'
 *      func: // value for 'func'
 *      background_up_color: // value for 'background_up_color'
 *      background_down_color: // value for 'background_down_color'
 *      line_color: // value for 'line_color'
 *      font_color: // value for 'font_color'
 *      back_end: // value for 'back_end'
 *      front_end: // value for 'front_end'
 *      database: // value for 'database'
 *      cloud: // value for 'cloud'
 *      project_img: // value for 'project_img'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const DeleteProjectDocument = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id)
  }
`;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
}
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($login: UserInput!) {
    login(login: $login) {
      error {
        field
        message
      }
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      error {
        field
        message
      }
      accessToken
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const UpdateIntroduceDocument = gql`
  mutation UpdateIntroduce($introduce: UpdateIntroduceInput!) {
    updateIntroduce(introduce: $introduce) {
      error {
        field
        message
      }
      introduce {
        id
        field
        content
      }
    }
  }
`;
export type UpdateIntroduceMutationFn = Apollo.MutationFunction<
  UpdateIntroduceMutation,
  UpdateIntroduceMutationVariables
>;

/**
 * __useUpdateIntroduceMutation__
 *
 * To run a mutation, you first call `useUpdateIntroduceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIntroduceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIntroduceMutation, { data, loading, error }] = useUpdateIntroduceMutation({
 *   variables: {
 *      introduce: // value for 'introduce'
 *   },
 * });
 */
export function useUpdateIntroduceMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateIntroduceMutation, UpdateIntroduceMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateIntroduceMutation, UpdateIntroduceMutationVariables>(
    UpdateIntroduceDocument,
    options
  );
}
export type UpdateIntroduceMutationHookResult = ReturnType<typeof useUpdateIntroduceMutation>;
export type UpdateIntroduceMutationResult = Apollo.MutationResult<UpdateIntroduceMutation>;
export type UpdateIntroduceMutationOptions = Apollo.BaseMutationOptions<
  UpdateIntroduceMutation,
  UpdateIntroduceMutationVariables
>;
export const UpdateProjectDocument = gql`
  mutation UpdateProject(
    $id: String!
    $platform: String!
    $subtitle: String!
    $title: String!
    $domain: String!
    $github: String!
    $func: String!
    $background_up_color: String!
    $background_down_color: String!
    $line_color: String!
    $font_color: String!
    $back_end: [String!]!
    $front_end: [String!]!
    $database: [String!]!
    $cloud: [String!]!
    $project_img: [ProjectImgInput!]!
  ) {
    updateProject(
      project: {
        id: $id
        platform: $platform
        subtitle: $subtitle
        title: $title
        domain: $domain
        github: $github
        func: $func
        background_up_color: $background_up_color
        background_down_color: $background_down_color
        line_color: $line_color
        font_color: $font_color
      }
      back_end: $back_end
      front_end: $front_end
      database: $database
      cloud: $cloud
      project_img: $project_img
    ) {
      error {
        field
        message
      }
      project {
        id
        title
        subtitle
        background_up_color
        background_down_color
        line_color
        font_color
        platform
        domain
        func
        github
        front_end
        back_end
        database
        cloud
        project_img {
          order
          url
        }
      }
    }
  }
`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      platform: // value for 'platform'
 *      subtitle: // value for 'subtitle'
 *      title: // value for 'title'
 *      domain: // value for 'domain'
 *      github: // value for 'github'
 *      func: // value for 'func'
 *      background_up_color: // value for 'background_up_color'
 *      background_down_color: // value for 'background_down_color'
 *      line_color: // value for 'line_color'
 *      font_color: // value for 'font_color'
 *      back_end: // value for 'back_end'
 *      front_end: // value for 'front_end'
 *      database: // value for 'database'
 *      cloud: // value for 'cloud'
 *      project_img: // value for 'project_img'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;
export const IntroduceDocument = gql`
  query Introduce {
    introduce {
      error {
        field
        message
      }
      introduces {
        id
        field
        content
      }
    }
  }
`;

/**
 * __useIntroduceQuery__
 *
 * To run a query within a React component, call `useIntroduceQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntroduceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntroduceQuery({
 *   variables: {
 *   },
 * });
 */
export function useIntroduceQuery(baseOptions?: Apollo.QueryHookOptions<IntroduceQuery, IntroduceQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IntroduceQuery, IntroduceQueryVariables>(IntroduceDocument, options);
}
export function useIntroduceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IntroduceQuery, IntroduceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IntroduceQuery, IntroduceQueryVariables>(IntroduceDocument, options);
}
export type IntroduceQueryHookResult = ReturnType<typeof useIntroduceQuery>;
export type IntroduceLazyQueryHookResult = ReturnType<typeof useIntroduceLazyQuery>;
export type IntroduceQueryResult = Apollo.QueryResult<IntroduceQuery, IntroduceQueryVariables>;
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
}
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const ProjectsDocument = gql`
  query Projects {
    projects {
      error {
        field
        message
      }
      projects {
        id
        title
        subtitle
        platform
        domain
        func
        github
        background_up_color
        background_down_color
        line_color
        font_color
        front_end
        back_end
        database
        cloud
        project_img {
          order
          url
        }
      }
    }
  }
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
