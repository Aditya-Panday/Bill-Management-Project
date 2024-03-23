import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Components/Pages/HomePage'
import CustomerList from './Components/Items/CustomerList'
import BillGenerate from './Components/Items/BillGenerate'



export default function App() {
    return (

        <div className='App '>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/bill" element={<BillGenerate />} />
                    <Route path="/customer-List" element={<CustomerList />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
