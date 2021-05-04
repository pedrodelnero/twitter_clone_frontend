import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PostHeader from './PostHeader/PostHeader';
import LikeSection from './LikeSection/LikeSection';

const Post = ({ post: { id, text, likes, user } }) => (
  <Box borderBottom="1px solid grey" py="2" px="5">
    <PostHeader author={user} />
    <Text color="white">{text}</Text>
    <LikeSection postId={id} likes={likes} />
  </Box>
);

export default Post;
