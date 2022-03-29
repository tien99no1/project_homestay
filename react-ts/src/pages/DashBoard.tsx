import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { GoogleLogout } from "react-google-login";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';


const clientId =
  "422653143846-21pcn0fknnquh0hs9881tbkhnn4f855d.apps.googleusercontent.com";

  interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function Host() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "XGrid", col2: "is Awesome" },
    { id: 3, col1: "Material-UI", col2: "is Amazing" },
    { id: 4, col1: "Hello", col2: "World" },
    { id: 5, col1: "XGrid", col2: "is Awesome" },
    { id: 6, col1: "Material-UI", col2: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 80 },
    { field: "col2", headerName: "Tên chỗ nghỉ", width: 300 },
    { field: "col3", headerName: "Đặt phòng nhanh", width: 150 },
    { field: "col4", headerName: "Địa điểm", width: 450 },
    { field: "col5", headerName: "Trang thái", width: 150 },
    { field: "col6", headerName: "Hiển thị/Ẩn", width: 150 },
    {
      field: "Hành động",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              // handleClick(event, cellValue);
            }}
          >
            Thiết lập
          </Button>
        );
      },
      width: 150,
    },
  ];
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //google logout
  const navigate = useNavigate();
  const onSignoutSuccess = () => {
    console.clear();
    navigate('/host')
  };
  const handleLogout = () => {
    localStorage.removeItem('host')
    navigate('/host')
  }
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('host') || '{}' );
    if (user) {
    setUser(user);
    }
  }, []);

  return (
    <>
      <Box display={"flex"} justifyContent={"end"} padding={"1rem"}>
        <Box style={{ position: "absolute" }} width={"100%"}>
          <Link to="/" style={{paddingLeft: '50px',
    fontSize: '2rem'}} className="brand ">
            RikStay
          </Link>
        </Box>
        <Box display={"flex"} justifyContent={' center'} alignItems={'center'} marginRight={"2rem"}>
          <Link style={{textDecoration: 'none'}} to='/create'>
          <Button className="btn-create">Tạo chỗ nghỉ mới</Button>
          </Link>
          <Box>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="" src="">
                {user[0]}
              </Avatar>
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
              <MenuItem onClick={handleClose}>Tài khoản của tôi</MenuItem>
              <MenuItem onClick={handleClose}>
              <button 
                className="btn-logout" onClick={handleLogout}>
                
                <GoogleLogout
                  icon={false}
                  className="gg-logout"
                  clientId={clientId}
                  buttonText="Đăng xuất"
                  onLogoutSuccess={onSignoutSuccess}
                ></GoogleLogout>
                </button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", mt: "4rem" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Bảng tin" {...a11yProps(0)} />
              <Tab label="Chỗ nghỉ" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", fontWeight: "500" }}
            >
              Thống kê tình hình kinh doanh
            </Typography>
            <List
              sx={{
                width: "auto",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "row",
                margin: "1rem 0 1rem 0",
              }}
            >
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0đ" secondary="Tổng doanh thu" />
              </ListItem>
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Tổng số booking" />
              </ListItem>
              <ListItem
                sx={{
                  borderTop: "1px solid #dae3dc",
                  borderBottom: "1px solid #dae3dc",
                  borderLeft: "1px solid #dae3dc",
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Lượt đánh giá" />
              </ListItem>
              <ListItem sx={{ border: "1px solid #dae3dc" }}>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="0" secondary="Điểm đánh giá" />
              </ListItem>
            </List>
            <Typography
              variant="h6"
              component="h2"
              sx={{ display: "flex", fontWeight: "500", m: "1rem 0 1rem 0" }}
            >
              Đặt chỗ gần đây
            </Typography>
            <Box
              maxWidth="lg"
              sx={{
                height: "30rem",
                border: "1px solid #dae3dc",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://nghekhachsan.com/upload/NKS-Hong/homestay-la-gi-1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://vnn-imgs-a1.vgcloud.vn/image2.tienphong.vn/w645/Uploaded/2021/svjsplu/2021_09_01/198754915-2803.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>

              <Card sx={{ width: "100%", display: "flex", mb: "10px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  width="200"
                  image="https://tapchidiaoc.com/wp-content/uploads/2022/01/homestay-la-gi-40-760x367-1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ display: "flex", fontWeight: "500", m: "2rem 0 2rem 0" }}
            >
              2 Chỗ nghỉ
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-number"
                  label="Tìm kiếm theo mã phòng"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Box>
            <div style={{ height: 400, width: "100%", textAlign: "center" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
