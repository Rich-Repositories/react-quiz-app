import React from 'react';
import {Row, Col,Container,
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const Home = () => (
  <Container>
    <Row className="d-flex justify-content-center mt-3 ">
      <Col md={'8'} offset={'2'} className={'text-center'}>
        <Card className={'bg-light p-3'}>
          <CardTitle><h3>Jayway Quiz Test</h3></CardTitle>
          <CardSubtitle>Have fun!</CardSubtitle>
              <CardBody>
                  <div className={'btn btn-primary'}>
                    <Link to={'/quiz'} className={'text-white'}>Spela!</Link>
                  </div>
              </CardBody>
            </Card>
      </Col>
    </Row>

  </Container>
)

export default Home;