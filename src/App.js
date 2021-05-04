import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ChakraProvider, Box } from '@chakra-ui/react';

import {
  SignUpPage,
  LoginPage,
  Main,
  PrivateRouter,
  PublicRouter,
} from './Components/';
import { IS_AUTH } from './Graphql/Queries';

const authToken = Cookies.get('auth');

function App() {
  const [auth, setAuth] = useState({
    handle: '',
    id: 0,
    status: false,
  });
  const { data } = useQuery(IS_AUTH, {
    skip: !authToken,
  });

  useEffect(() => {
    if (data?.isAuth.success) {
      setAuth({
        id: data.isAuth.user.id,
        status: true,
        handle: data.isAuth.user.handle,
      });
    }
  }, [data]);

  return (
    <ChakraProvider>
      <Router>
        <Box h="100vh" overflow="scroll">
          <Switch>
            <PublicRouter
              exact
              path="/login"
              component={LoginPage}
              authStatus={auth.status}
            />
            <PrivateRouter
              exact
              path="/:handle"
              component={Main}
              authStatus={auth.status}
            />
            <PublicRouter
              exact
              path="/"
              component={SignUpPage}
              authStatus={auth.status}
            />
          </Switch>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
