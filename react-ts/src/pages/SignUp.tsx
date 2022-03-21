import React from 'react'
import { useForm } from 'react-hook-form'
import {Box, Button, Container, TextField} from '@mui/material'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'


interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}


function Login() {
  const responseGoogle = (res: any) => {
    console.log(res)
  }
  const responseFacebook = (res: any) => {
    console.log(res)
  }
  const componentClicked = (data: any) => {
    console.log(data)
  }



  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box className='container-sign'>
      <Box width={'100%'}><Link to='/' className='brand br'>RikStay</Link></Box>
      <Box className='sign' >
        <Box className='form-register'>
        <h3>Đăng ký thành viên</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField 
            label="Họ và tên đệm" variant="outlined"
            {...register("firstName", {required: true, maxLength: 80, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
            {errors?.firstName?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.firstName?.type === "maxLength" && (
            <small>Họ và tên đệm không được vượt quá 80 ký tự</small>
            )}
            {errors?.firstName?.type === "pattern" && (
            <small>Họ và tên đệm phải là chữ cái và dài hơn 2 ký tự</small>
            )}
          </Box> <br />
          <Box >
            
            <TextField 
            label="Tên" variant="outlined"
            {...register("lastName", {required: true, maxLength: 100, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
            {errors?.lastName?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.lastName?.type === "maxLength" && (
            <small>Tên không được vượt quá 100 ký tự</small>
            )}
            {errors?.lastName?.type === "pattern" && (
            <small>Tên phải là chữ cái và dài hơn 2 ký tự</small>
          )}
          </Box> <br />
          <Box style={{ marginBottom: 10 }}>
            <TextField 
            label="Địa chỉ email" variant="outlined"
            {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
            {errors?.email?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.email?.type === "pattern" && (
            <small>Email không hợp lệ</small>
            )}
          </Box> <br />
          <Box>
            <TextField 
            label="Số điện thoại" variant="outlined"
            type="text" {...register("phone", {required: true, pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i})} />
            {errors?.phone?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.phone?.type === "pattern" && (
            <small>Số điện thoại không hợp lệ</small>
          )}
          </Box> <br />
          <Box>
            <TextField 
            label="Mật khẩu" variant="outlined"
            type={'password'} {...register("password", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
            {errors?.password?.type === "required" && <small>Vui lòng nhập trường này</small>}
            {errors?.password?.type === "pattern" && (
            <small>Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số</small>
          )}
          </Box> <br />
          <Button className='btn-submit-form' type="submit" >Đăng ký</Button>
      </form>
      </Box>
      <Box className='form-login'>
        <p>Bạn đã có tài khoản RikStay? <Link to='/Login'>Đăng nhập</Link></p>
        <p>Hoặc đăng nhập với</p>
        <Box>
          <FacebookLogin
            appId="657462482253865"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook" />
        </Box>
        <Box>
          <GoogleLogin
              clientId= '422653143846-21pcn0fknnquh0hs9881tbkhnn4f855d.apps.googleusercontent.com'
              buttonText="Đăng nhập với Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
        </Box>


      </Box>
      </Box>
      
    </Box>
  );
}
export default Login