import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



function HomePage() {

    return (
      <Container className="home">
        <Row>
          <Col>
            <h1>Welcome to my Fake Store App!</h1>
            <h4>This app will let you see products, prices, and a description of each product pulled from the fakestore api.</h4>
            <p> Please click the button below to view my list of products. Enjoy!!</p>
          </Col>
        </Row>
        <Row>
            <Col>
            <Button href="/products">Product Listing</Button>
            </Col>
        </Row>
        </Container>
         )};

    export default HomePage;