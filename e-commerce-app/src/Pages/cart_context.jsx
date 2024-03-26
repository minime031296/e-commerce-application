import React, { createContext, useReducer } from 'react';
import { cartReducer } from './CartReducer'; 



export const CartContext = createContext(); 

const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider
