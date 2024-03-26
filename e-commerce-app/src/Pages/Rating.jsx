import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating, onClick }) => {
  return (
    <Flex flexDirection='row'>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)}>
          {rating > i ? <AiFillStar style={{display: "flex", flexDirection: "row"}}/> : <AiOutlineStar />}
        </span>
      ))}
    </Flex>
  );
};

export default Rating;
