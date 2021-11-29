import { gql } from '@apollo/client';

export const LOGIN = gql`
  fragment Payload on REST {
    email: String
    password: String
  }
  mutation Login($input: Payload!) {
    login(input: $input) @rest(type: "Post", method: "Post", path: "/login") {
      status
      token
      message
    }
  }
`;

export const REGISTER = gql`
  fragment Payload on REST {
    username: String
    email: String
    password: String
  }
  mutation Register($input: Payload!) {
    register(input: $input) @rest(type: "Post", method: "Post", path: "/register") {
      status
      token
      message
    }
  }
`;
