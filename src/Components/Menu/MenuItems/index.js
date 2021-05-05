import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faHashtag,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons/';

import TweetModal from '../../TweetModal/TweetModal';
import { GET_USER_BY_ID } from '../../../Graphql/Queries';

const MenuItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(GET_USER_BY_ID);

  // console.log('MENU -----', data);

  return (
    <>
      <Flex
        flexDir="column"
        width="100%"
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
        <Box my="5">
          <Link to="/home">
            <Button
              color="white"
              variant="ghost"
              borderRadius="30px"
              _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
            >
              <Box fontSize="30px" mr={[0, 0, 0, 3]}>
                <FontAwesomeIcon
                  icon={faHome}
                  _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
                />
              </Box>
              <Box display={['none', 'none', 'none', 'inline-block']}>
                <Text fontSize="3xl">Home</Text>
              </Box>
            </Button>
          </Link>
        </Box>
        <Box mb="5">
          <Link to="/explore">
            <Button
              color="white"
              variant="ghost"
              borderRadius="30px"
              _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
            >
              <Box fontSize="30px" mr={[0, 0, 3, 3]}>
                <FontAwesomeIcon icon={faHashtag} />
              </Box>
              <Box display={['none', 'none', 'none', 'inline-block']}>
                <Text fontSize="3xl">Explore</Text>
              </Box>
            </Button>
          </Link>
        </Box>
        {data?.getOneUser.success && (
          <Box mb="5">
            <Link to={`/${data?.getOneUser.user.handle}`}>
              <Button
                color="white"
                variant="ghost"
                borderRadius="30px"
                _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
              >
                <Box fontSize="30px" mr={[0, 0, 3, 3]}>
                  <FontAwesomeIcon icon={faUser} />
                </Box>
                <Box display={['none', 'none', 'none', 'inline-block']}>
                  <Text fontSize="3xl">Profile</Text>
                </Box>
              </Button>
            </Link>
          </Box>
        )}

        <Flex
          my="5"
          w="100%"
          h="50px"
          ml={[0, 0, 1, 3]}
          justifyContent={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Button
            color="white"
            size="md"
            variant="solid"
            borderRadius="40px"
            h="100%"
            w={['auto', 'auto', 'auto', '80%']}
            bg="#1A95D9"
            _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
            onClick={onOpen}
          >
            <Box fontSize="20px" display={['block', 'block', 'block', 'none']}>
              <FontAwesomeIcon
                icon={faPlus}
                _hover={{ color: '#1A95D9', bgColor: '#1A95D944' }}
              />
            </Box>
            <Box display={['none', 'none', 'none', 'inline-block']} w="100%">
              <Text fontSize="xl" fontWeight="bold">
                Tweet
              </Text>
            </Box>
          </Button>
        </Flex>
        <TweetModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

export default MenuItems;
