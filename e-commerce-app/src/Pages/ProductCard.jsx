import React, { useContext } from 'react';
import { Box, Button, Image, Text, Flex, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cart_context';
import Filter from './Filter';

const ProductCard = ({ id, title, description, price, images }) => {
    const navigate = useNavigate();
    const { cartDispatch } = useContext(CartContext);

    const addToCart = () => {
        cartDispatch({
            type: "ADD_TO_CART",
            payload: { id, title, description, price, images }
        });
    };

    return (
     
        <Box w='300' m='0 auto' mb='20'>
        
        <Flex key={id}  w='300' maxWidth="300px" margin="0 auto" marginBottom="20px" border='none'>
            <Flex flex="2" flexDirection="column" justifyContent="space-between">
                
                <Image src={images[0]} alt={title} w="200" h="200" />
                    <Box padding="10px" flex="1" border='none'>
                        <Text fontSize="lg" textAlign='center' >{title}</Text>
                        <Text fontSize="sm" fontWeight="bold">PRICE: INR:{price}</Text>
                        <Text fontSize='sm'>{description}</Text>
                </Box>
                <Flex justifyContent="space-between" padding="10px">
                    <Button onClick={() => navigate(`/products/${id}`)} colorScheme="teal" size="sm">View Details</Button>
                    <Button onClick={addToCart} colorScheme="blue" size="sm">Add to Cart</Button>
                </Flex>
                <Flex flexDirection='column'>
                   <Filter/> 
                </Flex>
                
            </Flex>   
        </Flex>

       </Box>
    );
};

export default ProductCard;
