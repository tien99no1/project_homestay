import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { Button } from "@mui/material";
import { CONFIG } from "../config";
import { bookRoom } from "../type";
import { Pagination, Stack } from "@mui/material";
// utils
// services function

function News() {
  const [booking, setBooking] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const indexOfLastBooking = currentPage * postPerPage;
  const indexOfFirstBooking = indexOfLastBooking - postPerPage;
  const currentBooking = booking.slice(indexOfFirstBooking, indexOfLastBooking);
  const pageNumbers = Math.ceil(booking.length / postPerPage);

  const paginate = (pageNumbers: any) => {
    setCurrentPage(pageNumbers);
  };

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
                          T??n kh??ch h??ng: {book.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ng??y thu??: t??? ng??y {book.startDay} ?????n {book.endDay}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          S??? kh??ch: {book.totalCustomers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          T???ng ti???n:
                          <NumberFormat
                            value={book.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"??"}
                          />
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {book.isCheck == 0 ? (
                          <p className="check-room load">??ang ch??? duy???t</p>
                        ) : book.isCheck == 1 ? (
                          <p className="check-room">???? cho thu??</p>
                        ) : (
                          <p className="check-room refuse">???? t??? ch???i</p>
                        )}
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
            </div>
            <Stack spacing={2} className="page">
              <Pagination
                count={pageNumbers}
                color="secondary"
                onChange={(e: any, page: number) => setCurrentPage(page)}
              />
            </Stack>
          </div>
        ) : (
          <h4 className="center">Ch??a c?? ????n ?????t ph??ng</h4>
        )}
      </Box>
    </>
  );
}

export default News;
