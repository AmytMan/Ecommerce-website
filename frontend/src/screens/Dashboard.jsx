import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useGetProductsQuery } from '../features/productApi';
import { Link } from 'react-router-dom';
import { Spinner, Card, Row, Col, CardGroup, ListGroup, Button } from 'react-bootstrap';

const MyComponent = () => {
  const { data, isLoading } = useGetProductsQuery();
  const totalItems = data ? data.length : null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const currentProducts = data? data.slice(startIndex, endIndex + 1):'';

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return <Spinner animation="grow" variant="success" role="status" />;
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
                  <Button variant="success">add to bag</Button>
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

      <Pagination className=' justify-content-md-center my-5 pagination'size="lg">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default MyComponent;
