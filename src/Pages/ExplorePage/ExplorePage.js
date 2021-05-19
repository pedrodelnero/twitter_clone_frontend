import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Text, CircularProgress } from '@chakra-ui/react';

import { GET_POSTS } from '../../Graphql/Queries';
import { Layout, Post } from '../../Components';

const ExplorePage = () => {
  const { loading, error, data: postsData } = useQuery(GET_POSTS);

  // console.log(postsData);

  return (
    <Layout>
      <Box h="100%" w={['100%', '90%', '70%', '70%']}>
        {loading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : (
          postsData?.posts.map((post) => (
            <Post key={post.id} post={post} query={GET_POSTS} />
          ))
        )}
        {error && <Text color="white">Error: {error.message}</Text>}
      </Box>
    </Layout>
  );
};

export default ExplorePage;
