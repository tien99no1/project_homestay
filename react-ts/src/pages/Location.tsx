import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NumberFormat from "react-number-format";
import { CONFIG } from "../config";

interface IPost {
  id: number;
  roomImg: string;
  roomCate: string;
  title: string;
  roomPrice: number;
  address: string;
}
const defaultProps: IPost[] = [];
function Location() {
  const [select, setSelect] = React.useState("");
  const [rooms, setRooms] = useState(defaultProps);
  const params = useParams();
  const { address } = params;
  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };
  const getListRoom = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiRoom}?status=1&isCheck=false`);
      setRooms(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getListRoom();
  }, []);
  return (
    <Container maxWidth="xl">
      <Box className="location-top">
        <Box className="btn-filter">
          <button>Hủy phòng linh hoạt</button>
          <button>Đặt phòng nhanh</button>
          <button>Khu vực</button>
          <button>Giá ưu đãi</button>
          <button>Loại phòng</button>
        </Box>
        <Box className="caption-local">
          <p>
            <b>
              Trước khi đặt phòng, hãy kiểm tra những địa điểm bị hạn chế du
              lịch trong thời gian này.
            </b>
            Sức khỏe và sự an toàn của cộng đồng luôn được đặt hàng đầu. Vì vậy,
            vui lòng làm theo chỉ thị của chính phủ bởi điều đó thực sự cần
            thiết.
          </p>
        </Box>
        <Box className="place">
          <Box>
            <h2>Chỗ ở tại {address}</h2>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sắp xếp:</InputLabel>
              <Select
                sx={{ width: "200px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={select}
                label="Sắp xếp:"
                onChange={handleChange}
              >
                <MenuItem value={10}>Giá tăng dần</MenuItem>
                <MenuItem value={20}>Giá giảm dần</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 1, md: 1.5 }}
        >
          {rooms
            .filter((room: any) => room.address === address)
            .map((room: any) => {
              return (
                <Grid item xl={3} sm={6} md={4} xs={12}>
                  <Box className="Location">
                    <Link to={`/home/room/${room.id}`}>
                      <Box className="img-location">
                        <img src={room.roomImg} alt="" />
                      </Box>
                    </Link>
                    <Box className="content-location">
                      <span>{room.title}</span>
                      <p>{room.roomName}</p>
                      <b>
                        <NumberFormat
                          value={room.roomPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"₫/đêm"}
                        />
                      </b>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
}
export default Location;
