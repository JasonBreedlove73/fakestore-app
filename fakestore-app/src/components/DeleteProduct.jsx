
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function DeleteProduct() {
  
  const [productId, setProductId] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  
  const handleDelete = async () => {
    try {
           await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      
    
      setSuccessMessage(`Product with ID: ${productId} has been deleted successfully.`);
      
      setProductId('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting product:', error);
      
     
      setErrorMessage('Failed to delete product. Please check the ID and try again.');
      
      setSuccessMessage('');
    }
  };

 
  return (
    <div className="delete-product-form">
      
      <h1>Delete a Product</h1>

      
      {successMessage && <p className="success-message">{successMessage}</p>}

     
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    
      <input className="input"
        type="text"                   
        value={productId}              
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID" 
        required                      
      />
         <Button onClick={handleDelete} variant="danger" type="submit">Delete Product</Button>
           
    </div>
  );
}

export default DeleteProduct;