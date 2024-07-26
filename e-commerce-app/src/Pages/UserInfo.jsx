import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Box, Text } from '@chakra-ui/react';
import { AuthContext } from '../AuthContextProvider/AuthContext';
import axios from 'axios';


const userReducer = (prevState, { type, payload }) => {
    switch (type) {
        case "LOADING":
            return { ...prevState, loading: true, error: false };
        case "ERROR":
            return { ...prevState, loading: false, error: true };
        case "SUCCESS":
            return { ...prevState, loading: false, error: false, data: payload };
        default:
            return prevState;
    }
};

const UserInfo = () => {

    

    const { logout } = useContext(AuthContext);
    const [userState, userDispatch] = useReducer(userReducer, {
        loading: false,
        error: false,
        data: []
    });

    const fetchUserData = async () => {
        userDispatch({ type: "LOADING" });
        try {
            const { data } = await axios.get("https://reqres.in/api/login");
            userDispatch({ type: "SUCCESS", payload: data });
        } catch (error) {
            userDispatch({ type: "ERROR" });
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <Box>
            {userState.loading && <p>Loading...</p>}
            {userState.error && <p>Error occurred while fetching user data.</p>}
            {userState.data.map((user, ind) => (
                <Dropdown key={ind}>
                    <Text>{user.username}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.location}</Text>
                    <Button onClick={() => logout()}>Logout</Button>
                </Dropdown>
            ))}
        </Box>
    );
};

export default UserInfo;
