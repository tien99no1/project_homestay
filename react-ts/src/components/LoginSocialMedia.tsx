import { Box } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom'

const clientId =
  "422653143846-21pcn0fknnquh0hs9881tbkhnn4f855d.apps.googleusercontent.com";

function LoginSocial() {
  const navigate = useNavigate();
  const [showloginButton, setShowloginButton] = useState<boolean>(true);
  const [showlogoutButton, setShowlogoutButton] = useState<boolean>(false);
  const onLoginSuccess = (response: any) => {
    console.log("Login Success:", response.profileObj);
    localStorage.setItem('host', JSON.stringify(response.profileObj))
    navigate('/dashboard')
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res: any) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <Box>
      {showloginButton ? (
        <GoogleLogin
         className="login-google"
          clientId={clientId}
          buttonText="Đăng nhập bằng Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : null}
      {showlogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Đăng xuất"
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </Box>
  );
}
export default LoginSocial;
