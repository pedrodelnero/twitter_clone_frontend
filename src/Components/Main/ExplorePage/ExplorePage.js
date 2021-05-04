import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Text, CircularProgress } from '@chakra-ui/react';

import Post from './Post/Post';
import { GET_POSTS } from '../../../Graphql/Queries';

const ExplorePage = () => {
  const { loading, error, data: postsData } = useQuery(GET_POSTS);

  return (
    <Box h="100%" w={['100%', '90%', '70%', '70%']} border="1px dashed cyan">
      {loading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        postsData?.posts.map((post) => <Post key={post.id} post={post} />)
      )}
      {error && <Text color="white">Error: {error.message}</Text>}
    </Box>
  );
};

export default ExplorePage;
