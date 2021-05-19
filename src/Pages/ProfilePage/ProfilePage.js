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

import { GET_POSTS_BY_USER, GET_LIKES_BY_USER } from '../../Graphql/Queries';
import { Layout, Post } from '../../Components';

const ProfilePage = () => {
  const { loading, error, data: postsData } = useQuery(GET_POSTS_BY_USER);
  const { loading: likeLoading, error: likeErr, data: likesData } = useQuery(
    GET_LIKES_BY_USER
  );

  return (
    <Layout>
      <Box h="100%" w="100%">
        <Box w="100%" m={2}>
          <Tabs variant="enclosed" isFitted colorScheme="twitter">
            <TabList color="grey">
              <Tab>Tweets</Tab>
              <Tab _selected={{ color: 'white' }}>Likes</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box py="3" width="100%">
                  {loading ? (
                    <CircularProgress isIndeterminate color="green.300" />
                  ) : (
                    postsData?.postsByUser.map((post) => (
                      <Post
                        key={post.id}
                        post={post}
                        query={GET_POSTS_BY_USER}
                      />
                    ))
                  )}
                  {error && <Text color="white">Error: {error.message}</Text>}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box py="3" width="100%">
                  {likeLoading ? (
                    <CircularProgress isIndeterminate color="green.300" />
                  ) : (
                    likesData?.getLikesByUser?.map((like) => (
                      <Post
                        key={like.postId}
                        post={like.post}
                        query={GET_LIKES_BY_USER}
                      />
                    ))
                  )}
                  {likeErr && (
                    <Text color="white">Error: {likeErr.message}</Text>
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProfilePage;
