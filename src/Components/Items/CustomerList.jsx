import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBills } from '../../Store/ActionCreators/BillsActionCreator';
import Navbar from '../Navbar';

export default function CustomerList() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const BillsStateData = useSelector((state) => state.BillsStateData);
  const [selectedItem, setSelectedItem] = useState({});
  const userId = localStorage.getItem("userId");

  async function getAPIData() {
    dispatch(getBills());
  }

  useEffect(() => {
    getAPIData();
  }, []);

  useEffect(() => {
    setData(BillsStateData.filter(item => item.userid === userId));
  }, [BillsStateData, userId]);

  const openModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <div className="container-fluid p-0">
      <div className="container-fluid p-0">
        <Navbar />
      </div>
      <div className='container p-3 my-4'>
        <h2 className='mb-4 cl' >Customer List</h2>
        <TableContainer className='my-3'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th style={{ color: "black" }}>Customer Name</Th>
                <Th style={{ color: "black" }}>Invoice Date</Th>
                <Th isNumeric style={{ color: "black" }}>Check</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.date}</Td>
                  <Td isNumeric>
                    <Button colorScheme='blue' onClick={() => openModal(item)}>Print</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>SurePass Invoicing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Number:</strong> {selectedItem.number}</p>
              <p><strong>Address:</strong> {selectedItem.address}</p>
              <p><strong>Date:</strong> {selectedItem.date}</p>
              <p><strong>Products:</strong></p>
              <ul>
                {selectedItem.products && selectedItem.products.map((product, index) => (
                  <li key={index}>
                    <p><strong>Product Name:</strong> {product.pname}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> {product.price}</p>
                    <p><strong>Total Price:</strong> {product.quantity * product.price}</p>
                  </li>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="green" mr={1} >
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div style={{ height: "50px" }}></div>
    </div >
  );
}
