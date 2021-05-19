import { gql } from '@apollo/client';

export const IS_AUTH = gql`
  query {
    isAuth {
      message
      success
      user {
        handle
        id
        name
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query {
    getOneUser {
      success
      user {
        handle
      }
      message
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id
      text
      ownerId
      user {
        id
        name
        handle
        followers {
          id
          followedId
          followerId
        }
      }
      likes {
        id
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query {
    postsByUser {
      id
      text
      ownerId
      user {
        id
        name
        handle
      }
      likes {
        id
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_LIKES_BY_POST = gql`
  query($postId: ID!) {
    getLikesByPost(postId: $postId) {
      id
      userId
    }
  }
`;

export const GET_LIKES_BY_USER = gql`
  query {
    getLikesByUser {
      id
      userId
      postId
      user {
        id
        name
        handle
      }
      post {
        id
        text
        likes {
          id
          user {
            id
            name
          }
        }
        user {
          id
          name
          handle
        }
      }
    }
  }
`;

export const GET_USERFOLLOWERS_BY_FOLLOWEDID = gql`
  query($followedId: ID!) {
    userFollowers(followedId: $followedId) {
      success
      followers {
        id
        followedId
        followerId
        follower {
          id
          name
        }
      }
    }
  }
`;

export const GET_USERFOLLOWERSANDFOLLOWED_BY_USERID = gql`
  query {
    userFollowersAndFollowed {
      id
      followedId
      followerId
    }
  }
`;

export const GET_POSTS_FOR_FOLLOWER = gql`
  query($ownerId: ID!) {
    postsForFollower(ownerId: $ownerId) {
      success
    }
  }
`;
