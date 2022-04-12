import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "../../css/Navbar.css";
import styled from "@emotion/styled";

function Navbar() {
  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#959392",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#959392",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  //google logout
  const onSignoutSuccess = () => {
    console.clear();
    localStorage.removeItem("user");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate('/')
  };
  const [user, setUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setUser(user);
    }
  }, []);
  
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Box className="appBar" width={1}>
          <Box className="nav-left" display={"flex"}>
            <Link to="/" className="brand">
              RikStay
            </Link>
            <Box className="box-search">
              <CustomTextField
                label="Tìm kiếm"
                id="outlined-size-small"
                size="small"
              />
              <Button className="btn-search" variant="outlined">
                <SearchIcon style={{ margin: 0, color: "#fff" }} />
              </Button>
            </Box>
          </Box>
          <Box>
            <ul className="nav-right">
              <li style={{ marginRight: "1.2rem" }} className="nav-items">
                  
              </li>
              <li style={{ marginRight: "1.2rem" }} className="nav-items">
                <Link to="/host">Host</Link>
              </li>
              {localStorage.getItem("user") ? (
                <Box>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <li className="nav-items">
                      <Avatar
                        sx={{
                          width: "25px",
                          height: "25px",
                          fontSize: "1rem",
                          marginRight: "5px",
                        }}
                        alt=""
                        src=""
                      >
                        {user[0]}
                      </Avatar>
                    </li>
                    <li className="nav-items">
                      <span style={{ color: "#000" }}>{user}</span>
                    </li>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}><Link className="link" to='/home/profile'>Tài khoản</Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <button className="btn-logout" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <>
                  <li className="nav-items">
                    <Link to="/signup">Đăng ký</Link>
                  </li>
                  <li className="nav-items">
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                </>
              )}
            </ul>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
