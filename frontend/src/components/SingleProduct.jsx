import React from "react";
import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../features/productApi";
import { Row, Card, Col, ListGroup, Container ,Carousel } from "react-bootstrap";
import icons from "../constant/icons";
const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error} = useSingleProductQuery(id);

 
  
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
                  <icons.CgNametag />
                  Title : {data.title}
                </ListGroup.Item>
                <ListGroup.Item>
                  <icons.BiCategory /> Category : {data.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <icons.MdOutlineDescription /> Description : {data.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <icons.GiPriceTag /> Price : ${data.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <icons.MdOutlineCountertops /> Count : {data.rating.count}
                </ListGroup.Item>

                <ListGroup.Item className="text-warning">
                  {Array.from(
                    Array(Math.round(data.rating.rate)),
                    (_, index) => (
                      <icons.AiFillStar key={index} />
                    )
                  )}
                </ListGroup.Item>
                
              </ListGroup>
            </Col>

            <Col md={6} xs={12}>
              <Card style={{width:'30rem'}} >
              <Carousel fade>
              {
                data.image.map((item,index)=>(
                 
                   
                      <Carousel.Item key={index}>
                        <img src={`http://localhost:5000/images/${item}`} alt="image not fount"  style={{width:'30rem',height:'30rem'}}/>
                      </Carousel.Item>                   

                ))
              }
               </Carousel>
               </Card>
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
