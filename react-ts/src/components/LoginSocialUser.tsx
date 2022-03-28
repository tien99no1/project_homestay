import { Box } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom'

const clientId =
  "422653143846-21pcn0fknnquh0hs9881tbkhnn4f855d.apps.googleusercontent.com";

function LoginSocialUser() {
  const navigate = useNavigate();
  
  const onLoginSuccess = (res: any) => {
    console.log("Login Success:", res.profileObj);
    localStorage.setItem('users', JSON.stringify(res.profileObj))
    navigate('/')
    
  };

  const onLoginFailure = (res: any) => {
    console.log("Đăng nhập thất bại:", res);
  };

  return (
    <Box>
     
        <GoogleLogin
         className="login-google"
          clientId={clientId}
          buttonText="Đăng nhập bằng Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
     
    </Box>
  );
}
export default LoginSocialUser;
