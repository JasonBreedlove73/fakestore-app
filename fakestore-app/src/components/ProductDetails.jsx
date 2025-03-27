import {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
            console.log(response)
            setProduct(response.data)
            setLoading(false)
        })
        .catch((error) => {
            setError(`Failed to load product details.: ${error.message}`);
            setLoading(false)
        })
    },[id]);

    const addToCart = () => {
        console.log(`Added ${product.title} to cart`);
         alert('Product added successfully');
        
    };

    // Delete product from the API
    const deleteProduct = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
                alert('Product deleted successfully');
                // Redirect to products page or homepage after deletion
                window.location.href = '/products';
            })
            .catch((error) => {
                setError(`Failed to delete product: ${error.message}`);
            });
    };



    if(loading) return <p>Loading product details</p>
    if(error) return <p>{error}</p>


    return (
        <div>
        <h1>Product details</h1>
       
        <Container>
            <Card>
                <Card.Img variant="top" src={product.image} height={700} alt={product.title}/>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                </Card.Body>
            </Card>
            <Button variant="primary" onClick={addToCart} className="mt-3">Add to Cart</Button>
            <Button variant="danger" onClick={deleteProduct} className="mt-3 ml-2">Delete from Cart</Button>
            <Link to={"/products"}><Button className="mt-3" >Back to Products</Button></Link>
        </Container></div>
    )
}

export default ProductDetails;