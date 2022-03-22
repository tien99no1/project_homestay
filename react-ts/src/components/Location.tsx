import React from "react";
import { Container, Box, Button } from "@mui/material";

function Location() {
  return (
    <Container maxWidth="xl">
      <Box className="location-top">
        <Box>
          <Button>Hủy phòng linh hoạt</Button>
          <Button>Đặt phòng nhanh</Button>
          <Button>Khu vực</Button>
          <Button>Giá ưu đãi</Button>
          <Button>Loại phòng</Button>
        </Box>
        <Box>
          <p>
            <b>
              Trước khi đặt phòng, hãy kiểm tra những địa điểm bị hạn chế du
              lịch trong thời gian này.{" "}
            </b>
            Sức khỏe và sự an toàn của cộng đồng luôn được đặt hàng đầu. Vì vậy,
            vui lòng làm theo chỉ thị của chính phủ bởi điều đó thực sự cần
            thiết.
          </p>
        </Box>
        <Box>
            <Box><h2>20 homestay tại Hà Nội</h2></Box>
            <Box></Box>
        </Box>

      </Box>
    </Container>
  );
}
export default Location;
