import React, { useEffect, useReducer, useState } from 'react';
import { Box, Input, Button, Flex, Text } from '@chakra-ui/react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css'; // Corrected import
import { RiBearSmileFill } from "react-icons/ri";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import styles from "../Pages/slider.module.css"; // Import the CSS module

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
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [state, dispatch] = useReducer(productReducer, {
    loading: false,
    error: false,
    data: []
  });

  useEffect(() => {
    setSearchParams(prev => {
      const newSearchParams = new URLSearchParams(prev);
      newSearchParams.set("category", category);
      return newSearchParams;
    });
    fetchData();
  }, [category, setSearchParams]);

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.get('https://mocktodoserver.onrender.com/products', {
        params: { category }
      });
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  const { loading, error } = state;
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
    <Box mt='100px' mx='auto' maxW='container.xl'>
      <Flex mt='100px' align="center">
        <Text>Search For The Product</Text>
        <FcSearch style={{ marginRight: "10px", marginTop: "20px" }} />
        <Input 
          w='500px' 
          mr='10px' 
          placeholder="Search product..." 
          value={search} 
          onChange={handleSearchInput} 
        />
        <select 
          id="category-select" 
          name="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
        </select>
        <Button style={{ cursor: 'pointer' }} onClick={handleSearchbtn}>Search</Button>
      </Flex>
      {loading && <Loading />} 
      {error && <Error />} 
      <Box border='1px solid red' w='full'>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={6000}
          animation="cubeAnimation" // Specify the animation
          className={styles.smallSlider} // Use the CSS module class
        >
          <div>
            <img src="https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner.jpg" alt="1" style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <img src="https://t4.ftcdn.net/jpg/03/83/21/85/360_F_383218557_t5fC98hOdrg0hr4BsulCZ9mPX9a4uube.jpg" alt="2" style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <img src="https://www.shutterstock.com/image-vector/sale-banner-template-design-260nw-487080769.jpg" alt="3" style={{ width: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-d-smartphone-with-gifts-and-discount-percentage-e-commerce-web-banner-image_3753281.jpg" alt="Thumbnail" style={{ width: "100%", objectFit: "cover" }} />
          </div>
        </AutoplaySlider>
      </Box>
      <Flex 
        align="center" 
        fontSize="2xl" 
        fontWeight="bold" 
        fontStyle="italic" 
        textAlign="center" 
        color="teal.500" 
        mt='100px'
      >
        <RiBearSmileFill style={{ marginRight: '10px' }} />
        "Delivering your happiness to your DoorSteps"
      </Flex>
    </Box>
  );
};

export default Home;
