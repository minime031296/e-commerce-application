import React, { useEffect, useReducer, useState } from 'react';
import { Box, Input, Button, Flex, Text } from '@chakra-ui/react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { RiBearSmileFill } from "react-icons/ri";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import Loading from '../Component/Loading';
import Error from '../Component/Error';

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
  const [category, setCategory] = useState("");
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: []
  });

  useEffect(() => {
    setSearchParams((prevQuery) => {
      const newSearchParams = new URLSearchParams(prevQuery)
      newSearchParams.set("category", category)
      return newSearchParams
    })
    fetchData();
  }, [category]);

  const fetchData = async () => {
    console.log(category)
    dispatch({ type: "LOADING" });
    try {
      let { data } = await axios({
        baseURL: "http://localhost:3000/",
        url: '/products',
        method: "GET",
        params: {
          category: category
        }
      })
      dispatch({ type: "SUCCESS", payload: data })
    } catch (error) {
      dispatch({ type: "ERROR" })
    }
  }

  const { loading, error, data } = state;

  useEffect(() => {
    if (loading) {
      
      fetchData();
    }
  }, [loading]);

  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [search, setSearch] = useState(searchParams.get("category") || "all");
  const navigate = useNavigate();

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchbtn = () => {
    navigate(`/products?category=${search}`);
  };

  return (
    <Box mt='100px' ml='300px' mr='300px' mb='200px'>
      <Flex mt='100px'>
        <Text>Search For The Product</Text>
        <FcSearch style={{ marginRight: "-13px", marginTop: '20px' }} />
        <Input w='500px' mr='10px' placeholder="Search product..." value={search} onChange={handleSearchInput} />
        <select
          name=""
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home-Decoration</option>
        </select>
        <Button style={{ cursor: 'pointer' }} onClick={handleSearchbtn}>Search</Button>
      </Flex>
      {loading && <Loading />} 
      {error && <Error />} 
      <Box border='1px solid red' w='25' >
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={6000}
        >
          <div>
            <img src="https://cdn.dummyjson.com/product-images/1/1.jpg" alt="1" style={{ width: "cover" }} />
          </div>
          <div>
            <img src="https://cdn.dummyjson.com/product-images/5/1.jpg" alt="2" />
          </div>
          <div>
            <img src="https://cdn.dummyjson.com/product-images/22/1.jpg" alt="3" />
          </div>
          <div>
            <img src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" alt="Thumbnail" />
          </div>
        </AutoplaySlider>
      </Box>
      <Flex align="center" fontSize="2xl" fontWeight="bold" fontStyle="italic" textAlign="center" color="teal.500" mt='100'>
        <RiBearSmileFill style={{ marginRight: '10px' }} />
        "Delivering your happiness to your DoorSteps"
      </Flex>
    </Box>
  );
};

export default Home;

