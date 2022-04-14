import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { CONFIG } from "../config";
import { Box, Button, TextField, Typography } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React from "react";
import { Link } from "react-router-dom";
import { useConfirm } from 'material-ui-confirm';
import { removeRoom } from "../services/roomService";
import Footer from "./layout/Footer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListRoom() {
  const [listAllRoom, setListAllRoom] = useState<any[]>([]);
  const [searchRoomName, setSearchRoomName] = useState("");
  
  const getListroom = async () => {
    try {
      const hostId = localStorage.getItem("hostId");
      const data = await axios.get(`${CONFIG.ApiRoom}?hostId=${hostId}`);
      setListAllRoom(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListroom();
    
  }, []);
  const confirm = useConfirm();
  const handleClickDelete = (id: number) => {
    confirm({ description: `Bạn chắc chắn muốn xóa?` })
    .then(() => removeRoom(id)
      .then((res) => {
        getListroom();
      }))
      .catch(() => console.log("Deletion cancelled."));
  };
  return (
    <div>
      {listAllRoom.length > 0 ? (
        <div className="row">
          <Typography variant="h5" sx={{ fontWeight: "600", m: "1rem 0" }}>
            Danh sách chỗ nghỉ
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": { margin: "1rem 0", width: "25ch" },
            }}
          >
            <div>
              <TextField
                label="Tìm kiếm theo tên chỗ nghỉ"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setSearchRoomName(e.target.value)}
              />
            </div>
          </Box>
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="tbody" align="center">
                    ID
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Tên chỗ nghỉ
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Loại đặt phòng
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Địa điểm
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Đã thuê
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Trạng thái
                  </StyledTableCell>
                  <StyledTableCell className="tbody" align="center">
                    Hành động
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAllRoom
                  .filter((value) => {
                    if (searchRoomName == "") {
                      return value;
                    } else if (
                      value.roomName
                        .toLowerCase()
                        .includes(searchRoomName.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((item, index) => {
                    return (
                      <StyledTableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="name tbody" align="center">
                          <p>{item.id}</p>
                        </TableCell>
                        <TableCell className="tbody" align="center">
                          <div style={{ width: "100px" }}>
                            <img
                              className="img-list-room"
                              src={item.roomImg}
                              alt=""
                            />
                            <span>{item.roomName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="tbody" align="center">
                          <p>{item.roomCate}</p>
                        </TableCell>
                        <TableCell className="tbody" align="center">
                          <p>
                            {item.addressDetail} - {item.address}
                          </p>
                        </TableCell>
                        <TableCell
                          className="status tbody"
                          style={{
                            color: `${
                              item.isCheckRoom === true ? "green" : "orange"
                            }`,
                          }}
                          align="center"
                        >
                          {item.isCheckRoom === true ? "Đã thuê" : "Chưa thuê"}
                        </TableCell>
                        <TableCell
                          className="status tbody"
                          style={{
                            color: `${
                              item.status === 0
                                ? "orange"
                                : item.status === 1
                                ? "green"
                                : "red"
                            }`,
                          }}
                          align="center"
                        >
                          {item.status === 0
                            ? "Chờ duyệt"
                            : item.status === 1
                            ? "Hoạt động"
                            : "Từ chối"}
                        </TableCell>
                        <TableCell className="tbody" align="center">
                          {item.isCheckRoom === false ? (
                            <Box>
                              <Link
                                className="link-edit"
                                to={`/editroom/${item.id}`}
                              >
                                <Button title="Chỉnh sửa">
                                  <ModeEditOutlineOutlinedIcon color="info" />
                                </Button>
                              </Link>
                              <Button
                                onClick={() => handleClickDelete(item.id)}
                                title="Xóa"
                              >
                                <DeleteOutlineOutlinedIcon color="error" />
                              </Button>
                            </Box>
                          ) : (
                            <Box>
                              <Button disabled title="Chỉnh sửa">
                                <ModeEditOutlineOutlinedIcon />
                              </Button>
                              <Button disabled title="Xóa">
                                <DeleteOutlineOutlinedIcon  />
                              </Button>
                            </Box>
                          )}
                        </TableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h4 className="center">Chỗ nghỉ của bạn đang trống</h4>
      )}
      <Footer/>
    </div>
  );
}

export default ListRoom;
