import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios";


const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            console.log(response.data)
            setProducts(response.data)
            setLoading(false);
        })
        .catch((error) => {
            setError(`Failed to fetch products: ${error.message}`);
            setLoading(false);
        })
    }, [])

    if(loading) return <p>Loading Products...</p>
    if(error) return <p>{error}</p>

    return (
        <Container>
            <h1>Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className='mb-3'>
                        <Card>
                            <Card.Img variant='top' width={300} height={350} src={product.image} alt={product.title} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                            </Card.Body>
                            <Link className="custom-button" to={`/products/${product.id}`}>View Details</Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
    export default ProductListing
