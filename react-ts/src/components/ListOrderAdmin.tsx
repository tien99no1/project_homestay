import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import { CONFIG } from "../config";
import { bookRoom } from "../type";

function News() {
  const [booking, setBooking] = useState<any[]>([]);

  const getListBooking = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiBookRoom}?status=0`);
      setBooking(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListBooking();
  }, []);

  return (
    <>
      <Box
        maxWidth="lg"
        sx={{
          border: "1px solid #dae3dc",
          padding: "10px",
        }}
      >
        {booking.length > 0 ? (
          <div>
            {booking.map((book: bookRoom, index: number) => {
              return (
                <div key={book.id} className="div-card">
                  <Card sx={{ width: "100%", display: "flex" }}>
                    <CardMedia
                      component="img"
                      className="media-img"
                      image={book.roomImg}
                      alt="green iguana"
                    />
                    <CardContent className="content-dashboard">
                      <Typography gutterBottom variant="h5" component="div">
                        {book.roomName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tên khách hàng: {book.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ngày thuê: từ ngày {book.startDay} đến {book.endDay}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số khách: {book.totalCustomers}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {book.isCheck == 0 ? (
                        <p className="check-room load">Đang chờ duyệt</p>
                      ) : book.isCheck == 1 ? (
                        <p className="check-room">
                          Đã cho thuê
                        </p>
                      ) : (
                        <p className="check-room refuse">
                          Đã từ chối
                        </p>
                      )}
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <h4 className="center">Chỗ nghỉ của bạn đang trống</h4>
        )}
      </Box>
    </>
  );
}

export default News;
