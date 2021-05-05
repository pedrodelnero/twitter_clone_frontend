import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/';

import { CREATE_USER } from '../../Graphql/Mutations';

const SignUpModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { data } = await createUser({
      variables: {
        name: name,
        handle: handle,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
    console.log('create handle', data);
    if (!data.createUser.success) {
      console.log('create handle | fail', data.createUser.message);
      setError(data.createUser.message);
    } else {
      console.log('create handle | success', data.createUser.message);
      window.location.href = '/home';
    }
  };

  useEffect(() => {
    setError('');
  }, [name, handle, password, confirmPassword]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <form onSubmit={handleCreateUser}>
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
            {!!error.length && (
              <Box borderRadius="10px" bgColor="red" padding={3} mb={4}>
                <Text fontSize="xl" color="white">
                  {error}
                </Text>
              </Box>
            )}
          </ModalHeader>
          <ModalBody>
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
                    type="submit"
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
      </form>
    </Modal>
  );
};

export default SignUpModal;
