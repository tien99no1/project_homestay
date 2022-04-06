import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import "../css/dashboard.css";
import { CONFIG } from "../config";
import axios from "axios";
import { room } from "../type";

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
function EditRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<room>();
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = React.useState<any>({});
  const params = useParams();
  const { id } = params;

  const loadRooms = () => {
    axios.get(`${CONFIG.ApiRoom}/${id}`).then((res) => {
      setRoomInfo(res.data);
    });
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const hostId = localStorage.getItem("hostId");
  const onSubmit = (data: room) => {
    axios
      .put(`${CONFIG.ApiRoom}/${id}`, { ...data, status: 0, isCheck: 0, hostId })
      .then((data) => {
        console.log("success", data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Box className="container-create">
      <Box style={{ position: "absolute", top: "20px" }} width={"100%"}>
        <Link to="/" className="brand br-m ">
          RikStay
        </Link>
      </Box>
      <Box className="create">
        <Box className="form-create">
          <h3 className="text-create">Chỉnh sửa chỗ nghỉ của bạn</h3>
          <form className="form-create-room" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              rowSpacing={0.1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Phân loại chỗ</h3>
                  <Box className="input-create-form">
                    <FormControl variant="outlined" sx={{ minWidth: 300 }}>
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
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Tên chỗ nghỉ"
                      variant="outlined"
                      {...register("roomName", {
                        required: true,
                        minLength: 2,
                      })}
                    />
                    {errors?.roomName?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomName?.type === "minLength" && (
                      <small>Tên chỗ nghỉ phải dài hơn 2 ký tự</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <FormControl variant="outlined" sx={{ minWidth: 300 }}>
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
                  <h3>Vị trí chỗ nghỉ, số khách</h3>
                  <Box className="input-create-form">
                    <FormControl variant="outlined" sx={{ minWidth: 300 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Chọn thành phố
                      </InputLabel>
                      <Select {...register("address", { required: true })}>
                        {optionsCity.map((optionCity, index) => {
                          return (
                            <MenuItem key={index} value={optionCity.value}>
                              {optionCity.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors?.address?.type === "required" && (
                        <small>Vui lòng chọn</small>
                      )}
                    </FormControl>
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Địa điểm cụ thể"
                      variant="outlined"
                      {...register("addressDetail", {
                        required: true,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    />
                    {errors?.addressDetail?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.addressDetail?.type === "pattern" && (
                      <small>
                        Địa điểm cụ thể phải là chữ cái và dài hơn 2 ký tự
                      </small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Số khách"
                      type="number"
                      variant="outlined"
                      {...register("customer", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors?.customer?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.customer?.type === "min" && (
                      <small>Số khách hàng phải hơn hoặc bằng 1</small>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Không gian</h3>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Diện tích chỗ nghỉ"
                      type="number"
                      variant="outlined"
                      {...register("roomAcreage", {
                        required: true,
                        min: 30,
                      })}
                    />
                    {errors?.roomAcreage?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomAcreage?.type === "min" && (
                      <small>Diện tích phải lớn hơn 30 m2</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Phòng ngủ"
                      type="number"
                      variant="outlined"
                      {...register("bedRoom", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors?.bedRoom?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.bedRoom?.type === "min" && (
                      <small>Số phòng ngủ phải lớn hơn hoặc bằng 1</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Giường ngủ"
                      type="number"
                      variant="outlined"
                      {...register("bed", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors?.bed?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.bed?.type === "min" && (
                      <small>
                        Giường ngủ phải có số lượng lớn hơn hoặc bằng 1
                      </small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Phòng tắm"
                      type="number"
                      variant="outlined"
                      {...register("bathRoom", {
                        required: true,
                        min: 1,
                      })}
                    />
                    {errors?.bathRoom?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.bathRoom?.type === "min" && (
                      <small>
                        Phòng tắm phải có số lượng lớn hơn hoặc bằng 1
                      </small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Phòng bếp"
                      type="number"
                      variant="outlined"
                      {...register("kitchen", {
                        required: true,
                        min: 1,
                      })}
                    />{" "}
                    <br />
                    {errors?.kitchen?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.kitchen?.type === "min" && (
                      <small>Phòng phải có số lượng lớn hơn hoặc bằng 1</small>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={3} sm={6}>
                <Box>
                  <h3>Giới thiệu, giá phòng</h3>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Tiêu đề"
                      variant="outlined"
                      {...register("title", {
                        required: true,
                        minLength: 2,
                      })}
                    />
                    {errors?.title?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.title?.type === "minLength" && (
                      <small>Tiêu đề phải dài hơn 2 ký tự</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Thông tin chỗ nghỉ"
                      variant="outlined"
                      {...register("info", {
                        required: true,
                        minLength: 2,
                      })}
                    />
                    {errors?.info?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.info?.type === "minLength" && (
                      <small>Tên chỗ nghỉ phải dài hơn 2 ký tự</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      label="Link ảnh"
                      variant="outlined"
                      {...register("roomImg", {
                        required: true,
                      })}
                    />
                    {errors?.roomImg?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                  </Box>
                  <Box className="input-create-form">
                    <TextField
                      sx={{ minWidth: 300 }}
                      type="number"
                      label="Giá phòng"
                      variant="outlined"
                      {...register("roomPrice", {
                        required: true,
                        min: 0,
                      })}
                    />
                    {errors?.roomPrice?.type === "required" && (
                      <small>Vui lòng nhập trường này</small>
                    )}
                    {errors?.roomPrice?.type === "min" && (
                      <small>Giá phòng lớn hơn hoặc bằng 0</small>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className="Box-btn-create">
              <Button className="btn-create-form" type="submit">
                Chỉnh sửa
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
export default EditRoom;
