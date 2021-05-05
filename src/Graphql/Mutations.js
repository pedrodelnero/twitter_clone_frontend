import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation(
    $name: String!
    $handle: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      name: $name
      handle: $handle
      password: $password
      confirmPassword: $confirmPassword
    ) {
      success
      message
      user {
        id
        name
        handle
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($handle: String!, $password: String!) {
    loginUser(handle: $handle, password: $password) {
      success
      message
      user {
        id
        name
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation($followedId: ID!) {
    followUser(followedId: $followedId) {
      id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation($followedId: ID!) {
    unfollowUser(followedId: $followedId) {
      message
    }
  }
`;

export const CREATE_POST = gql`
  mutation($text: String!) {
    createPost(text: $text) {
      id
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation($postId: ID!) {
    toggleLike(postId: $postId) {
      success
      message
    }
  }
`;
