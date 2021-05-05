import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { LOGIN_USER } from '../../Graphql/Mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/';
import { Layout } from '../../Components';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const { data } = await loginUser({
      variables: { handle: handle, password: password },
    });
    if (!data.loginUser.success) {
      console.log('login handle | fail', data.loginUser.message);
      setError(data.loginUser.message);
    } else {
      console.log('login handle | success', data.loginUser.message);
      window.location.href = 'home';
    }
  };
  useEffect(() => {
    setError('');
  }, [handle, password]);

  useEffect(() => {}, [error]);

  return (
    <Layout>
      <Box bgColor="black" height="100%">
        <Flex
          flexDirection="column"
          align="center"
          justify="center"
          height="100%"
        >
          <Box my="3" fontSize={50} color="white">
            <Link to="/">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
          </Box>
          <Box my="3">
            <Text fontSize="3xl" color="white" fontWeight="bold">
              Login
            </Text>
          </Box>
          {error.length && (
            <Box borderRadius="10px" bgColor="red" padding={3} mb={4}>
              <Text fontSize="xl" color="white">
                {error}
              </Text>
            </Box>
          )}
          <form onSubmit={handleLoginUser}>
            <InputGroup w="300px" flexDirection="column">
              <Input
                size="lg"
                color="white"
                placeholder="Handle"
                mb={4}
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
            </InputGroup>
            <Button
              my={3}
              color="white"
              size="lg"
              bgColor="#1C92DA"
              width="300px"
              borderRadius="25px"
              type="submit"
              // onClick={handleLoginUser}
            >
              Login
            </Button>
          </form>
          <HStack color="white" spacing={5}>
            <Link to="/" onClick={() => alert('Press ok.')}>
              Forgot Password
            </Link>
            <Link to="/">Sign up for Twitter</Link>
          </HStack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default LoginPage;
