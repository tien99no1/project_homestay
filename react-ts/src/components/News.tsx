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
import Footer from "./layout/Footer";

function News() {
  const [booking, setBooking] = useState<any[]>([]);
  const getListBooking = async () => {
    try {
      const hostId = localStorage.getItem("hostId");
      const data = await axios.get(`${CONFIG.ApiBookRoom}?hostId=${hostId}&status=0`);
      setBooking(data.data);
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    getListBooking();
  }, []);
  const handleAccept = (book: bookRoom, index: number) => {
    const { id } = book;
    const data = { ...book, isCheck: 1 };
    axios
      .put(`${CONFIG.ApiBookRoom}/${id}`, data)
      .then((result) => {
        const newBooking = [...booking];
        newBooking[index] = result.data;
        setBooking(newBooking);
      })
      .then((result) =>
        axios.patch(`${CONFIG.ApiRoom}/${book.roomId}`, { isCheckRoom: true })
      );
  };
  const handleRefuse = (book: bookRoom, index: number) => {
    const { id } = book;
    const data = { ...book, isCheck: 2 };
    axios.put(`${CONFIG.ApiBookRoom}/${id}`, data).then((result) => {
      const newBooking = [...booking];
      newBooking[index] = result.data;
      setBooking(newBooking);
    });
  };

  return (
    <>
      <Box
        maxWidth="xl"
        sx={{
          border: "1px solid #dae3dc",
          padding: "10px",
          borderRadius: "7px",
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
                        <>
                          <Button
                            size="small"
                            onClick={() => handleAccept(book, index)}
                          >
                            Cho thuê
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleRefuse(book, index)}
                          >
                            Từ chối
                          </Button>
                        </>
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
          <h4 className="center">Bạn chưa có đơn đặt chỗ nào</h4>
        )}
      </Box>
      <Footer/>
    </>
  );
}

export default News;
