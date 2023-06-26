import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCreateUserMutation } from "../features/apiSlice";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {  toast } from "react-toastify";
const SignupScreen = () => {
  const [createUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await createUser(data);
    if (response.error) {
      const message = response.error.data.msg;
      toast.error(message);
    } else {
      const message = response.data.msg;
      toast.success(message);
    }
  };

  return (
    <>
      <FormContainer>
        <Container>
          <Row>
            <Col md={4} className="bg_img">
              Sign up to explore more
            </Col>
            <Col md={8}>
              <h5 className="text-center text-bolder ">Sign Up</h5>

              <form className="title_family" onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="username"
                />
                {errors.email && <span>This field is required</span>}
                <input
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="email"
                />
                {errors.email && <span>This field is required</span>}
                <input
                  {...register("location", { required: true })}
                  type="text"
                  id="location"
                  placeholder="location"
                />
                {errors.location && <span>This field is required</span>}
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="password"
                />
                {errors.password && <span>This field is required</span>}

                <Button type="submit">Submit</Button>
              </form>
            </Col>
          </Row>
          <Row>
            <h5 className="text-center my-3">
              Already Registered?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </h5>
          </Row>
        </Container>
      </FormContainer>
    </>
  );
};

export default SignupScreen;
