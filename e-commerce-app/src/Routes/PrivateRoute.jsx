import React, { useContext } from 'react'
import { AuthContext } from '../AuthContextProvider/AuthContext'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {

    const {authContext} = useContext(AuthContext)

  return (
    <div>
      {authContext.isAuth ? children : <Navigate to='/login'/>}
    </div>
  )
}

export default PrivateRoute
