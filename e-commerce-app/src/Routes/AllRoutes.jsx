import React from 'react'
import Products from '../Pages/Products'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ProductsPage from '../Pages/ProductCard'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ProductDetail from '../Pages/ProductDetail'
import AddToCart from '../Pages/AddToCart'
import UserInfo from '../Pages/UserInfo'


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
             <Home/>
          </PrivateRoute>
       
        }/>

        <Route path='/login' element={<Login/>}/>

        <Route path='/products' element={
          <PrivateRoute>
             <Products/>
          </PrivateRoute>
       
        }/>

        <Route path="/products/:product_id" element={
        <PrivateRoute>
           <ProductDetail />
        </PrivateRoute>
       
        } />

      <Route path="/shoppingcart" element={
        <PrivateRoute>
           <AddToCart/>
        </PrivateRoute>
       
        } />

<Route path="/userinfo" element={
        <PrivateRoute>
           <UserInfo/>
        </PrivateRoute>
       
        } />
        
        
      </Routes>
    </div>
  )
}

export default AllRoutes
