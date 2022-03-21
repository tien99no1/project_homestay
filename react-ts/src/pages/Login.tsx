import React from 'react'
import { useForm } from 'react-hook-form'
import {Box, TextField} from '@mui/material'


interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Họ và tên đệm</label>
        <TextField {...register("firstName", {required: true, maxLength: 80, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
        {errors?.firstName?.type === "required" && <small>Vui lòng nhập trường này</small>}
        {errors?.firstName?.type === "maxLength" && (
        <small>Họ và tên đệm không được vượt quá 80 ký tự</small>
        )}
        {errors?.firstName?.type === "pattern" && (
        <small>Họ và tên đệm phải là chữ cái và dài hơn 2 ký tự</small>
        )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Tên</label>
        <TextField {...register("lastName", {required: true, maxLength: 100, pattern: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g})} />
        {errors?.lastName?.type === "required" && <small>Vui lòng nhập trường này</small>}
        {errors?.lastName?.type === "maxLength" && (
        <small>Tên không được vượt quá 100 ký tự</small>
        )}
        {errors?.lastName?.type === "pattern" && (
        <small>Tên phải là chữ cái và dài hơn 2 ký tự</small>
      )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Địa chỉ email</label>
        <TextField {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors?.email?.type === "required" && <small>Vui lòng nhập trường này</small>}
        {errors?.email?.type === "pattern" && (
        <small>Email không hợp lệ</small>
        )}
      </div>
      <div>
        <label>Số điện thoại</label>
        <TextField type="text" {...register("phone", {required: true, pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i})} />
        {errors?.phone?.type === "required" && <small>Vui lòng nhập trường này</small>}
        {errors?.phone?.type === "pattern" && (
        <small>Số điện thoại không hợp lệ</small>
      )}
      </div>
      <div>
        <label>Mật khẩu</label>
        <TextField type={'password'} {...register("password", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
        {errors?.password?.type === "required" && <small>Vui lòng nhập trường này</small>}
        {errors?.password?.type === "pattern" && (
        <small>Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số</small>
      )}
      </div>
      <TextField type="submit" />
    </form>
    </Box>
  );
}
export default Login