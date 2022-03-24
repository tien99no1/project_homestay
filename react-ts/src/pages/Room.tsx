import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import React from "react";
import BannerRoom from "../components/BannerRoom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BlenderIcon from "@mui/icons-material/Blender";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import GarageIcon from "@mui/icons-material/Garage";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import BasicDateRangePicker from "../components/DatePick";
import { useForm } from "react-hook-form";

interface IFormInputs {
  name: string;
  phone: string;
}

function Room() {
  //dialog
  const [open, setOpen] = React.useState(false);
  const [children, setChildren] = React.useState<number | string>("");
  const [aldut, setAdult] = React.useState<number | string>("");

  const handleAdultChange = (event: SelectChangeEvent<typeof aldut>) => {
    setAdult(Number(event.target.value));
  };

  const handleChildrenChange = (event: SelectChangeEvent<typeof children>) => {
    setChildren(Number(event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  //advise

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    console.log(data)
    return data;
  };
  return (
    <>
      <Box>
        <BannerRoom />
      </Box>
      <Container maxWidth="lg">
        <Box
          display="flex"
          position={"relative"}
        >
          <Box className="room-left">
            <Box display={"flex"}>
              <p className="mr">Rikstay</p>
              <p className="mr">Vietnam</p>
              <p className="mr">Ha Noi</p>
              <p className="mr">Tay Ho</p>
            </Box>
            <Box>
              <h2>Hanoi Home 3 - Beautiful apartment</h2>
              <p className="phone margin-icon">
                <LocationOnIcon /> <b>Tây Hồ, Hà Nội, Việt Nam</b>{" "}
                <a style={{ marginLeft: "1rem", color: "#b71c1c" }} href="#map">
                  Xem bản đồ
                </a>
              </p>
              <p className="phone margin-icon">
                <ApartmentOutlinedIcon />
                <b>Căn hộ dịch vụ · </b>45 m<sup>2</sup>
              </p>
              <p>
                Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách
                (tối đa 2 khách)
              </p>
              <br />
              <p>
                Căn hộ nằm ở một vị trí lý tưởng, nơi này là một con phố đông
                đúc của cộng đồng nước ngoài. Có rất nhiều nhà hàng, quán bar,
                quán cà phê, phòng tập thể dục, tất cả đều được làm cho người
                nước ngoài.
              </p>
              <p>
                Khu vực xung quanh có nhiều cảnh quan đẹp như Hồ Kiếm, Hồ Trúc
                Bạch, Chùa Quán Thành, Sông Hồng, Làng hoa Quang An, Làng hoa
                Nhật Tân và đặc biệt là Hồ Tây rộng lớn, rộng lớn, nơi bạn có
                thể đi xe đạp ( miễn phí) quanh Hồ và uống cà phê dọc đường.
              </p>
            </Box>
            <Box>
              <h3>Tiện nghi chỗ ở</h3>
              <p>Giới thiệu về các tiện nghi và dịch vụ tại nơi cư trú</p>
            </Box>
            <Box>
              <h4>Tiện ích</h4>
              <Grid
                container
                rowSpacing={0.1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <p className="phone">
                    <SignalWifi0BarIcon />
                    <span>Wifi</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <TvIcon />
                    <span>TV</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <BlenderIcon />
                    <span>Máy say sinh tố</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <KitchenIcon />
                    <span>Tủ lạnh</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <MicrowaveIcon />
                    <span>Lò vi sóng</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <GarageIcon />
                    <span>Chỗ để xe</span>
                  </p>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <h3>Nội quy và chính sách về chỗ ở</h3>
              <h4>Chính sách hủy phòng</h4>
              <p>
                Nghiêm ngặt: Hoàn lại 50% giá trị đặt phòng khi khách hàng huỷ
                phòng trong vòng 48h sau khi đặt phòng thành công và trước 14
                ngày so với thời gian check-in. Sau đó, hủy phòng trước 14 ngày
                so với thời gian check-in, được hoàn lại 50% tổng số tiền đã trả
                (trừ phí dịch vụ).{" "}
              </p>
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29784.686790216147!2d105.80322495877292!3d21.069233149094593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aae54053e2d5%3A0x2d72b1d7c422234b!2zVMOieSBI4buTLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1648091396913!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
              <p>
                Bạn sẽ nhận được địa chỉ chính xác của chỗ ở sau khi hoàn tất
                đơn đặt phòng.
              </p>
            </Box>
          </Box>
          <Box className="room-right" paddingTop={"4rem"} width={"65%"}>
            <Box>
              <Box className="order">
                <Box>
                  <p style={{ marginLeft: "1rem" }}>
                    <span style={{ fontSize: "1.7rem", fontWeight: "600" }}>
                      690,000đ
                    </span>
                    /đêm
                  </p>
                </Box>

                <Box>
                  <BasicDateRangePicker />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    className="person"
                    onClick={handleClickOpen}
                    sx={{ m: "1rem" }}
                  >
                    Số lượng khách
                  </Button>
                  <Dialog
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
                  >
                    <DialogTitle>Vui lòng nhập số lượng</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-disabled"
                          label="Người lớn"
                          type="number"
                          onChange={() => handleAdultChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { min: 0, max: 100 },
                          }}
                        />
                        <TextField
                          id="outlined-number"
                          label="Trẻ em"
                          type="number"
                          onChange={() => handleChildrenChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                        />
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button sx={{ color: "#000" }} onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button sx={{ color: "#000" }} onClick={handleClose}>
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button className="order-now">Đặt ngay</Button>
                </Box>
              </Box>
            </Box>
            <Box className="advise">
              <Box padding={'0 20px 0 20px'}>
                <h4>Tư vấn từ Rikstay</h4>
                <p style={{ fontSize: "0.8rem", marginTop: "-10px" }}>
                  Vui lòng cung cấp tên và số điện thoại để nhận được tư vấn từ
                  Luxstay cho chuyến đi của bạn.
                </p>
              </Box>
              <Box className="form-advise">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box className="text-advise">
                    <TextField
                      className="input-advise"
                      label="Nhập tên"
                      variant="outlined"
                      {...register("name", {
                        required: true,
                        maxLength: 80,
                        pattern:
                          /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]{2,}$/g,
                      })}
                    /> <br />
                    {errors?.name?.type === "required" && (
                      <small>Vui lòng nhập tên</small>
                    )}
                    {errors?.name?.type === "pattern" && (
                      <small>Tên không hợp lệ</small>
                    )}
                  </Box>
                  <Box className="text-advise">
                    <TextField
                      className="input-advise"
                      label="Số điện thoại"
                      variant="outlined"
                      type={"phone"}
                      {...register("phone", {
                        required: true,
                        pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                      })}
                    /> <br />
                    {errors?.phone?.type === "required" && (
                      <small>Vui lòng nhập số điện thoại</small>
                    )}
                    {errors?.phone?.type === "pattern" && (
                      <small>Số điện thoại không hợp lệ</small>
                    )}
                  </Box>
                  <Button className="btn-advise" type="submit">
                    Nhận tư vấn miễn phí
                  </Button>
                  <Button className="phone-advise">
                  <span style={{fontSize:'0.7rem'}}>Gọi 18006586 (miễn phí) để được hỗ trợ.</span> 
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Room;
