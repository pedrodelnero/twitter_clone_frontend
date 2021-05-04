import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Text,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import Post from './Post/Post';
import { GET_POSTS_BY_USER, GET_LIKES_BY_USER } from '../../../Graphql/Queries';

const ProfilePage = () => {
  const { loading, error, data: postsData } = useQuery(GET_POSTS_BY_USER);
  const { loading1, error1, data: likesData } = useQuery(GET_LIKES_BY_USER);

  return (
    <Box h="100%" w="100%">
      <Box w="100%" m={2}>
        <Tabs variant="enclosed" isFitted colorScheme="twitter">
          <TabList color="grey">
            <Tab>Tweets</Tab>
            <Tab _selected={{ color: 'white' }}>Likes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box py="3" border="1px dashed yellow" width="100%">
                {loading ? (
                  <CircularProgress isIndeterminate color="green.300" />
                ) : (
                  postsData?.postsByUser.map((post) => (
                    <Post key={post.id} post={post} />
                  ))
                )}
                {error && <Text color="white">Error: {error.message}</Text>}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box py="3" border="1px dashed yellow" width="100%">
                {loading1 ? (
                  <CircularProgress isIndeterminate color="green.300" />
                ) : (
                  likesData?.getLikesByUser?.map((like) => (
                    <Post key={like.postId} post={like.post} />
                  ))
                )}
                {error1 && <Text color="white">Error: {error1.message}</Text>}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfilePage;
