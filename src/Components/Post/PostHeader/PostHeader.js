import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { GET_USERFOLLOWERS_BY_FOLLOWEDID } from '../../../Graphql/Queries';
import { FOLLOW_USER, UNFOLLOW_USER } from '../../../Graphql/Mutations';

const authToken = Cookies.get('auth');

const PostHeader = ({ author }) => {
  const { loading, error, data: userFollowerData } = useQuery(
    GET_USERFOLLOWERS_BY_FOLLOWEDID,
    {
      variables: { followedId: author.id },
    }
  );
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>!! ERROR !!</Text>;

  const handleFollow = () => {
    followUser({ variables: { followedId: author.id } });
  };

  const handleUnfollow = () => {
    unfollowUser({ variables: { followedId: author.id } });
  };

  // console.log('author', userFollowerData);

  return (
    <Box mb="2">
      <Flex align="center">
        <Box mr="3">
          <Heading size="md" color="white">
            {author.name}
          </Heading>
        </Box>
        <Box>
          <Text color="lightgray">@{author.handle}</Text>
        </Box>
        {authToken === author.id ? null : userFollowerData.userFollowers.some(
            (el) => el.followerId === authToken
          ) ? (
          <Box marginLeft="auto">
            <Button
              color="white"
              colorScheme="twitter"
              borderRadius="20px"
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>
          </Box>
        ) : (
          <Box marginLeft="auto">
            <Button
              color="white"
              colorScheme="twitter"
              borderRadius="20px"
              onClick={handleFollow}
            >
              Follow
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PostHeader;
