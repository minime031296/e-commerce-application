import { Box, Stack, Badge, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import { useParams } from 'react-router-dom';
import { CartContext } from './cart_context';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

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

const ProductDetail = () => {
    const { product_id } = useParams();
    const [state, dispatch] = useReducer(productReducer, {
        loading: false,
        error: false,
        data: {}
    });
    const { cartState, cartDispatch } = useContext(CartContext)
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "LOADING" });
            try {
                const response = await axios.get(`http://localhost:3000/products/${product_id}`);
                dispatch({ type: "SUCCESS", payload: response.data });
                setImages(response.data.images);
            } catch (error) {
                dispatch({ type: "ERROR" });
            }
        };

        fetchData();
    }, [product_id]);

    const { loading, error, data } = state;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    const handleAddtoCart = () => {
        cartDispatch({ type: "ADD_TO_CART", payload: data })
    }

    const handleRemovetoCart = () => {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: null })
    }

    const { price, description, title, rating, category, brand } = data;

    return (
        <Flex flexDirection='column' alignItems="center" justifyContent="center" padding="20px">
            <Grid templateColumns={['1fr', '1fr 1fr']} gap={4} alignItems="center" justifyContent="center">
                <GridItem>
                    <AutoplaySlider
                        play={true}
                        cancelOnInteraction={false} 
                        interval={6000}
                    >
                        {images.map((img, index) => (
                            <div key={index} data-src={img} />
                        ))}
                    </AutoplaySlider>
                </GridItem>
                <GridItem>
                    <Stack spacing={4}>
                        <Badge>Brand: {brand}</Badge>
                        <Badge>Category: {category}</Badge>
                        <Badge>Price: RS {price}</Badge>
                        <Badge>Description: {description}</Badge>
                        <Badge>Rating: {rating}</Badge>
                        <Button onClick={handleAddtoCart} colorScheme="teal">Add to Cart</Button>
                        <Button onClick={handleRemovetoCart} colorScheme="red">Remove from Cart</Button>
                    </Stack>
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default ProductDetail;
