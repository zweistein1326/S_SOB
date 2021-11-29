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
