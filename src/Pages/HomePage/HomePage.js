import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Flex, Box, CircularProgress, Text } from '@chakra-ui/react';

import InputTweet from './InputTweet';
import { GET_POSTS } from '../../Graphql/Queries';
import { Layout, Post } from '../../Components';

const HomePage = () => {
  const [postsData, setPostsData] = useState(null);
  const { loading, error, data } = useQuery(GET_POSTS);

  useEffect(() => {
    if (data) setPostsData(data);
  }, [data]);
  return (
    <Layout>
      <Flex
        flexDir="column"
        h="100%"
        w={['100%', '90%', '70%', '70%']}
        borderLeft="1px solid grey"
      >
        <InputTweet query={GET_POSTS} />
        <Box py="3">
          {loading ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : (
            postsData?.posts.map((post) => (
              <Post key={post.id} post={post} query={GET_POSTS} />
            ))
          )}
          {error && <Text color="white">Error: {error.message}</Text>}
        </Box>
      </Flex>
    </Layout>
  );
};

export default HomePage;
