import React from "react";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import Carousel from 'react-bootstrap/Carousel';
import { useDeleteProductMutation, useSingleProductQuery } from "../features/productApi";
import { Row, Card, Col, ListGroup, Container ,Button } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { CgNametag } from "react-icons/cg";
import { MdOutlineCountertops } from "react-icons/md";
const SingleProduct = () => {
  const { id } = useParams();
  const [deleteProduct]  = useDeleteProductMutation();
  const { data, isLoading, error} = useSingleProductQuery(id);

  const handleDelete = async(id)=>{
   const response =  await deleteProduct(id)
   if(response.data){
    toast.success('product deleted successfully')
   }
  }
  
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
                <ListGroup.Item> 
                  <Button variant="danger" onClick={()=>handleDelete(data.id)}>delete</Button>
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
