import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons/';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons/';

import { TOGGLE_LIKE } from '../../../Graphql/Mutations';

const authToken = Cookies.get('auth');

const LikeSection = ({ postId, likes, queryToFetch }) => {
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: queryToFetch }],
  });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes?.some((el) => el.user.id === authToken)) setLiked(true);
  }, [likes]);

  const handleLike = async () => {
    const data = await toggleLike({ variables: { postId } });
    setLiked((prev) => !prev);

    console.log(data);
  };

  return (
    <Box mt="3">
      <Button
        onClick={handleLike}
        variant="unstyled"
        color="white"
        leftIcon={
          <FontAwesomeIcon
            icon={liked ? solidHeart : heart}
            style={{ color: liked ? 'red' : 'white' }}
          />
        }
      >
        {likes?.length}
      </Button>
    </Box>
  );
};

export default LikeSection;
