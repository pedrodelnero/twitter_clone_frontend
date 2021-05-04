import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Text } from '@chakra-ui/react';

import { GET_POSTS } from '../../../../Graphql/Queries';
import Post from './Post/Post';

const PostList = () => {
  const { loading, error, data: postsData } = useQuery(GET_POSTS);
  // const { data: userFFData } = useQuery(GET_USERFOLLOWERSANDFOLLOWED_BY_USERID);

  // console.log('POST list', userFFData);

  return (
    <Box py="3">
      {loading ? (
        <CircularProgress isIndeterminate color="green.300" />
      ) : (
        postsData?.posts.map((post) => <Post key={post.id} post={post} />)
      )}
      {error && <Text color="white">Error: {error.message}</Text>}
    </Box>
  );
};

export default PostList;
