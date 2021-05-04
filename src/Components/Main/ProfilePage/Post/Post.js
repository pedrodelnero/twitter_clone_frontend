import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/react';
// import { GET_LIKES } from '../../../../../Graphql/Queries';
import PostHeader from './PostHeader/PostHeader';
import LikeSection from './LikeSection/LikeSection';

import { GET_POSTS_FOR_FOLLOWER } from '../../../../Graphql/Queries';

const Post = ({ post: { id, text, likes, user } }) => {
  console.log('POST', text, user);
  const { data } = useQuery(GET_POSTS_FOR_FOLLOWER, {
    variables: { ownerId: user.id },
  });
  console.log('POST', data?.postsForFollower);

  if (!data?.postsForFollower.success) return <></>;

  return (
    <Box borderBottom="1px solid grey" py="2" px="5">
      <PostHeader author={user} />
      <Text color="white">{text}</Text>
      <LikeSection postId={id} likes={likes} />
    </Box>
  );
};

export default Post;
