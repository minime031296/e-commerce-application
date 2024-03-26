import React, { createContext, useState } from 'react'


export const  AuthContext = createContext()

const AuthContextProvider = ({children}) => {

   const [authContext, setAuthContext] = useState({isAuth: false, token: ''})

    const login = (token) => {
        setAuthContext({...authContext, isAuth: true, token: token})
    }

    const logout = () => {
        setAuthContext({...authContext, isAuth: false, token: null})
    }


  return (
    <AuthContext.Provider value = {{authContext, login, logout}}>
        {children}
      
    </AuthContext.Provider>
  )
}

export default AuthContextProvider