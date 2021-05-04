import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons/';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons/';

import { CREATE_LIKE, DELETE_LIKE } from '../../../../../Graphql/Mutations';

const authToken = Cookies.get('auth');

const LikeSection = ({ postId, likes }) => {
  // console.log('LIKE SEC', postId, likes);
  const [createLike] = useMutation(CREATE_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likes?.some((el) => el.user.id === authToken)) setLiked(true);
  }, [likes]);

  const addLike = () => {
    createLike({ variables: { postId } });
    setLiked(true);
  };

  const removeLike = () => {
    deleteLike({ variables: { postId } });
    setLiked(false);
  };

  return (
    <Box mt="3">
      {!liked ? (
        <Button
          onClick={addLike}
          variant="unstyled"
          color="white"
          leftIcon={<FontAwesomeIcon icon={heart} style={{ color: 'white' }} />}
        >
          {likes?.length}
        </Button>
      ) : (
        <Button
          onClick={removeLike}
          variant="unstyled"
          color="red"
          leftIcon={
            <FontAwesomeIcon icon={solidHeart} style={{ color: 'red' }} />
          }
        >
          {likes?.length}
        </Button>
      )}
    </Box>
  );
};

export default LikeSection;
