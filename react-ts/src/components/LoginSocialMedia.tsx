import { Box } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom'

const clientId =
  "422653143846-21pcn0fknnquh0hs9881tbkhnn4f855d.apps.googleusercontent.com";

function LoginSocial() {
  const navigate = useNavigate();
  
  const onLoginSuccess = (response: any) => {
    localStorage.setItem('host', JSON.stringify(response.profileObj.familyName))
    navigate('/dashboard')
   
  };

  const onLoginFailure = (res: any) => {
    console.log("Login Failed:", res);
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
          autoLoad={false}
        />
    </Box>
  );
}
export default LoginSocial;
