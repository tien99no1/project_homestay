import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../css/dashboard.css";

interface IFormInputs {
  roomType: string;
  roomName: string;
  roomCate: string;
  title: string;
  address: string;
  addressDetail: string;
  roomAcreage: string;
  roomPrice: string;
  info: string;
  bathRoom: number;
  bed: number;
  customer: string;
  kitchen: number;
  bedRoom: number;
  roomImg: string;
  status: true;
}

const optionsType = [
  { value: "", label: "Chọn chỗ nghỉ" },
  { value: "Homestay", label: "Homestay" },
  { value: "Nhà riêng", label: "Nhà riêng" },
  { value: "Biệt thự", label: "Biệt thự" },
  { value: "Chung cư", label: "Chung cư" },
  { value: "Studio", label: "Studio" },
  { value: "Căn hộ dịch vụ", label: "Căn hộ dịch vụ" },
];

const optionsCate = [
  { value: "Đặt phòng nhanh", label: "Đặt phòng nhanh" },
  { value: "Yêu cầu xác nhận", label: "Yêu cầu xác nhận" },
];

const optionsCity = [
  { value: "", label: "Chọn thành phố" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "TP. Hồ Chí Minh", label: "TP. Hồ Chí Minh" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  { value: "Hạ Long", label: "Hạ Long" },
  { value: "Hội An", label: "Hội An" },
  { value: "Vũng Tàu", label: "Vũng Tàu" },
  { value: "Nha Trang", label: "Hạ Long" },
];

function CreateRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box className="container-create">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand ">
          RikStay
        </Link>
      </Box>
      <Box className="create">
        <Box className="form-create">
          <h3 className="text-create">Tạo chỗ nghỉ mới</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={0.1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Phân loại chỗ</h3>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Chọn chỗ nghỉ
                      </InputLabel>
                      <Select {...register("roomType", { required: true })}>
                        {optionsType.map((optionType, index) => {
                          return (
                            <MenuItem key={index} value={optionType.value}>
                              {optionType.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomType?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 250 }}
                      label="Tên chỗ nghỉ"
                      variant="standard"
                      {...register("roomName", {
                        required: true,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    />
                    {errors?.roomName?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomName?.type === "pattern" && (
                      <small>
                        Tên chỗ nghỉ phải là chữ cái và dài hơn 2 ký tự
                      </small>
                    )}
                  </Box>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Loại đặt chỗ
                      </InputLabel>
                      <Select {...register("roomCate", { required: true })}>
                        {optionsCate.map((optionCate, index) => {
                          return (
                            <MenuItem key={index} value={optionCate.value}>
                              {optionCate.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomCate?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Vị trí chỗ nghỉ</h3>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Thành phố
                      </InputLabel>
                      <Select {...register("address", { required: true })}>
                        {optionsCity.map((optionCity, index) => {
                          return (
                            <option key={index} value={optionCity.value}>
                              {optionCity.label}
                            </option>
                          );
                        })}
                      </Select>
                      {errors?.address?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 250 }}
                      label="Tên chỗ nghỉ"
                      variant="standard"
                      {...register("roomName", {
                        required: true,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    />
                    {errors?.roomName?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomName?.type === "pattern" && (
                      <small>
                        Tên chỗ nghỉ phải là chữ cái và dài hơn 2 ký tự
                      </small>
                    )}
                  </Box>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Loại đặt chỗ
                      </InputLabel>
                      <Select {...register("roomCate", { required: true })}>
                        {optionsCate.map((optionCate, index) => {
                          return (
                            <MenuItem key={index} value={optionCate.value}>
                              {optionCate.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomCate?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Không gian</h3>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Chọn chỗ nghỉ
                      </InputLabel>
                      <Select {...register("roomType", { required: true })}>
                        {optionsType.map((optionType, index) => {
                          return (
                            <MenuItem key={index} value={optionType.value}>
                              {optionType.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomType?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 250 }}
                      label="Tên chỗ nghỉ"
                      variant="standard"
                      {...register("roomName", {
                        required: true,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    />
                    {errors?.roomName?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomName?.type === "pattern" && (
                      <small>
                        Tên chỗ nghỉ phải là chữ cái và dài hơn 2 ký tự
                      </small>
                    )}
                  </Box>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Loại đặt chỗ
                      </InputLabel>
                      <Select {...register("roomCate", { required: true })}>
                        {optionsCate.map((optionCate, index) => {
                          return (
                            <MenuItem key={index} value={optionCate.value}>
                              {optionCate.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomCate?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Giới thiệu</h3>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Chọn chỗ nghỉ
                      </InputLabel>
                      <Select {...register("roomType", { required: true })}>
                        {optionsType.map((optionType, index) => {
                          return (
                            <MenuItem key={index} value={optionType.value}>
                              {optionType.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomType?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      sx={{ minWidth: 250 }}
                      label="Tên chỗ nghỉ"
                      variant="standard"
                      {...register("roomName", {
                        required: true,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    />
                    {errors?.roomName?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomName?.type === "pattern" && (
                      <small>
                        Tên chỗ nghỉ phải là chữ cái và dài hơn 2 ký tự
                      </small>
                    )}
                  </Box>
                  <Box>
                    <FormControl variant="standard" sx={{ minWidth: 250 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Loại đặt chỗ
                      </InputLabel>
                      <Select {...register("roomCate", { required: true })}>
                        {optionsCate.map((optionCate, index) => {
                          return (
                            <MenuItem key={index} value={optionCate.value}>
                              {optionCate.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.roomCate?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box></Box>
            <Box>
              <input
                className="input-sign"
                {...register("addressDetail", {
                  required: true,
                  maxLength: 300,
                  pattern:
                    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                })}
              />
              {errors?.addressDetail?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.addressDetail?.type === "maxLength" && (
                <small>Địa chỉ cụ thể không được vượt quá 300 ký tự</small>
              )}
              {errors?.addressDetail?.type === "pattern" && (
                <small>Địa chỉ cụ thể phải là chữ cái và dài hơn 2 ký tự</small>
              )}
            </Box>
            <Box>
              <input
                className="input-sign"
                {...register("title", {
                  required: true,
                  maxLength: 300,
                  pattern:
                    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                })}
              />
              {errors?.title?.type === "required" && (
                <small>Vui lòng nhập trường này</small>
              )}
              {errors?.title?.type === "maxLength" && (
                <small>Title không được vượt quá 300 ký tự</small>
              )}
              {errors?.title?.type === "pattern" && (
                <small>Tiêu đề phải là chữ cái và dài hơn 2 ký tự</small>
              )}
            </Box>

            <Button className="btn-create-form" type="submit">
              Tạo phòng
            </Button>
            <br />
          </form>
        </Box>
      </Box>
    </Box>
  );
}
export default CreateRoom;
