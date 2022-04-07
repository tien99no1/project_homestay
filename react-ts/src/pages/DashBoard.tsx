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
import { CONFIG } from "../config";
import News from "../components/News";

const clientId =
  `${CONFIG.GOOLGE_CLIENT_ID}`;

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
    localStorage.removeItem("hostName");
    navigate("/host");
  };
  const [host, setHost] = React.useState([]);

  React.useEffect(() => {
    const host = JSON.parse(localStorage.getItem("hostName") || "{}");
    if (host) {
      setHost(host);
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
                {host[0]}
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
              <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
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
      <Container maxWidth="xl">
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
              sx={{ display: "flex", fontWeight: "500", m: "1rem 0 1rem 0" }}
            >
              Đặt chỗ gần đây
            </Typography>
            <div>
              <News/>
            </div>
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
