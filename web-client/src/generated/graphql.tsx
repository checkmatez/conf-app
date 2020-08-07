import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
const gql = Apollo.gql;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  chatRooms: ChatRoomsResult;
  currentUser: User;
  messages: MessagesResult;
  serviceDescription: Scalars["String"];
  users: UsersResult;
};

export type QueryChatRoomsArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type QueryMessagesArgs = {
  chatRoomId: Scalars["ID"];
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type InputArgError = {
  __typename?: "InputArgError";
  argName: Scalars["String"];
  message: Scalars["String"];
};

export type InputError = {
  argErrors: Array<InputArgError>;
  code: Scalars["String"];
  message: Scalars["String"];
};

export type User = {
  __typename?: "User";
  avatarUrl?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  githubProfileUrl?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  username: Scalars["String"];
};

export type UsersResult = {
  __typename?: "UsersResult";
  total: Scalars["Int"];
  nodes: Array<User>;
};

export type AuthResult = {
  __typename?: "AuthResult";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
  user: User;
};

export type SignupResponse = AuthResult | SignupError;

export type SignupError = InputError & {
  __typename?: "SignupError";
  code: Scalars["String"];
  message: Scalars["String"];
  argErrors: Array<InputArgError>;
};

export type LoginResponse = AuthResult | LoginError;

export type LoginError = InputError & {
  __typename?: "LoginError";
  code: Scalars["String"];
  message: Scalars["String"];
  argErrors: Array<InputArgError>;
};

export type GenerateTokensResponse = AuthResult | GenerateTokensError;

export type GenerateTokensError = InputError & {
  __typename?: "GenerateTokensError";
  code: Scalars["String"];
  message: Scalars["String"];
  argErrors: Array<InputArgError>;
};

export type Mutation = {
  __typename?: "Mutation";
  addChatMessage: Message;
  createChatRoom: CreateChatRoomResponse;
  generateTokens: GenerateTokensResponse;
  login: LoginResponse;
  signup: SignupResponse;
};

export type MutationAddChatMessageArgs = {
  text: Scalars["String"];
  chatRoomId: Scalars["ID"];
};

export type MutationCreateChatRoomArgs = {
  name: Scalars["String"];
};

export type MutationGenerateTokensArgs = {
  refreshToken: Scalars["String"];
};

export type MutationLoginArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignupArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
};

export type ChatRoom = {
  __typename?: "ChatRoom";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ChatRoomsResult = {
  __typename?: "ChatRoomsResult";
  total: Scalars["Int"];
  nodes: Array<ChatRoom>;
};

export type CreateChatRoomResponse = ChatRoom | CreateChatRoomError;

export type CreateChatRoomError = InputError & {
  __typename?: "CreateChatRoomError";
  code: Scalars["String"];
  message: Scalars["String"];
  argErrors: Array<InputArgError>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  text: Scalars["String"];
  author: User;
  chatRoom: ChatRoom;
};

export type MessagesResult = {
  __typename?: "MessagesResult";
  total: Scalars["Int"];
  nodes: Array<Message>;
};

export type Subscription = {
  __typename?: "Subscription";
  chatMessageAdded: Message;
};

export type SubscriptionChatMessageAddedArgs = {
  chatRoomId: Scalars["ID"];
};

export type GenerateTokensMutationVariables = Exact<{
  refreshToken: Scalars["String"];
}>;

export type GenerateTokensMutation = { __typename?: "Mutation" } & {
  generateTokens:
    | ({ __typename: "AuthResult" } & Pick<
        AuthResult,
        "accessToken" | "refreshToken"
      >)
    | { __typename: "GenerateTokensError" };
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login:
    | ({ __typename?: "AuthResult" } & Pick<
        AuthResult,
        "accessToken" | "refreshToken"
      >)
    | ({ __typename?: "LoginError" } & Pick<LoginError, "code" | "message">);
};

export type ChatRoomsQueryVariables = Exact<{
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
}>;

export type ChatRoomsQuery = { __typename?: "Query" } & {
  chatRooms: { __typename?: "ChatRoomsResult" } & Pick<
    ChatRoomsResult,
    "total"
  > & {
      nodes: Array<{ __typename?: "ChatRoom" } & Pick<ChatRoom, "id" | "name">>;
    };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "email" | "avatarUrl" | "githubProfileUrl"
  >;
};

export type MessagesQueryVariables = Exact<{
  chatRoomId: Scalars["ID"];
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
}>;

export type MessagesQuery = { __typename?: "Query" } & {
  messages: { __typename?: "MessagesResult" } & Pick<
    MessagesResult,
    "total"
  > & {
      nodes: Array<{ __typename?: "Message" } & Pick<Message, "id" | "text">>;
    };
};

export type MessageAddedSubscriptionVariables = Exact<{
  chatRoomId: Scalars["ID"];
}>;

export type MessageAddedSubscription = { __typename?: "Subscription" } & {
  chatMessageAdded: { __typename?: "Message" } & Pick<Message, "id" | "text">;
};

export const GenerateTokensDocument = gql`
  mutation generateTokens($refreshToken: String!) {
    generateTokens(refreshToken: $refreshToken) {
      __typename
      ... on AuthResult {
        accessToken
        refreshToken
      }
    }
  }
`;

/**
 * __useGenerateTokensMutation__
 *
 * To run a mutation, you first call `useGenerateTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTokensMutation, { data, loading, error }] = useGenerateTokensMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useGenerateTokensMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateTokensMutation,
    GenerateTokensMutationVariables
  >
) {
  return Apollo.useMutation<
    GenerateTokensMutation,
    GenerateTokensMutationVariables
  >(GenerateTokensDocument, baseOptions);
}
export type GenerateTokensMutationHookResult = ReturnType<
  typeof useGenerateTokensMutation
>;
export type GenerateTokensMutationResult = Apollo.MutationResult<
  GenerateTokensMutation
>;
export type GenerateTokensMutationOptions = Apollo.BaseMutationOptions<
  GenerateTokensMutation,
  GenerateTokensMutationVariables
>;
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on AuthResult {
        accessToken
        refreshToken
      }
      ... on InputError {
        code
        message
      }
    }
  }
`;

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
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const ChatRoomsDocument = gql`
  query chatRooms($page: Int, $pageSize: Int) {
    chatRooms(page: $page, pageSize: $pageSize) {
      total
      nodes {
        id
        name
      }
    }
  }
`;

/**
 * __useChatRoomsQuery__
 *
 * To run a query within a React component, call `useChatRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatRoomsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useChatRoomsQuery(
  baseOptions?: Apollo.QueryHookOptions<ChatRoomsQuery, ChatRoomsQueryVariables>
) {
  return Apollo.useQuery<ChatRoomsQuery, ChatRoomsQueryVariables>(
    ChatRoomsDocument,
    baseOptions
  );
}
export function useChatRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChatRoomsQuery,
    ChatRoomsQueryVariables
  >
) {
  return Apollo.useLazyQuery<ChatRoomsQuery, ChatRoomsQueryVariables>(
    ChatRoomsDocument,
    baseOptions
  );
}
export type ChatRoomsQueryHookResult = ReturnType<typeof useChatRoomsQuery>;
export type ChatRoomsLazyQueryHookResult = ReturnType<
  typeof useChatRoomsLazyQuery
>;
export type ChatRoomsQueryResult = Apollo.QueryResult<
  ChatRoomsQuery,
  ChatRoomsQueryVariables
>;
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      username
      email
      avatarUrl
      githubProfileUrl
    }
  }
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const MessagesDocument = gql`
  query messages($chatRoomId: ID!, $page: Int, $pageSize: Int) {
    messages(chatRoomId: $chatRoomId, page: $page, pageSize: $pageSize) {
      total
      nodes {
        id
        text
      }
    }
  }
`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chatRoomId: // value for 'chatRoomId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>
) {
  return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(
    MessagesDocument,
    baseOptions
  );
}
export function useMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MessagesQuery,
    MessagesQueryVariables
  >
) {
  return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(
    MessagesDocument,
    baseOptions
  );
}
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<
  typeof useMessagesLazyQuery
>;
export type MessagesQueryResult = Apollo.QueryResult<
  MessagesQuery,
  MessagesQueryVariables
>;
export const MessageAddedDocument = gql`
  subscription messageAdded($chatRoomId: ID!) {
    chatMessageAdded(chatRoomId: $chatRoomId) {
      id
      text
    }
  }
`;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      chatRoomId: // value for 'chatRoomId'
 *   },
 * });
 */
export function useMessageAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    MessageAddedSubscription,
    MessageAddedSubscriptionVariables
  >(MessageAddedDocument, baseOptions);
}
export type MessageAddedSubscriptionHookResult = ReturnType<
  typeof useMessageAddedSubscription
>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<
  MessageAddedSubscription
>;
