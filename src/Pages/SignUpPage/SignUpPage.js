import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/';

import frontPageImage from '../../images/twitter_front_page.png';
import { SignUpModal } from '../../Components';

const SignUpPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex bgColor="black" direction={{ base: 'column-reverse', lg: 'row' }}>
        <Box width={{ base: '100%', lg: '60%' }}>
          <img src={frontPageImage} alt="Twitter pic" />
        </Box>

        <Stack
          m="30px"
          color="white"
          spacing="8"
          align={{ base: 'center', lg: 'start' }}
        >
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              **Not real Twitter site.**
            </Text>
          </Box>
          <Box marginY="3">
            <FontAwesomeIcon
              icon={faTwitter}
              style={{ color: 'white', fontSize: '50px' }}
            />
          </Box>
          <Box>
            <Text fontSize="6xl" fontWeight="bold">
              Happening now
            </Text>
          </Box>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              Join Twitter today.
            </Text>
          </Box>
          <Stack spacing="5">
            <Button
              size="lg"
              bgColor="#1C92DA"
              width="300px"
              borderRadius="25px"
              onClick={onOpen}
            >
              Sign Up
            </Button>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                color="#1C92DA"
                borderColor="#1C92DA"
                borderRadius="25px"
                width="300px"
              >
                Log in
              </Button>
            </Link>
          </Stack>
        </Stack>
        <SignUpModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

export default SignUpPage;
