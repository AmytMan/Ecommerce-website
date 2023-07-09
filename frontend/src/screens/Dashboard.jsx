import React, { useState } from 'react';
import { useGetProductsQuery } from '../features/productApi';
import { Link } from 'react-router-dom';
import { Card, Row, Col, CardGroup, ListGroup, Button ,Image } from 'react-bootstrap';
import ProductPagination from './Pagination';
import SpinnerEffect from '../components/SpinnerEffect';

const MyComponent = () => {
  const { data, isLoading } = useGetProductsQuery();

  const totalItems = data ? data.length : null;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const currentProducts = data ? data.slice(startIndex, endIndex + 1) : '';

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return ( <SpinnerEffect/>)
  }
  return (
    <div>
      <Row xs={1} md={3} className="g-5">
        {currentProducts.map((item) => (
          <Col key={item.id}>
            <CardGroup>
              <Card className="" style={{ height: '35rem' }}>
                <Card.Header>{item.title}</Card.Header>
                <Card.Body>
                  <Card.Img src={item.image} style={{ height: '15rem' }} />
                  <ListGroup variant="flush">
                    <ListGroup.Item>{item.category}</ListGroup.Item>
                    <ListGroup.Item>Price: ${item.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Rating: {item.rating.rate}/5
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <Button variant="success">add to cart</Button>
                  <Link
                    className="float-end text-decoration-none border rounded-2 p-2 text-white bg-primary"
                    to={`/product/${item.id}`}
                  >
                    view details
                  </Link>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        ))}
      </Row>

      <ProductPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default MyComponent;
