import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {Box, Button, Container, styled, TextField} from '@mui/material'
import { Link } from 'react-router-dom'



interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}


function CreateRoom() {
 

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data))
      
//     fetch('http://localhost:4000/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('success', data);
//        navigate('/Login')
//     })
//     .catch(error => {
//       console.error('There was an error!', error);
//   });

  };

  return (
    <Box className='container-create'>
      <Box style={{position: 'absolute', top:'20px'}} width={'100%'}><Link to='/' className='brand br'>RikStay</Link></Box>
      <Box className='sign' >
        <Box className='form-register'>
        <h3 >Tạo chỗ nghỉ mới</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className='text-sign'>
            <input className='input-sign'
            {...register("firstName", {required: true, maxLength: 80, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
            {errors?.firstName?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.firstName?.type === "maxLength" && (
            <small>Họ và tên đệm không được vượt quá 80 ký tự</small>
            )}
            {errors?.firstName?.type === "pattern" && (
            <small>Họ và tên đệm phải là chữ cái và dài hơn 2 ký tự</small>
            )}
          </Box> 
          <Box className='text-sign'>
            <input className='input-sign'
            {...register("lastName", {required: true, maxLength: 100, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
            {errors?.lastName?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.lastName?.type === "maxLength" && (
            <small>Tên không được vượt quá 100 ký tự</small>
            )}
            {errors?.lastName?.type === "pattern" && (
            <small>Tên phải là chữ cái và dài hơn 2 ký tự</small>
          )}
          </Box>
          <Box className='text-sign'>
            <input className='input-sign' 
            {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
            {errors?.email?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.email?.type === "pattern" && (
            <small>Email không hợp lệ</small>
            )}
          </Box> 
          <Box className='text-sign'>
            <input className='input-sign'
            type="text" {...register("phone", {required: true, pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i})} />
            {errors?.phone?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.phone?.type === "pattern" && (
            <small>Số điện thoại không hợp lệ</small>
          )}
          </Box> 
          <Box className='text-sign'>
            <input className='input-sign'
            type={'password'} {...register("password", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
            {errors?.password?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.password?.type === "pattern" && (
            <small>Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số</small>
          )}
          </Box> 
          <Button className='btn-submit-form' type="submit" >Tạo phòng</Button> <br />
      </form>
      </Box>
      
      </Box>
      
    </Box>
  );
}
export default CreateRoom

