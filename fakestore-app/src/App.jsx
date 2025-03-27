import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import ProductDetails from "./components/ProductDetails";
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import EditForm from './components/EditForm';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {

  return (
    <>
    	
      <Router>
      <NavBar />
        <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/delete-product" element={<DeleteProduct/>} />
        <Route path="/edit-form" element={<EditForm />} />
        <Route path="/edit-product/:id" element={<EditForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;