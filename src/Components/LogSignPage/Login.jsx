import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Store/ActionCreators/UserAction";


const Login = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    let UserStateData = useSelector((state) => state.UserStateData)

    const submitHandler = async () => {
        if (!email || !password) { // agar blank hai toh error de dega
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        // Check if the entered email and password match any user in the UserStateData
        const matchedUser = UserStateData.find(user => user.email === email && user.password === password);

        if (!matchedUser) {
            // If no user matched, show error message
            toast({
                title: "Wrong Credentials",
                description: "The provided email or password is incorrect.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        localStorage.setItem('userId', matchedUser.id);

        toast({
            title: "Success",
            description: "Login Successfully",
            position: 'top',
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Perform login logic here, for example, dispatch an action to authenticate the user

        // Assuming the login is successful, navigate to '/bill'
        Navigate('/bill');
    };


    async function getAPIData() {
        dispatch(getUser());
    }

    useEffect(() => {
        getAPIData();
    }, []);

    useEffect(() => {
        setData(UserStateData);
        // console.log(UserStateData);
    }, [UserStateData]);

    return (
        <VStack spacing="10px">
            <FormControl id="email" border={"black"} isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />

            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>

        </VStack>
    );
};

export default Login;
