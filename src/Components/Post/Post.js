import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Text } from '@chakra-ui/react';
import PostHeader from './PostHeader/PostHeader';
import LikeSection from './LikeSection/LikeSection';

import { GET_POSTS_FOR_FOLLOWER } from '../../Graphql/Queries';

const Post = ({ post: { id, text, likes, user }, query }) => {
  const { pathname } = useLocation();
  const { data } = useQuery(GET_POSTS_FOR_FOLLOWER, {
    variables: { ownerId: user.id },
  });

  if (pathname === '/explore')
    return (
      <Box borderBottom="1px solid grey" py="2" px="5">
        <PostHeader author={user} queryToFetch={query} />
        <Text color="white">{text}</Text>
        <LikeSection postId={id} likes={likes} queryToFetch={query} />
      </Box>
    );

  if (!data?.postsForFollower.success && pathname === '/home') return null;

  return (
    <Box borderBottom="1px solid grey" py="2" px="5">
      <PostHeader author={user} queryToFetch={query} />
      <Text color="white">{text}</Text>
      <LikeSection postId={id} likes={likes} queryToFetch={query} />
    </Box>
  );
};

export default Post;
