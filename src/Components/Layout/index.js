import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Menu from '../Menu/Menu';

const Layout = ({ children }) => {
  return (
    <Box bgColor="black" h="100%">
      <Flex flexDirection="row" h="100%" w="100%">
        <Menu />
        {children}
      </Flex>
    </Box>
  );
};

export default Layout;
