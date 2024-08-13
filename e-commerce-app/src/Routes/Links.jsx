import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


const Links = () => {
  return (
    <Box>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/products'>Products</Link>
      <Link to='/shoppingcart'></Link>
    </Box>
  )
}

export default Links
