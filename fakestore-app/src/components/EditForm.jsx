import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [productId, setProductId] = useState(id || "");
  const [product, setProduct] = useState({ title: "", price: "", description: "", category: "", image: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchProduct = (productId) => {
    if (productId) {
      setLoading(true);
      setError(null); // Clear previous error before attempting to fetch new product

      axios.get(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
          if (response.data) {
            setProduct(response.data);
          } else {
            setError("Product not found. Please enter a valid ID.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Product not found. Please enter a valid ID.");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  const handleIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    fetchProduct(productId);
    navigate(`/edit-product/${productId}`);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    axios.put(`https://fakestoreapi.com/products/${productId}`, product)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Container>
      <h1>Edit Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product updated successfully!</Alert>}

      <Form className="mb-3" onSubmit={handleIdSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Enter Product ID</Form.Label>
          <Form.Control type="text" placeholder="#Id" value={productId} onChange={handleIdChange} required />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">Load Product</Button>
      </Form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" name="title" value={product.title} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Price" name="price" value={product.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Description" name="description" value={product.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" placeholder="Enter Category" name="category" value={product.category} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="productImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter Image URL" name="image" value={product.image} onChange={handleChange} required />
          </Form.Group>
          {product.image && <img src={product.image} alt="Product" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}
          <Button variant="primary" type="submit" className="mt-3">Update Product</Button>
        </Form>
      )}
    </Container>
  );
};

export default EditProduct;