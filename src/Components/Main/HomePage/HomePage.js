import React from 'react';
import { Flex } from '@chakra-ui/react';

import InputTweet from './InputTweet';
import PostList from './PostList';

const HomePage = () => {
  console.log('home page');
  return (
    <Flex
      flexDir="column"
      h="100%"
      w={['100%', '90%', '70%', '70%']}
      borderLeft="1px solid grey"
    >
      <InputTweet />
      <PostList />
    </Flex>
  );
};

export default HomePage;
