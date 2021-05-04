import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/';

import { CREATE_USER } from '../../Graphql/Mutations';
import { GET_ALL_USERS } from '../../Graphql/Queries';
import frontPageImage from '../../images/twitter_front_page.png';

const SignUpPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [createUser] = useMutation(CREATE_USER, {
    // Then re-run
    refetchQueries: [{ query: GET_ALL_USERS }],
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await createUser({
      variables: { name, handle, password, confirmPassword },
    });
    window.location.href = 'home';
  };
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
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bgColor="black">
          <ModalHeader>
            <Flex>
              <Spacer />
              <Box>
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: 'white', fontSize: '30px' }}
                />
              </Box>
              <Spacer />
            </Flex>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleCreateUser}>
              <Stack spacing="6">
                <Text fontSize="large" color="white">
                  Create an account
                </Text>
                <Input
                  color="white"
                  size="lg"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  color="white"
                  size="lg"
                  placeholder="Handle"
                  onChange={(e) => setHandle(e.target.value)}
                />
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    color="white"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bgColor="#1C92DA"
                      onClick={togglePassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup size="lg">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    color="white"
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      bgColor="#1C92DA"
                      onClick={toggleConfirmPassword}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="#1C92DA"
              color="white"
              borderRadius="20px"
              m="0"
              type="submit"
            >
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpPage;
