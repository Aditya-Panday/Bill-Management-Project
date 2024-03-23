import React, { useEffect, useState } from "react";
import { Input, Button, VStack, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addBills, getBills } from '../../Store/ActionCreators/BillsActionCreator'
import Navbar from "../Navbar";



export default function BillGenerate() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [products, setProducts] = useState([{ pname: '', quantity: '', price: '' }]);
    let navigate = useNavigate()
    const toast = useToast()
    let BillsStateData = useSelector((state) => state.BillsStateData)
    let dispatch = useDispatch()


    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...products];
        list[index][name] = value;
        setProducts(list);
    };

    const handleAddProduct = () => {
        setProducts([...products, { pname: '', quantity: '', price: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !number || !address || !date || products.some(product => !product.pname || !product.quantity || !product.price)) {
            // Display toast error message for incomplete fields
            toast({
                title: "Error",
                description: "Please fill in all fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        } else if (number.length !== 10) {
            // Display toast error message for invalid mobile number length
            toast({
                title: "Error",
                description: "Mobile number should be 10 digits long",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const userid = localStorage.getItem("userId");

        try {
            let item = {
                name: name,
                number: number,
                address: address,
                date: date,
                products: products,
                userid: userid
            };

            // Attempt to add the bill record
            const addedRecord = await dispatch(addBills({ ...item }));
            // console.log(addedRecord)

            // Check if the record was successfully added
            if (addedRecord) {
                // Display success message after successful dispatch
                toast({
                    title: "Success",
                    description: "Bill generated successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                navigate('/customer-list');
            } else {
                // Display error message if dispatch fails
                toast({
                    title: "Error",
                    description: "Failed to generate bill. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            // Display error message if any other error occurs
            console.error('Error generating bill:', error);
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
        dispatch(getBills())

    }


    useEffect(() => {
        getBills()
    }, [BillsStateData.length])



    return (
        <div className="container-fluid p-0">
            <div className="container-fluid p-0">

                <Navbar />
            </div>

            <div className='container p-3  my-4' >

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <Input placeholder="Customer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            focusBorderColor='lime'
                            name="name"
                            _placeholder={{ color: "black" }}
                        />
                        <Input placeholder="Customer Mobile Number"
                            focusBorderColor='lime'
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            name="number"
                            _placeholder={{ color: "black" }}
                        />
                        <Input placeholder="Customer Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            focusBorderColor='lime'
                            _placeholder={{ color: "black" }}
                        />
                        <Input
                            type="date"
                            placeholder="Billing Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            name="date"
                            focusBorderColor='lime'
                        />
                        {products.map((product, index) => (
                            <HStack key={index} spacing={4} align="stretch">
                                <Input
                                    name="pname"
                                    value={product.pname}
                                    onChange={(e) => handleChange(index, e)}
                                    focusBorderColor='lime'
                                    placeholder="Product Name"
                                    _placeholder={{ color: "black" }}

                                />
                                <Input
                                    name="quantity"
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleChange(index, e)}
                                    focusBorderColor='lime'
                                    placeholder="Quantity"
                                    _placeholder={{ color: "black" }}

                                />
                                <Input
                                    name="price"
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => handleChange(index, e)}
                                    focusBorderColor='lime'
                                    placeholder=" Price"
                                    _placeholder={{ color: "black" }}

                                />
                                <Text >Total Price: {product.quantity * product.price}</Text>
                            </HStack>

                        ))}
                        <Button onClick={handleAddProduct} colorScheme='teal' >
                            Add Product
                        </Button>
                        <Button type="submit" colorScheme='teal'>Submit</Button>
                    </VStack>
                </form>
            </div>
            <div style={{ height: "50px" }}></div>

        </div>
    );
}

