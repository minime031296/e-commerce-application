import React, { useContext, useReducer, useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import { AuthContext } from '../AuthContextProvider/AuthContext';
import { Navigate } from 'react-router-dom';

const initialState = {
    email: "",
    password: "",
    loading: false,
    error: false
};

const reducer = (prevState, { type, payload }) => {
    switch (type) {
        case "email":
            return { ...prevState, email: payload };
        case "password":
            return { ...prevState, password: payload };
        case "loading":
            return { ...prevState, loading: true };
        case "error":
            return { ...prevState, Error: true };
        case "reset":
            return { ...prevState, email: "", password: "" };
        case "success":
            return { ...prevState, error: false, loading: false };
        default:
            return ("Invalid");
    }
};

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { login } = useContext(AuthContext);
    const [navigate, setNavigate] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: name, payload: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                url:  "http://localhost:8080/users/",
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                data: { email: state.email, password: state.password }
            });
            dispatch({ type: "success" });
            dispatch({ type: "reset" });
            login(data.token);
            setNavigate(true);
        } catch (error) {
            dispatch({ type: "error" });
            dispatch({ type: "reset" });
            console.log(error);
        }
    };

    const { loading, error } = state;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    if (navigate) {
        return <Navigate to='/' />;
    }

    return (
        <Box maxWidth="400px" margin="auto" padding="20px"  mt='200'>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
                <Input
                    placeholder='Enter Email..'
                    name='email'
                    value={state.email}
                    onChange={handleChange}
                    marginBottom="10px"
                />
                <Input
                    type="password"
                    placeholder='Enter Password..'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                    marginBottom="10px"
                />
                <Button type='submit' colorScheme="blue">Login</Button>
            </form>
        </Box>
    );
};

export default Login;
 