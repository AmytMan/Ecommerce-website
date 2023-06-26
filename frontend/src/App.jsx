import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';
import { useGetProductsQuery } from './features/productApi';
import { useGetCategoriesQuery } from './features/categoryApi';
function App() {
   useGetProductsQuery();
  useGetCategoriesQuery()
  return (
    <>
        <Header/>
    <Container className='my-5 py-3'>
    <ToastContainer />
      <Outlet/>
    </Container>
    <Footer/>
    </>
  )
}

export default App
