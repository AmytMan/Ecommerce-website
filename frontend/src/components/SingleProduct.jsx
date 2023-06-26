import React from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { useSingleProductQuery } from "../features/productApi";
import { Row, Card, Col, ListGroup, Container } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { CgNametag } from "react-icons/cg";
import { MdOutlineCountertops } from "react-icons/md";
const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error} = useSingleProductQuery(id);
  const imageUrl = `http://localhost:5000/images/${data.image[0]}`;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
    

  return (
    <div className="py-5">
      {data ? (
        <Container>
          <Row>
            <Col key={data.id} md={6} xs={12}>
              <ListGroup>
                <ListGroup.Item>
                  <CgNametag />
                  Title : {data.title}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BiCategory /> Category : {data.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <MdOutlineDescription /> Description : {data.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <GiPriceTag /> Price : ${data.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <MdOutlineCountertops /> Count : {data.rating.count}
                </ListGroup.Item>

                <ListGroup.Item className="text-warning">
                  {Array.from(
                    Array(Math.round(data.rating.rate)),
                    (_, index) => (
                      <AiFillStar key={index} />
                    )
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6} xs={12}>
                <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageUrl}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="text-danger">First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={imageUrl}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="text-danger">second</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1> {error.data.msg}</h1>
      )}
    </div>
  );
};

export default SingleProduct;
