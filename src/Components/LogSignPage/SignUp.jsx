import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUser, getUser } from "../../Store/ActionCreators/UserAction";


const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();

    //   all data states
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    let dispatch = useDispatch()
    let UserStateData = useSelector((state) => state.UserStateData)


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmpassword) { //agar blank hai toh error de dega
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {     //password validation
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            let item = {
                username: username,
                email: email,
                password: password,
            }
            await dispatch(addUser({ ...item }));
            // Display success message after successful dispatch
            toast({
                title: "Success",
                description: "SignUP Successfully Please Login",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            // Display error message if dispatch fails
            toast({
                title: "Error",
                description: "Failed to generate bill. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    function getApiData() {
        dispatch(getUser())

    }


    useEffect(() => {
        getUser()
    }, [UserStateData.length])









    return (
        <VStack spacing="5px">
            <FormControl id="first-name" border={"black"} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" border={"black"} isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
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
                Sign Up
            </Button>
        </VStack>
    );
};

export default Signup;
