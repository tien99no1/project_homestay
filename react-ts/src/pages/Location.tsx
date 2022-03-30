import React from "react";
import {
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

function Location() {
  const [select, setSelect] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

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
              lịch trong thời gian này. {""}
            </b>
            Sức khỏe và sự an toàn của cộng đồng luôn được đặt hàng đầu. Vì vậy,
            vui lòng làm theo chỉ thị của chính phủ bởi điều đó thực sự cần
            thiết.
          </p>
        </Box>
        <Box className="place">
          <Box>
            <h2>20 homestay tại Hà Nội</h2>
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
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Link to="/home/room">
                <Box className="img-location">
                  <img
                    src="https://cdn.luxstay.com/rooms/66652/large/69ad8ebe05e3fdbda4f2.jpg"
                    alt=""
                  />
                </Box>
              </Link>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/rooms/37700/large/IMG_2698.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>

          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/407757/BXSWxc8JJfPItWkkKpNpwqMf.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/354826/kV0JTJvfJaj8wTRMvSP9sIfD.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/37752/AQ6iIGB9J_kOuNEpqQuGV6Uk.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/351762/L571EGkJEWJBUqYaVNtZUTuF.JPG"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/181012/cAR4-3BFtYrAMAyoiYz-fkeI.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/37752/AQ6iIGB9J_kOuNEpqQuGV6Uk.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/351762/L571EGkJEWJBUqYaVNtZUTuF.JPG"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={3} sm={6} md={4} xs={12}>
            <Box className="Location">
              <Box className="img-location">
                <img
                  src="https://cdn.luxstay.com/users/181012/cAR4-3BFtYrAMAyoiYz-fkeI.jpg"
                  alt=""
                />
              </Box>
              <Box className="content-location">
                <span>Căn hộ dịch vụ - 1 phòng ngủ</span>
                <p>The Galaxy Home </p>
                <b>850,000đ/đêm</b>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default Location;
