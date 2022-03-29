import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Box, Button, Container, styled, TextField} from '@mui/material'
import { Link } from 'react-router-dom'
import LoginSocial from '../components/LoginSocialMedia'
import { useNavigate } from 'react-router-dom'
import { Email } from '@mui/icons-material'

interface IFormInputs {
  email: string;
  password: string;
}


function Login() {
  const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#959392',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#959392',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#FFF',
        },
        '&:hover fieldset': {
          borderColor: '#FFF',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#FFF',
        },
    },
  });
  const userName = useRef("")
  const handleUser = async (email: string, password: string) => {
    
    const settings = {
      headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    };
    try {
      const response = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`, settings) 
      
      const data = await response.json()
      if(data){
        userName.current = data[0].lastName
        return true
      }else {
        return false
      }
    } catch (error) {
      return error
    }
  }
 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();

  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem('user')|| '{}')

  const onSubmit = async (data: IFormInputs) => {
    const user = await handleUser(data.email,data.password)
    if (user) {
      alert("Đăng nhập thành công");
      navigate("/dashboard");
      localStorage.setItem('host', JSON.stringify(userName.current))

    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
    
  };
  useEffect(() => {
    if(localStorage.getItem('host')){
      navigate("/dashboard")
    }
  }, [])
  

  return (
    <Box className='host-login-container'>
      <Box style={{position: 'absolute', top:'20px'}} width={'100%'}><Link to='/' className='brand br'>RikStay</Link></Box>
      <Box className='login login-host' >
        <Box className='form-register'>
        <h3 >Đăng nhập</h3>
        <Box>
          <LoginSocial/>
        </Box>
        <Box className="or">
          <div className="line"/>
          <div className="or-line">Hoặc</div>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <Box className='text-sign'>
            <CustomTextField className='input-sign' 
            label="Địa chỉ email" variant="outlined"
            {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
            {errors?.email?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.email?.type === "pattern" && (
            <small>Email không hợp lệ</small>
            )}
          </Box> 
  
          <Box className='text-sign'>
            <CustomTextField className='input-sign'
            label="Mật khẩu" variant="outlined"
            type={'password'} {...register("password", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
            {errors?.password?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.password?.type === "pattern" && (
            <small>Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số</small>
          )}
          </Box> 
          <Button className='btn-submit-form' type="submit" >Đăng Nhập</Button> <br />
      </form>
      </Box>
      <Box className='login-host-right'>
        <p>Bạn chưa đăng ký? <Link style={{textDecoration: 'none', color: '#b71c1c', fontSize: '1rem', fontWeight:'600'}} to='/signup'>Đăng ký ngay</Link></p>
        <p>Chúng tôi không thu phí khi bạn đăng chỗ nghỉ. Nếu chỗ nghỉ của bạn đạt tiêu chuẩn được kiểm duyệt đăng tải trên Luxstay, chúng tôi chỉ thu phí khi có booking</p>
        <p >Hotline: <a className='hotline' href="tel: 18001989">18001989 (Nhánh 1 phím 2)</a> </p>
        <Box> <span >Tải ứng dụng Rikstay giúp bạn quản lý chỗ nghỉ dễ dàng</span></Box>
        <Box display={'flex'}>
          <Box>
          <p> <img width={'180'} height={'40'} src="https://www.luxstay.com/icons/apple-store.svg" alt="" /></p>
          <p> <img width={'180'} height={'40'} src="https://www.luxstay.com/icons/google-play.svg" alt="" /></p>
          </Box>
        
        <p> <img width={'100'} height={'100'} src="https://host.luxstay.net/pr_code.png" alt="" /></p>
        </Box>
        


      </Box>
      </Box>
      
    </Box>
  );
}
export default Login