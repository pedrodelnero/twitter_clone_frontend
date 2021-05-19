import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { GET_USERFOLLOWERS_BY_FOLLOWEDID } from '../../../Graphql/Queries';
import { TOGGLE_FOLLOW } from '../../../Graphql/Mutations';

const authToken = Cookies.get('auth');

const PostHeader = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    refetchQueries: [
      {
        query: GET_USERFOLLOWERS_BY_FOLLOWEDID,

        variables: { followedId: author.id },
      },
    ],
  });

  const { loading: queryLoading, error, data: userFollowerData } = useQuery(
    GET_USERFOLLOWERS_BY_FOLLOWEDID,
    {
      variables: { followedId: author.id },
    }
  );

  useEffect(() => {
    if (userFollowerData?.userFollowers?.success) {
      userFollowerData?.userFollowers?.followers.some(
        (el) => el.followerId === authToken
      )
        ? setIsFollowing(true)
        : setIsFollowing(false);
    } else {
      setIsFollowing(false);
    }
  }, [userFollowerData]);

  const handleFollow = () => {
    toggleFollow({
      variables: { followedId: author.id },
    });
  };

  if (queryLoading) return <Text>Loading...</Text>;
  if (error) return <Text>!! ERROR !!</Text>;

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
        <Box marginLeft="auto">
          {authToken === author.id ? (
            <EditIcon
              color="white"
              w={6}
              h={6}
              mr={6}
              onClick={() => console.log('click')}
            />
          ) : (
            <Button
              color="white"
              colorScheme="twitter"
              borderRadius="20px"
              onClick={handleFollow}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PostHeader;
