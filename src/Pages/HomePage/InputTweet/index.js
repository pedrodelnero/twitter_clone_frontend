import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/';

import { CREATE_POST } from '../../../Graphql/Mutations';
// import { GET_POSTS_FOR_FOLLOWER } from '../../../Graphql/Queries';
import { TweetModal } from '../../../Components';

const InputTweet = ({ query }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState('');
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query }],
  });

  const handleCreatePost = () => {
    createPost({
      variables: { text: postText },
    });
  };

  return (
    <Box borderBottom="1px solid grey">
      <Box py="2" px="5" borderBottom="1px solid grey">
        <Box>
          <Heading color="white" fontSize="2xl">
            Home
          </Heading>
        </Box>
      </Box>
      <Box
        py="2"
        px="5"
        // border="1px solid cyan"
        display={['none', 'block', 'block', 'block']}
      >
        <Flex flexDirection="column">
          <Box py="2">
            <Input
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's hapenning..."
              color="white"
              variant="unstyled"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="sans-serif"
            />
          </Box>
          <Box alignSelf="flex-end">
            <Button
              color="white"
              colorScheme="twitter"
              borderRadius="20px"
              onClick={handleCreatePost}
            >
              Tweet
            </Button>
          </Box>
        </Flex>
      </Box>
      <Button
        position="absolute"
        bottom="10"
        right="10"
        display={['block', 'none', 'none', 'none']}
        color="white"
        variant="solid"
        borderRadius="30px"
        h="60px"
        bg="#1A95D9"
        _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
        onClick={onOpen}
      >
        <Box fontSize="30px">
          <FontAwesomeIcon
            icon={faPlus}
            _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
          />
        </Box>
      </Button>
      <TweetModal isOpen={isOpen} onClose={onClose} />
      <Box bg="gray.700" h="10px" />
    </Box>
  );
};

export default InputTweet;
