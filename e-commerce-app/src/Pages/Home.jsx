import React, { useEffect, useReducer, useState } from 'react';
import { Box, Flex, Text, Select, Input, Button, IconButton, Img } from '@chakra-ui/react';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

// Reducer to manage product state
const productReducer = (prevState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
      return { ...prevState, loading: true, error: false };
    case 'ERROR':
      return { ...prevState, error: true, loading: false };
    case 'SUCCESS':
      return { ...prevState, error: false, loading: false, data: payload };
    default:
      return prevState;
  }
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "smartphones, laptops...");
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: [] 
  });

  // Fetch the products
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get('https://mocktodoserver.onrender.com/products', {
        params: { category } 
      });
      console.log(data);
      dispatch({ type: "SUCCESS", payload: data }); 
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };


  useEffect(() => {
    fetchData();
  }, [category]);

  const { loading, error, data } = state; // Destructure state

  const handleSearchInput = (event) => {
    setCategory(event.target.value); 
  };

  const handleSearchbtn = () => {
    setSearchParams({ category });
    fetchData();
  };

  return (
    <Box mt={4} mx='auto' maxW='container.xl' p={4}>
      {/* Search Input */}
      <Flex align="center" justify="center" direction="column" mb={4}>
        <Text fontSize="2xl" mb={4} color="teal.600">Search For Products</Text>
        <Flex width="100%" maxW="lg" align="center">
          <IconButton icon={<FcSearch />} aria-label="Search icon" bg="transparent" mr={2} size="lg" />
          <Input
            w='400px'
            mr='10px'
            placeholder="Search product..."
            value={category}
            onChange={handleSearchInput}
            size="lg"
            borderColor="teal.300"
          />
          <Button colorScheme="teal" onClick={handleSearchbtn} size="lg" boxShadow="lg">Search</Button>
        </Flex>
      </Flex>

      {/* loading */}
      {loading && <Loading />}

      {/* error */}
      {error && <Error />}

      {/* Displaying Fetched Products */}
      <Box>
        {data.length > 0 ? (
          <Flex direction="column" align="center" justify="center" mt={8}>
            {data.map((product) => (
              <Box key={product.id} border="1px solid teal" borderRadius="lg" p={4} mb={4} w="100%" maxW="md" boxShadow="lg">
                <Text fontSize="xl" color="teal.700">{product.title}</Text>
                <Text fontSize="md" color="gray.600">{product.description}</Text>
                <Text fontSize="lg" color="teal.800">${product.price}</Text>
                <Img fontSize="lg" color="teal.800" src={product.images[0]} alt={product.title} boxSize="250px" objectFit="cover" 
                  fallbackSrc="https://via.placeholder.com/250" />

              </Box>
            ))}
          </Flex>
        ) : (
          <Text fontSize="lg" color="gray.500" textAlign="center">No products found.</Text>
        )}
      </Box>
    </Box>
  );
};

export default Home;
