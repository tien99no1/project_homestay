import {
  AppBar,
  Avatar,
  Button,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Navbar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "../../store/userSlice";
import axios from "axios";
import { CONFIG } from "../../config";

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

  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    sessionStorage.removeItem('advide');
    dispatch(logoutRequest(userAuth))
    navigate('/')
  };

  const [roomSearching, setRoomSearching] = useState([]);
  const [rooms, setRooms] = useState([]);
  const getListRoom = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiRoom}?status=1&isCheck=false`);
      setRooms(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getListRoom();
  }, []);
  
  const handleSearch = (event: any) => {
    const searchWord = event.target.value;
    const newFilter = rooms.filter((room: any) => {
      return room.roomName.toLowerCase().includes(searchWord);
    });
    if (searchWord === "") {
      setRoomSearching([]);
    } else {
      setRoomSearching(newFilter);
    }
  };

  const onGoToRoomPage = (room: any) => {
    setRoomSearching([])
  }
  
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
                onChange={handleSearch}
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
              {localStorage.getItem("userId") ? (
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
                        {userAuth.lastName[0]}
                      </Avatar>
                    </li>
                    <li className="nav-items">
                      <span style={{ color: "#000" }}>{userAuth.lastName}</span>
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
                    <MenuItem onClick={handleClose}><Link className="link menu-item " to='/home/profile'><AccountCircleIcon/> Tài khoản</Link></MenuItem>
                    <MenuItem onClick={handleClose}>
                      <button className="btn-logout menu-item" onClick={handleLogout}>
                        <LogoutIcon/> Đăng xuất
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
      {roomSearching.length !== 0 && (
        <Box
          sx={{
            width: "25rem",
            height: "auto",
            mt: "4.5rem",
            position: "fixed",
            left: "8.2rem",
            zIndex: "100",
            bgcolor: "white",
            padding: "1rem",
            borderRadius: "5px",
            boxShadow: "-1px 3px 16px -4px #000000",
          }}
        >
          {roomSearching.map((room: any, key: any) => {
            return (
              <Link to={`/home/room/${room.id}`} onClick={() => onGoToRoomPage(room)}>
                <Box
                  sx={{
                    color: "black",
                    mb: "1rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#e6e6e6",
                      opacity: [0.8, 0.7, 0.9],
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={room.roomImg} alt="" width="100px" />
                    <Box sx={{ ml: "1rem" }}>
                      <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
                        {room.roomName}
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        {room.address}, {room.addressDetail}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      )}
    </AppBar>
  );
}

export default Navbar;
