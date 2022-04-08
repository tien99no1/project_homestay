import Table from "@mui/material/Table";
import { useForm } from "react-hook-form";
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
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { removeUser } from "../services/userService";
import { user } from "../type";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListUser() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    formState: { errors },
  } = useForm<user>();

  const [listUsers, setListUsers] = useState<any[]>([]);
  const getListUsers = async () => {
    try {
      const data = await axios.get(`${CONFIG.ApiUser}`);
      setListUsers(data.data);
    } catch (e) {}
  };

  useEffect(() => {
    getListUsers();
  }, []);
  const handleEdit = (item: user, index: number) => {
    const { id } = item;
    console.log("first", item)
    setOpen(true);
    axios.get(`${CONFIG.ApiUser}/${id}`)
    .then((result) => {
      console.log("result", result.data);
    });
  };
  const onSubmit = (id: number) => {
    axios
      .put(`${CONFIG.ApiUser}/${id}`)
      .then((data) => {
        console.log("success");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const handleClickDelete = (id: number) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      removeUser(id)
        .then((res) => {
          getListUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {listUsers.length > 0 ? (
        <div className="row">
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Tên khách hàng
                  </StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">
                    Số điện thoại
                  </StyledTableCell>
                  <StyledTableCell align="center">Hành động</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUsers.map((item: user, index: number) => {
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
                      <TableCell className="img-table" align="center">
                        <p>
                          {item.firstName} {item.lastName}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{item.email}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{item.phone}</p>
                      </TableCell>
                      <TableCell align="center">
                        {/* <Link to={`/adminPage/${item.id}`}> */}
                        <Button
                          title="Chỉnh sửa"
                          onClick={() => handleEdit(item, index)}
                        >
                          <ModeEditOutlineOutlinedIcon color="warning" />
                        </Button>
                        {/* </Link> */}
                        <Dialog
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {"Chỉnh sửa thông tin người dùng"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText width={"500px"}>
                              <form >
                                <div className="name-edit">
                                  <TextField
                                    className="edit-name"
                                    label="Họ và tên đệm"
                                    variant="outlined"
                                    {...register("firstName", {
                                      required: true,
                                      maxLength: 80,
                                      pattern:
                                        /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                                    })}
                                  />
                                  {errors?.firstName?.type === "required" && (
                                    <small>Vui lòng nhập trường này</small>
                                  )}
                                  {errors?.firstName?.type === "maxLength" && (
                                    <small>
                                      Họ và tên đệm không được vượt quá 80 ký tự
                                    </small>
                                  )}
                                  {errors?.firstName?.type === "pattern" && (
                                    <small>
                                      Họ và tên đệm phải là chữ cái và dài hơn 2
                                      ký tự
                                    </small>
                                  )}
                                  <TextField
                                    className="edit-name"
                                    label="Tên"
                                    variant="outlined"
                                    {...register("lastName", {
                                      required: true,
                                      maxLength: 100,
                                      pattern:
                                        /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                                    })}
                                  />
                                  {errors?.lastName?.type === "required" && (
                                    <small>Vui lòng nhập trường này</small>
                                  )}
                                  {errors?.lastName?.type === "maxLength" && (
                                    <small>
                                      Tên không được vượt quá 100 ký tự
                                    </small>
                                  )}
                                  {errors?.lastName?.type === "pattern" && (
                                    <small>
                                      Tên phải là chữ cái và dài hơn 2 ký tự
                                    </small>
                                  )}
                                </div>
                                <TextField
                                  className="edit-user"
                                  label="Email"
                                  variant="outlined"
                                  {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                  })}
                                />
                                {errors?.email?.type === "required" && (
                                  <small>Vui lòng nhập trường này</small>
                                )}
                                {errors?.email?.type === "pattern" && (
                                  <small>Email không hợp lệ</small>
                                )}
                                <TextField
                                  className="edit-user"
                                  label="Số điện thoại"
                                  variant="outlined"
                                  {...register("phone", {
                                    required: true,
                                    pattern:
                                      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                                  })}
                                />
                                {errors?.phone?.type === "required" && (
                                  <small>Vui lòng nhập trường này</small>
                                )}
                                {errors?.phone?.type === "pattern" && (
                                  <small>Số điện thoại không hợp lệ</small>
                                )}
                                <TextField
                                  className="edit-user"
                                  label="Mật khẩu"
                                  variant="outlined"
                                  type="password"
                                  {...register("password", {
                                    required: true,
                                    pattern:
                                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                                  })}
                                />
                                {errors?.password?.type === "required" && (
                                  <small>Vui lòng nhập trường này</small>
                                )}
                                {errors?.password?.type === "pattern" && (
                                  <small>
                                    Vui lòng nhập mật khẩu ít nhất 8 ký tự, bao
                                    gồm chữ cái và số
                                  </small>
                                )}
                                <Button
                                  type="submit"
                                  autoFocus
                                  className="btn-edit-user"
                                  onClick={() => onSubmit(item.id)}
                                >
                                  Chỉnh sửa
                                </Button>
                              </form>
                            </DialogContentText>
                          </DialogContent>
                          <Button autoFocus onClick={handleClose} color="info">
                            Hủy
                          </Button>
                        </Dialog>
                        <Button
                          title="Xóa tài khoản"
                          onClick={() => handleClickDelete(item.id)}
                        >
                          <DeleteOutlineOutlinedIcon color="error" />
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h4>Chưa có người dùng</h4>
      )}
    </div>
  );
}

export default ListUser;
