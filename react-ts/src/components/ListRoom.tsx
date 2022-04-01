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
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { string } from "yup";
import React from "react";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const hostId = localStorage.getItem("hostId");

  const [listAllRoom, setListAllRoom] = useState<any[]>([]);
  const [searchRoomName, setSearchRoomName] = useState("");

  const getListroom = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiRoom}?hostId=${hostId}`);
      setListAllRoom(data.data);
    } catch (e) {}
  };
  
  useEffect(() => {
    getListroom();
  }, []);

  const handleClickDelete = async (id: number) => {
      try {const data = await axios.delete(`${CONFIG.ApiRoom}/${id}`);
      data ? alert("Xoá thành công") : alert("Xóa thất bại")
      getListroom()
    } catch (error) {
        console.log(error);
    }
  }
  console.log(listAllRoom)
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
                            ? "Đang chờ"
                            : item.status === 1
                            ? "Đã duyệt"
                            : "Từ chối"}
                        </TableCell>
                        <TableCell className="tbody" align="center">
                          <Box>
                            <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              Thiết lập
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
                              <MenuItem onClick={handleClose}>
                                Chỉnh sửa
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <button
                                  onClick={() => handleClickDelete(item.id)}
                                  className="btn-delete-room"
                                >
                                  Xóa chỗ ở
                                </button>
                              </MenuItem>
                            </Menu>
                          </Box>
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
    </div>
  );
}

export default ListRoom;
