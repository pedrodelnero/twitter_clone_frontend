import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import ExplorePage from './ExplorePage/ExplorePage';
import ProfilePage from './ProfilePage/ProfilePage';

const Main = () => {
  const { handle } = useParams();

  return (
    <Box bgColor="black" h="100%">
      <Flex
        flexDirection="row"
        // flexDirection={['column', 'row']}
        h="100%"
        w="100%"
        // border="3px dashed cyan"
      >
        <Menu />
        {handle === 'home' && <HomePage />}
        {handle === 'explore' && <ExplorePage />}
        {handle !== 'explore' && handle !== 'home' && <ProfilePage />}
      </Flex>
    </Box>
  );
};

export default Main;
