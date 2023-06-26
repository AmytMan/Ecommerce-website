import React from "react";
import FormContainer from "../components/FormContainer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAddProductMutation, useGetProductsQuery } from "../features/productApi";
import { toast } from "react-toastify";
import {useGetCategoriesQuery} from '../features/categoryApi';
import { useSelector } from "react-redux";
function CreateProduct() {
  const {data:Product} = useGetProductsQuery();
  const id = Product ? Product.length +1 :null ;
  const {data:category} = useGetCategoriesQuery()
  
  const [addProduct, { isLoading }] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {title ,price ,category , description , image ,rate ,count} = data;
    console.log(image)
   const formData = new FormData()
   formData.append('title',title)
   formData.append('price',price)
   formData.append('category',category)
   formData.append('description',description)
   formData.append('rate',rate)
   formData.append('count',count)
   formData.append('id',id)
   for(let i=0; i<image.length;i++){
    formData.append('image',image[i])
   }
    const response = await addProduct(formData);
     if(response.error){
       toast.error(response.error.data.msg)
      }else if(response.data){
        toast.success(response.data.msg)
      }else{ 
        toast.success('ok')
      }
  };
  if(isLoading){
    return <div>Loading...</div>
  } 

  return (
    <div>
      <FormContainer>
        <Container>
          <Row>
            <Col>
              <h5 className="text-center text-bolder">Add Product</h5>
              <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}  >
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Product Name"
                />
                {errors.title && <span>This field is required</span>}
                <select  {...register("category", { required: true })}>
          {category?.category.map((items)=>(
          <option key={items._id} value={items.category}>{items.category}</option>
          ))}
          </select>
                {errors.category && <span>This field is required</span>}
                <input
                  {...register("description", { required: true })}
                  type="text"
                  placeholder="Product Description"
                />
                {errors.description && <span>This field is required</span>}
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="$ Price"
                />
                {errors.price && <span>This field is required</span>}
                
                <select
                  {...register("rate", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    {" "}
                    rating
                  </option>
                  {Array.from(Array(5), (_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                {errors.rate && <span>This field is required</span>}

                <input
                  {...register("count", { required: true })}
                  type="number"
                  placeholder="Product Count"
                />
                {errors.count && <span>This field is required</span>}
                <input
                  {...register("image", { required: true })}
                  type="file"
                 multiple
                />
                {errors.image && <span>This field is required</span>}

                <Button type="submit">
                  {isLoading ? "Creating" : "Create"}
                </Button>
              </form>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </FormContainer>
    </div>
  );
}

export default CreateProduct;
