import { Box, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import ProductDetail from './ProductDetail'
import ProductCard from './ProductCard'



const productReducer = (prevState, {type, payload}) => {
    switch(type) {
        case 'LOADING':
            return {...prevState, loading: true, error:false}
        case 'ERROR':
            return {...prevState, error: true, loading: false}
        case 'SUCCESS':
            return {...prevState, error: false, loading: false, data: payload}
        default:
            return prevState
    }
}
const Products = () => {
    

    const [state, dispatch] = useReducer(productReducer, {
        loading: false,
        error: false,
        data : []
    })

    const fetchData = async () => {
        dispatch({type: "LOADING"})
        try {
            let {data} = await axios({
                baseURL: "http://localhost:3000/",
                url: '/products',
                method: "GET"
            })
            dispatch({type: "SUCCESS", payload: data})
            } catch (error) {
            dispatch({type: "ERROR"})
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])

    const {loading, error, data} = state;

    if(loading) {
        return <Loading/>
    }

    if(error) {
        return <Error/>
    }
  return (
    <Box>
        <SimpleGrid  templateColumns='repeat(3, 1fr)'>
       {data.map((el) => {
        return <ProductCard key={el.id} {...el}/>
       })}
       </SimpleGrid>
    </Box>
  )
}

export default Products
