import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
import { useCreateUserMutation } from "../features/apiSlice";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import icon from '../constant/icons';
import {  toast } from "react-toastify";

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePassword=()=>{
    setShowPassword(!showPassword);
  }
  const handleConfirmPassword=()=>{
    setShowConfirmPassword(!showConfirmPassword);
  }
  const [createUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {confirmPassword ,...rest} = data
    const response = await createUser(rest);
    reset()
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
            <Col md={12}>
              <h5 className="text-center text-bolder ">Sign Up </h5>

              <form  onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("name", { required: 'Username is required' })}
                  type="text"
                  placeholder="username"
                />
                {errors.name && <p>{errors.name.message}</p>}
                <input
                  {...register("email", {
                     required: 'Email is required' ,
                     pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: 'Email is not valid',}})}
                  type="text"
                  placeholder="email"
                />
                 {errors.email && (
                  <p>{errors.email.message}</p>
                )}
                <input
                  {...register("location", { required: 'Your location is required' })}
                  type="text"
                  placeholder="location"
                />
                {errors.location && <p>{errors.location.message}</p>}
                <div className="password-input">

                
                <input
                  {...register("password", { required: 'password is required',
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    - Can contain special characters`
                  }})}
                  type={showPassword ?'text':'password'}
                  placeholder="password"
                /> <span className="password-toggle" onClick={handlePassword}>
                    {showPassword ? <icon.RiEyeOffFill/>: <icon.AiFillEye/> }
                  </span>
                </div>
                {errors.password && <p>{errors.password.message}</p>}

                <div className="password-input">
                <input
                  {...register('confirmPassword', {
                    required: 'confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'password not matched',
                  })}
                  type={showConfirmPassword ?'text':'password'}
                  placeholder="confirm password"
                /><span className="password-toggle" onClick={handleConfirmPassword}>
                {showConfirmPassword ? <icon.RiEyeOffFill/>: <icon.AiFillEye/> }
              </span>
                </div>
                {errors.confirmPassword && (
                  <p>
                    {errors.confirmPassword.message}
                  </p>
                )}

                <input type="submit" />
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
