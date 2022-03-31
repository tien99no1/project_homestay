import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, styled, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import LoginSocialUser from "../components/LoginSocialUser";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  email: string;
  password: string;
}

function Login() {
  const userName = useRef("");
  const handleUser = async (email: string, password: string) => {
    const settings = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:4000/users?email=${email}&password=${password}`,
        settings
      );

      const data = await response.json();
      if (data) {
        userName.current = data[0].lastName;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };
  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#959392",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#959392",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {},
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    const user = await handleUser(data.email, data.password);
    if (user) {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(userName.current));
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <Box className="container-login">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand br">
          RikStay
        </Link>
      </Box>
      <Box className="login">
        <Box className="form-register">
          <h3>Đăng nhập</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Địa chỉ email"
                variant="outlined"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.email?.type === "pattern" && (
                <small>Email không hợp lệ</small>
              )}
            </Box>
            <Box className="text-sign">
              <CustomTextField
                className="input-sign"
                label="Mật khẩu"
                variant="outlined"
                type={"password"}
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                })}
              />
              {errors?.password?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.password?.type === "pattern" && (
                <small>
                  Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số
                </small>
              )}
            </Box>
            <Button className="btn-submit-form" type="submit">
              Đăng Nhập
            </Button>{" "}
            <br />
          </form>
        </Box>
        <Box className="form-login">
          <p>
            Bạn chưa có tài khoản RikStay?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#b71c1c",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              to="/signup"
            >
              Đăng ký
            </Link>
          </p>
          <p>Hoặc đăng nhập với</p>
          <Box>
            <LoginSocialUser />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Login;
