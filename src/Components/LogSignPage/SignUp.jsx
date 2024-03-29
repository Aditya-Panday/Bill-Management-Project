import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUser } from "../../Store/ActionCreators/UserAction";

const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [registeredEmails, setRegisteredEmails] = useState([]);

    const dispatch = useDispatch();
    const UserStateData = useSelector((state) => state.UserStateData);

    useEffect(() => {
        getUser();
        // Update the list of registered emails
        const emails = UserStateData.map(user => user.email);
        setRegisteredEmails(emails);
    }, [UserStateData.length]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (registeredEmails.includes(email)) {
            toast({
                title: "Email Already Registered",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const item = {
                username: username,
                email: email,
                password: password,
            };
            await dispatch(addUser(item));


            toast({
                title: "Success",
                description: "Successfully Account Created",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error generating User:', error);
            toast({
                title: "Error",
                description: "Failed to generate User. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" border={"black"} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" border={"black"} isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
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
                        value={confirmpassword}
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
