import { Box , Badge, Flex} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaOpencart } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";


const Navbar = () => {
  return (
    <Flex justifyContent='space-evenly' box-shadow='rgb(38, 57, 77) 0px 20px 30px -10px' fontStyle='italic'>
      <Link to='/'>HOME</Link>
      <Link to='/login'>LOGIN</Link>
      <Link to='/products'>PRODUCTS</Link>
      <Link to='/userinfo'><BiSolidUserCircle /></Link>
      <Link to='/shoppingcart'><FaOpencart /></Link>
    </Flex>
  )
}

export default Navbar

