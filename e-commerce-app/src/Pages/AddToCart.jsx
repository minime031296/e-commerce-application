import React, { useContext } from 'react';
import { Container, Navbar, Nav, Dropdown, Badge, Button } from 'react-bootstrap';
import { FaOpencart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartContext } from './cart_context';
import { Box } from '@chakra-ui/react';
import Transection from './Transection';

const AddToCart = () => {
    const { cartState, cartDispatch } = useContext(CartContext);
    console.log('CartContext value:', cartState);

    const cartItemsCount = cartState.length;

    const handleRemove = (productId) => {
        cartDispatch({type: "REMOVE_FROM_CART", payload: {id: productId}})
    }

    const handlePayment = () => {
        return (
            <Transection/>
        )
    }

    console.log(cartState);
    return (
        <Box>
            <Navbar>
                <Container>
                    <Navbar.Brand>
                        <Link to="/shoppingcart" w="100" fontSize='100' >Shopping Cart</Link>
                    </Navbar.Brand>
                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle>
                                <FaOpencart />
                                <Badge>{cartItemsCount}</Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {cartItemsCount === 0 ? (
                                    <span>Cart is Empty!</span>
                                ) : (
                                    cartState.map((pro, i) => (
                                        <Dropdown.Item key={i} ml='10'>
                                            <p>{pro.title}</p>
                                            <img src={pro.images[0]} alt={pro.title} style={{ width: '70px' }} />
                                            <p>Price: {pro.price}</p>
                                            <Button onClick={() => handleRemove(pro.id)}>Remove </Button>
                                        </Dropdown.Item>
                                    ))
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px', border: '1px solid #ddd' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Qty</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartState.map((pro, i) => (
                        <tr key={i}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pro.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pro.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}><img src={pro.images[0]} alt={pro.title} style={{ width: '100px' }} /></td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pro.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td> 
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}><Button onClick={() => handleRemove(pro.id)}>Remove</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {cartState.length > 0 && (
                <div>
                    <h1>TotalPrice: {
                        cartState.reduce((total, product) => total + product.price, 0)
                    }</h1>
                    <Button onClick={handlePayment}>Payment</Button>
                </div>
            )}
        </Box>
    );
};

export default AddToCart;
