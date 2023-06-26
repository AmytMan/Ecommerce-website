import React from 'react';
import {toast} from 'react-toastify'
import { useForm } from 'react-hook-form';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { useLoginUserMutation } from '../features/apiSlice';
import { setUserData } from '../features/authSlice';
const LoginScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [loginUser , {isLoading}] = useLoginUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit= async(data)=>{
      
      const response = await loginUser(data);
      if(response.error){
        const message = response.error.data.msg
        toast.error(message)
      }
     else{
      dispatch(setUserData(response.data.user))
      navigate('/dashboard')
     }

    }
  return (
    <FormContainer >
             

        <h5 className='text-center'>Sign In</h5>
        <form  onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} type='text' id='email' placeholder='email' />
        {errors.email && <span>This field is required</span>}

        <input {...register('password', { required: true })} type='password' id='password' placeholder='password' />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
        <h5>
            Don't have an account? <Link to='/register' className='text-decoration-none'>SignUp</Link>
        </h5>
        
      </form>
    </FormContainer>
  )
}

export default LoginScreen