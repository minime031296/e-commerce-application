import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './AuthContextProvider/AuthContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContextProvider from './Pages/cart_context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  
    <BrowserRouter>
        
      <AuthContextProvider>

      <CartContextProvider>
          
          <App />

      </CartContextProvider>
      
      </AuthContextProvider>
    
    </BrowserRouter>

  </ChakraProvider>
 
  
)
