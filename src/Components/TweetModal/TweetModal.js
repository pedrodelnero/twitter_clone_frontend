import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { CREATE_POST } from '../../Graphql/Mutations';
import { GET_POSTS } from '../../Graphql/Queries';

const MenuItems = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState('');
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const handleCreatePost = async () => {
    await createPost({
      variables: { text: postText },
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={['sm', 'xl', 'xl', 'xl']}
    >
      <ModalOverlay bg="#1C92DA44" />
      <ModalContent
        h="300px"
        color="white"
        bg="black"
        borderRadius="20px"
        mx="10px"
      >
        <ModalHeader>
          <ModalCloseButton
            color="#1C92DA"
            size="1em"
            pos="relative"
            ml="3"
            mb="2"
          />
        </ModalHeader>
        <ModalBody>
          <Box h="100%">
            <Input
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's hapenning..."
              color="white"
              variant="unstyled"
              p="3"
              h="100%"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="sans-serif"
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box alignSelf="flex-end">
            <Button
              color="white"
              colorScheme="twitter"
              borderRadius="30px"
              size="lg"
              onClick={handleCreatePost}
            >
              Tweet
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MenuItems;
