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
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import ListRoom from "../components/ListRoom";

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  //google logout
  const navigate = useNavigate();
  const onSignoutSuccess = () => {
    console.clear();
    navigate("/host");
  };
  const handleLogout = () => {
    localStorage.removeItem("hostId");
    navigate("/host");
  };
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("hostId") || "{}");
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <Box display={"flex"} justifyContent={"end"} padding={"1rem"}>
        <Box style={{ position: "absolute" }} width={"100%"}>
          <Link
            to="/"
            style={{ paddingLeft: "50px", fontSize: "2rem" }}
            className="brand "
          >
            RikStay
          </Link>
        </Box>
        <Box
          display={"flex"}
          justifyContent={" center"}
          alignItems={"center"}
          marginRight={"2rem"}
        >
          <Link style={{ textDecoration: "none" }} to="/create">
            <Button className="btn-create-room">Tạo chỗ nghỉ mới</Button>
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
                <button className="btn-logout" onClick={handleLogout}>
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
                border: "1px solid #dae3dc",
                padding: "10px",
              }}
            >
              <Card sx={{ width: "100%", display: "flex" }}>
                <CardMedia
                  component="img"
                  className="media-img"
                  image="https://tapchidiaoc.com/wp-content/uploads/2022/01/homestay-la-gi-40-760x367-1.jpg"
                  alt="green iguana"
                />
                <CardContent className="content-dashboard">
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
                  <Button size="small">Cho thuê</Button>
                  <Button size="small">Từ chối</Button>
                </CardActions>
              </Card>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div style={{ height: 400, width: "100%", textAlign: "center" }}>
              <ListRoom />
            </div>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
