import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from '../LogSignPage/Login';
import Signup from '../LogSignPage/SignUp';


export default function HomePage() {
    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="20px"
                borderWidth="1px"
            >
                <Text fontSize="3xl"  fontFamily="cursive">
                    SurePass Invoicing App
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab>Login</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>

    )
}
