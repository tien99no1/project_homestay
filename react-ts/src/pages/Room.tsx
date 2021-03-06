import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BlenderIcon from "@mui/icons-material/Blender";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import GarageIcon from "@mui/icons-material/Garage";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import BannerRoom from "../components/BannerRoom";
import { CONFIG } from "../config";
import Noti from "../components/Noti";
import Map from "../components/Map";
import { room } from "../type";

interface IFormInputs {
  name: string;
  phone: string;
}

function Room() {
  const [roomInfo, setRoomInfo] = useState<room>();
  const [showNoti, setShowNoti] = useState(false);
  const [payloadNoti, setPayloadNoti] = useState({
    status: "success",
    text: "",
  });
  const [valueDate, setValueDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const minValue: Date = new Date(new Date());
  const maxValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    90
  );

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    axios.get(`${CONFIG.ApiRoom}/${id}`).then((res) => {
      setRoomInfo(res.data)
    }).catch((error) => {
      console.log("error", error)
    })
  },[id])
  const userId = localStorage.getItem("userId");
  const userName = useSelector((state: any) => state.user.lastName);
  const hostId = roomInfo?.hostId;
  const [children, setChildren] = React.useState<number | string>("");
  const [alduts, setAdults] = React.useState<number | string>("");

  const roomId = roomInfo?.id;
  const roomName = roomInfo?.roomName;
  const roomImg = roomInfo?.roomImg;
  const roomAddress = roomInfo?.address;
  const roomAddressDetail = roomInfo?.addressDetail;
  const customer = Number(roomInfo?.customer);
  const sDay = moment(valueDate[0]);
  const eDay = moment(valueDate[1]);
  const totalDays = eDay.diff(sDay, "days");
  const totalPrice = totalDays * Number(roomInfo?.roomPrice);
  //advise
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const totalCustomers: number = Number(children) + Number(alduts);
  const onSubmit = (data: IFormInputs) => {
    sessionStorage.setItem("advide", JSON.stringify(data));
    setPayloadNoti({
      status: "success",
      text: "Th??nh c??ng",
    });
    setShowNoti(true);
    return data;
  };
  //post
  const navigate = useNavigate();
  const bookRoom = () => {
    if (!userId) {
      navigate("/login");
    } else {
      const dataBooking = {
        roomId,
        userName,
        hostId,
        userId,
        totalCustomers,
        roomName,
        roomAddress,
        roomAddressDetail,
        roomImg,
        alduts,
        totalPrice,
        children,
        startDay: moment(valueDate[0]).format("DD/MM/YYYY"),
        endDay: moment(valueDate[1]).format("DD/MM/YYYY"),
        isCheck: 0,
        status: 0,
      };
      if (
        !dataBooking.startDay ||
        !dataBooking.endDay ||
        dataBooking.totalCustomers === 0
      ) {
        setPayloadNoti({
          status: "error",
          text: "Vui l??ng ??i???n v??o ch??? tr???ng",
        });
        setShowNoti(true);
      } else if (dataBooking.totalCustomers > customer + 1) {
        setPayloadNoti({
          status: "error",
          text: "B???n ???? ch???n qu?? s??? kh??ch cho ph??p",
        });
        setShowNoti(true);
      } else {
        axios
          .post(`${CONFIG.ApiBookRoom}`, dataBooking)
          .then((dataBooking) => {
            setValueDate([null, null]);
            navigate("/home/profile");
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    }
  };
  return (
    <>
      <Box>
        <BannerRoom />
      </Box>
      <Container maxWidth="lg">
        <div className="container-room">
          <Box className="room-left">
            <Box display={"flex"}>
              <p className="mr">Rikstay</p>
              <p className="mr">Vietnam</p>
              <p className="mr">{roomInfo?.address}</p>
              <p className="mr">{roomInfo?.addressDetail}</p>
            </Box>
            <Box>
              <h3>{roomInfo?.title}</h3>
              <p className="phone margin-icon">
                <LocationOnIcon />
                <b>
                  {roomInfo?.addressDetail}, {roomInfo?.address}, Vi???t Nam
                </b>
                <a style={{ marginLeft: "1rem", color: "#b71c1c" }} href="#map">
                  Xem b???n ?????
                </a>
              </p>
              <p className="phone margin-icon">
                <ApartmentOutlinedIcon />
                <b>{roomInfo?.roomType} -</b> <span>{roomInfo?.roomAcreage} m<sup>2</sup></span>
              </p>
              <p>
                Ph??ng ri??ng ?? {roomInfo?.bathRoom} Ph??ng t???m ?? {roomInfo?.bed}
                gi?????ng ?? {roomInfo?.bedRoom} ph??ng ng??? ?? {roomInfo?.customer} {""}
                kh??ch (t???i ??a {Number(roomInfo?.customer) + 1} kh??ch)
              </p>
              <p>{roomInfo?.info}</p>
            </Box>
            <br />
            <Box>
              <h4>Ti???n nghi ch??? ???</h4>
              <p>Gi???i thi???u v??? c??c ti???n nghi v?? d???ch v??? t???i n??i c?? tr??</p>
            </Box>
            <Box>
              <h4>Ti???n ??ch</h4>
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
                    <span>M??y say sinh t???</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <KitchenIcon />
                    <span>T??? l???nh</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <MicrowaveIcon />
                    <span>L?? vi s??ng</span>
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p className="phone">
                    <GarageIcon />
                    <span>Ch??? ????? xe</span>
                  </p>
                </Grid>
              </Grid>
              <p>V?? c??n nhi???u ti???n ??ch kh??c, ?????t ph??ng ngay ????? tr???i nghi???m</p>
            </Box>
            <br />
            <Box>
              <h4>N???i quy v?? ch??nh s??ch v??? ch??? ???</h4>
              <h5>Ch??nh s??ch h???y ph??ng</h5>
              <p>
                Nghi??m ng???t: Ho??n l???i 50% gi?? tr??? ?????t ph??ng khi kh??ch h??ng hu???
                ph??ng trong v??ng 48h sau khi ?????t ph??ng th??nh c??ng v?? tr?????c 14
                ng??y so v???i th???i gian check-in. Sau ????, h???y ph??ng tr?????c 14 ng??y
                so v???i th???i gian check-in, ???????c ho??n l???i 50% t???ng s??? ti???n ???? tr???
                (tr??? ph?? d???ch v???).
              </p>
              <div id="map">
                <Map lat={roomInfo?.lat} lng={roomInfo?.lng}/>
              </div>
              <p>
                B???n s??? nh???n ???????c ?????a ch??? ch??nh x??c c???a ch??? ??? sau khi ho??n t???t
                ????n ?????t ph??ng.
              </p>
            </Box>
            <div className="text-order">
              <h4>?????t ph??ng ngay!!</h4> <br />
            </div>
          </Box>
          <Box className="room-right">
            <Box>
              <Box className="order">
                <Box>
                  <p className="price-room">
                    <span className="price">
                      <NumberFormat
                        value={roomInfo?.roomPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"???"}
                      />
                    </span>
                    /????m
                  </p>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      startText="Check-in"
                      endText="Check-out"
                      minDate={minValue}
                      maxDate={maxValue}
                      value={valueDate}
                      disableMaskedInput
                      onChange={(newValue) => {
                        setValueDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <Box className="input-date">
                          <TextField
                            sx={{
                              width: "37%",
                              mb: "1rem",
                              mt: "1rem",
                            }}
                            {...startProps}
                          />
                          <Box sx={{ margin: "2rem 1rem 0 1rem" }}> ?????n </Box>
                          <TextField
                            sx={{
                              width: "37%",
                              mb: "1rem",
                              mt: "1rem",
                            }}
                            {...endProps}
                          />
                        </Box>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Button
                    className="person"
                    disabled={true}
                    sx={{ m: "0.5rem 1.5rem 1rem 1.9rem" }}
                  >
                    S??? l?????ng kh??ch: {totalCustomers}
                  </Button>
                  <Box
                    className="number-person"
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: "0.5rem 1.5rem 0.3rem 1.9rem",
                        width: "87%",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-disabled"
                      label="Ng?????i l???n"
                      type="number"
                      onChange={(e) => setAdults(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0, max: 100 },
                      }}
                    />
                    <TextField
                      id="outlined-number"
                      label="Tr??? em"
                      type="number"
                      onChange={(e) => setChildren(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </Box>
                </Box>
                <Box className="box-person"
                >
                  <Button className="order-now" onClick={bookRoom}>
                    ?????t ngay
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="advise">
              {sessionStorage.getItem("advide") ? (
                <>
                  <Box padding={"10px 20px 0 20px"}>
                    <h4>T?? v???n t??? Rikstay</h4>
                    <p style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
                      C???m ??n b???n ???? quan t??m! Rikstay s??? li??n h??? t?? v???n d???ch v???
                      trong th???i gian s???m nh???t.
                    </p>
                  </Box>
                </>
              ) : (
                <>
                  <Box padding={"10px 20px 0 20px"}>
                    <h4>T?? v???n t??? Rikstay</h4>
                    <p style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
                      Vui l??ng cung c???p t??n v?? s??? ??i???n tho???i ????? nh???n ???????c t?? v???n
                      t??? Luxstay cho chuy???n ??i c???a b???n.
                    </p>
                  </Box>
                  <Box className="form-advise">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box className="text-advise">
                        <TextField
                          className="input-advise"
                          label="Nh???p t??n"
                          variant="outlined"
                          {...register("name", {
                            required: true,
                            maxLength: 80,
                            pattern:
                              /^[A-Za-z???????????????????????????????????????????????????????????????????????????????????????????-??? ]{2,}$/g,
                          })}
                        />
                        <br />
                        {errors?.name?.type === "required" && (
                          <small>Vui l??ng nh???p t??n</small>
                        )}
                        {errors?.name?.type === "pattern" && (
                          <small>T??n kh??ng h???p l???</small>
                        )}
                      </Box>
                      <Box className="text-advise">
                        <TextField
                          className="input-advise"
                          label="S??? ??i???n tho???i"
                          variant="outlined"
                          type={"phone"}
                          {...register("phone", {
                            required: true,
                            pattern: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/i,
                          })}
                        />
                        <br />
                        {errors?.phone?.type === "required" && (
                          <small>Vui l??ng nh???p s??? ??i???n tho???i</small>
                        )}
                        {errors?.phone?.type === "pattern" && (
                          <small>S??? ??i???n tho???i kh??ng h???p l???</small>
                        )}
                      </Box>
                      <Button className="btn-advise" type="submit">
                        Nh???n t?? v???n mi???n ph??
                      </Button>
                      <Button className="phone-advise">
                        <span style={{ fontSize: "0.7rem" }}>
                          G???i 18006586 (mi???n ph??) ????? ???????c h??? tr???.
                        </span>
                      </Button>
                    </form>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </div>
      </Container>
      <Noti
        payload={payloadNoti}
        showNoti={showNoti}
        setShowNoti={setShowNoti}
      />
    </>
  );
}

export default Room;
