import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/';

import MenuItems from './MenuItems';

const Menu = () => (
  <Box w={['100%', '10%', '30%']} display={['none', 'block']}>
    <Box pl={[null, 0, '20%', '30%']}>
      <Flex
        flexDir="column"
        w="100%"
        h={['10%', '100%']}
        align={['center', 'center', 'flex-start']}
      >
        <Box
          fontSize={['30px', '30px', '40px']}
          my={[null, 2, 4, 4]}
          ml={[0, 0, '15px', '15px']}
        >
          <FontAwesomeIcon icon={faTwitter} style={{ color: 'white' }} />
        </Box>
        <MenuItems />
      </Flex>
    </Box>
  </Box>
);

export default Menu;
