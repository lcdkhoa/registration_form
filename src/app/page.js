"use client";
import { Fab, GlobalStyles } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  classTable,
  initialFormData,
  MAX_DATE,
  MIN_DATE,
} from "@/app/constants";
import { theme } from "@/styles/theme";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

import {
  LocalizationProvider,
  viVN,
} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Loading from "@/components/loading";
import Success from "@/components/success";
import Fail from "@/components/fail";
import "dayjs/locale/vi";

dayjs.locale("vi");

const CustomGlobalStyles = () => (
  <GlobalStyles
    styles={{
      ".MuiDayCalendar-weekDayLabel": {
        visibility: "hidden",
        position: "relative",
      },
      ".MuiDayCalendar-weekDayLabel::after": {
        content: "attr(aria-label)",
        visibility: "visible",
        position: "absolute",
      },
      // Apply the custom labels
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ hai"]::after': {
        content: '"T2"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ ba"]::after': {
        content: '"T3"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ tư"]::after': {
        content: '"T4"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ năm"]::after': {
        content: '"T5"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ sáu"]::after': {
        content: '"T6"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="thứ bảy"]::after': {
        content: '"T7"',
      },
      '.MuiDayCalendar-weekDayLabel[aria-label="chủ nhật"]::after': {
        content: '"CN"',
      },
    }}
  />
);

const App = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [classInformation, setClassInformation] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [user, setUser] = useState("");

  const formRef = useRef(null);
  const isMobileDevice = useMediaQuery({ maxWidth: 900 });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    const className = e.target.name;
    const classInfo = classTable.find((item) => item.class === e.target.value);
    setClassInformation(classInfo?.classInformation || []);
    className === "class" // TODOS: Reset form data when class is changed
      ? setFormData({
          ...formData,
          ...{
            className: "",
            classTime: "",
            classSchedule: "",
            fee: "0đ",
            classStartDate: "",
            classDuration: "",
          },
          class: e.target.value,
        })
      : setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
  };

  const handleSelectChange = (e) => {
    const classInfo = classInformation.find(
      (item) => item.className === e.target.value
    );
    Object.entries(classInfo).forEach(([key, value]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setOpenFail(true);
        throw new Error("Network response was not ok");
      }

      await generatePDF();
      setOpen(false);
      setOpenSuccess(true);
      setUser(formData.fullName);
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const generatePDF = async () => {
    // const formElement = formRef.current;
    const formElement = document.getElementById("main");

    // Capture the form using html2canvas
    const canvas = await html2canvas(formElement, { scale: 1 });
    const imgData = canvas.toDataURL("image/png");

    // const imgWidth = canvas.width / 2;
    // const imgHeight = canvas.height / 2;

    // Create a new jsPDF document with custom dimensions
    // const pdf = new jsPDF({
    //   orientation: "p",
    //   unit: "px",
    //   format: [imgWidth, imgHeight],
    // });

    // // Add the image to the PDF
    // pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // pdf.save("form-data.pdf");
    const name = formData.fullName.replace(/\s/g, "").toLowerCase();
    const className = formData.className.replace(/\s/g, "_").toLowerCase();
    const today = dayjs().format("DDMMYYYY");
    const fileName = `${name}_${className}_${today}`;

    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = imgData;
    link.click();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Grid
            container
            item
            direction={"column"}
            id="main"
            style={{ padding: "20px" }}
          >
            <Grid
              id="header"
              item
              container
              xs={12}
              style={{
                marginTop: "-70px",
                paddingBottom: "20px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12}>
                <Image
                  src="/images/parent-form/logo.png"
                  alt="Minh Anh Logo"
                  height={300}
                  width={300}
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: "-80px" }}>
                <Typography variant="caption1" fontWeight={600}>
                  Hotline/ Zalo: 094 510 71 10 <br />
                  Đường Lê Thanh Nghị, tổ 2, khu 6 - Huyện Côn Đảo, tỉnh Bà Rịa
                  - Vũng Tàu
                </Typography>
              </Grid>
            </Grid>

            <Grid item container xs={12} id="title">
              <Grid
                item
                container
                justifyContent={"center"}
                xs={12}
                textAlign={"center"}
              >
                <Typography variant={isMobileDevice ? "h4" : "h3"}>
                  PHIẾU GHI DANH (Application form)
                </Typography>
              </Grid>

              <Grid item container justifyContent={"center"} xs={12}>
                <Typography
                  variant={isMobileDevice ? "subtitle2" : "subtitle1"}
                >
                  Năm học: 2024 - 2025 (School year)
                </Typography>
              </Grid>
            </Grid>

            <Grid item container xs={12} id="part-i" paddingTop={"20px"}>
              <Typography
                variant={isMobileDevice ? "h7" : "h6"}
                fontWeight={700}
              >
                I. Thông tin học viên (Student&apos;s information)
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                label="Tên học viên / Student's full name"
                margin="normal"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                error={formData.fullName === ""}
                helperText={
                  formData.fullName === "" &&
                  "Vui lòng nhập tên học viên / Please enter student's name"
                }
              />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  variant="standard"
                  fullWidth
                  label="Ngày sinh / Date of birth"
                  margin="normal"
                  name="dob"
                  value={
                    formData.dob ? dayjs(formData.dob, "DD/MM/YYYY") : null
                  }
                  onChange={(newValue) =>
                    handleChange({
                      target: {
                        name: "dob",
                        value: newValue ? newValue.format("DD/MM/YYYY") : "",
                      },
                    })
                  }
                  required
                  error={formData.dob === ""}
                  helperText={
                    formData.dob === "" &&
                    "Vui lòng nhập ngày sinh / Please enter date of birth"
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider> */}

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="vi"
                locale={viVN}
              >
                <CustomGlobalStyles />
                <DatePicker
                  label="Ngày sinh / Date of birth"
                  name="dob"
                  format="DD/MM/YYYY"
                  value={
                    formData.dob ? dayjs(formData.dob, "DD/MM/YYYY") : null
                  }
                  onChange={(newValue) =>
                    handleChange({
                      target: {
                        name: "dob",
                        value: newValue ? newValue.format("DD/MM/YYYY") : "",
                      },
                    })
                  }
                  // renderDay={(day, _value, DayComponentProps) => (
                  //   <PickersDay {...DayComponentProps} day={day} />
                  // )}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "standard",
                      required: true,
                      error: formData.dob === "",
                      helperText:
                        formData.dob === "" &&
                        "Vui lòng nhập ngày sinh / Please enter date of birth",
                    },
                  }}
                  sx={{ marginTop: "16px", marginBottom: "8px" }}
                  maxDate={dayjs(MAX_DATE)}
                  minDate={dayjs(MIN_DATE)}
                />
              </LocalizationProvider>

              <FormControl
                component="fieldset"
                margin="normal"
                fullWidth
                sx={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {/* <FormLabel component="legend">Giới tính / Gender</FormLabel> */}
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam / Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ / Female"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                variant="standard"
                fullWidth
                label="Địa chỉ / Address"
                margin="normal"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                error={formData.address === ""}
                helperText={
                  formData.address === "" &&
                  "Vui lòng nhập địa chỉ / Please enter address"
                }
              />
            </Grid>

            <Grid item container xs={12} id="part-ii" paddingTop={"20px"}>
              <Typography
                variant={isMobileDevice ? "h7" : "h6"}
                fontWeight={700}
              >
                II. Thông tin Phụ huynh (Parent&apos;s information)
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                label="Tên phụ huynh / Parent's name"
                margin="normal"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                error={formData.parentName === ""}
                helperText={
                  formData.parentName === "" &&
                  "Vui lòng nhập tên phụ huynh / Please enter parent name"
                }
              />
              <TextField
                variant="standard"
                fullWidth
                label="Số điện thoại / Phone number"
                margin="normal"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                required
                error={formData.phone1 === ""}
                helperText={
                  formData.phone1 === "" &&
                  "Vui lòng nhập số điện thoại / Please enter phone number"
                }
              />

              <TextField
                variant="standard"
                fullWidth
                label="Số điện thoại sử dụng Zalo / Zalo phone number"
                margin="normal"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
              />

              <TextField
                variant="standard"
                fullWidth
                label="Chữ ký xác nhận / Signature"
                margin="normal"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                required
                error={formData.signature === ""}
                helperText={
                  formData.signature === "" &&
                  "Vui lòng nhập chữ ký xác nhận / Please enter signature"
                }
              />
            </Grid>

            <Grid item container xs={12} id="part-iii" paddingTop={"20px"}>
              <Typography
                variant={isMobileDevice ? "h7" : "h6"}
                fontWeight={700}
              >
                III. Thông tin lớp đăng ký (Class information)
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                label="Cấp học / Grade"
                margin="normal"
                name="class"
                select
                onChange={handleChange}
                required
                error={classInformation.length === 0}
                helperText={
                  classInformation.length === 0 &&
                  "Vui lòng chọn một cấp học / Please select a grade"
                }
              >
                {classTable.map((item) => (
                  <MenuItem key={item.id} value={item.class}>
                    {item.class}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="standard"
                fullWidth
                label="Tên lớp / Class name"
                margin="normal"
                name="className"
                onChange={handleSelectChange}
                select
                required
                error={formData.className === ""}
                helperText={
                  formData.className === "" &&
                  "Vui lòng chọn một lớp / Please select a class"
                }
              >
                {classInformation.map((item, index) => (
                  <MenuItem key={index} value={item.className}>
                    {item.className}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                variant="standard"
                fullWidth
                label="Lịch học / Class schedule"
                margin="normal"
                name="classSchedule"
                value={formData.classSchedule}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: theme.palette.text.primary,
                  },
                }}
                multiline
              ></TextField>

              <TextField
                variant="standard"
                fullWidth
                label="Thời gian học / Class time"
                margin="normal"
                name="classTime"
                value={formData.classTime}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: theme.palette.text.primary,
                  },
                }}
                multiline
              ></TextField>

              <TextField
                variant="standard"
                fullWidth
                label="Thời lượng học / Class duration"
                margin="normal"
                name="classDuration"
                value={formData.classDuration}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: theme.palette.text.primary,
                  },
                }}
                disabled
              />

              <TextField
                variant="standard"
                fullWidth
                label="Học phí / Fee"
                margin="normal"
                name="fee"
                value={formData.fee}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: theme.palette.text.primary,
                  },
                }}
                disabled
              />

              <TextField
                variant="standard"
                fullWidth
                label="Bắt đầu học từ ngày / Start date"
                margin="normal"
                name="classStartDate"
                value={formData.classStartDate}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    color: theme.palette.text.primary,
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: theme.palette.text.secondary,
                  },
                }}
                disabled
              />
            </Grid>

            <Grid
              item
              container
              xs={12}
              id="part-iv"
              direction="colum"
              paddingTop={"20px"}
              spacing={2}
            >
              <Grid item container xs={12} style={{ justifyContent: "center" }}>
                <Typography
                  variant={isMobileDevice ? "h7" : "h6"}
                  fontWeight={700}
                  color={theme.palette.text.primary}
                >
                  ========= *** =========
                </Typography>
              </Grid>
              <Grid item container xs={12} style={{ justifyContent: "center" }}>
                <Typography
                  variant={isMobileDevice ? "h7" : "h6"}
                  fontWeight={700}
                  color={theme.palette.text.primary}
                >
                  THÔNG TIN PHIẾU GHI DANH
                </Typography>
              </Grid>

              <Grid item container xs={12}>
                <Typography
                  variant={isMobileDevice ? "h7" : "h6"}
                  fontWeight={700}
                  color={theme.palette.text.primary}
                >
                  1. Quy định lớp học:
                </Typography>
              </Grid>

              <Grid item container xs={12} style={{ paddingLeft: "30px" }}>
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Học viên đi học đúng giờ hoặc muộn nhất 5 – 10 phút so với
                  giờ quy định của lớp.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    textAlign: "justify",
                  }}
                >
                  - Học viên cam kết đi học đầy đủ (vắng không quá 2 - 3
                  buổi/tháng) hoàn thành đầy đủ bài tập về nhà học từ vựng ôn
                  bài trước khi đến lớp để đảm bảo đạt kết quả học tốt nhất.
                </Typography>
              </Grid>

              <Grid item container xs={12}>
                <Typography
                  variant={isMobileDevice ? "h7" : "h6"}
                  fontWeight={700}
                  color={theme.palette.text.primary}
                >
                  2. Qui định thu học phí:
                </Typography>
              </Grid>

              <Grid item container xs={12} style={{ paddingLeft: "30px" }}>
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Tiền mặt hoặc chuyển khoản đến tài khoản: 105875030393
                  Vietinbank. Chủ tài khoản: Nguyễn Lê Ngọc Minh
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Nội dung chuyển khoản: Họ và tên học viên_lớp_HP tháng ...
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Thời gian đóng học phí: Học phí sẽ được thu vào đầu khóa
                  học, hoặc đầu mỗi tháng (1 - 15 hàng tháng).
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Trung tâm <strong>không</strong> giải quyết việc cho vào lớp
                  đối với những trường hợp đóng học phí chậm sau ngày 15 hàng
                  tháng.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontStyle={"italic"}
                  fontWeight={700}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  Học phí chỉ bao gồm tài liệu, bài tập photo, không bao gồm
                  sách giáo trình.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  <strong>Bắt đầu từ 01/06/2024</strong>, Trung tâm chỉ hỗ trợ
                  trừ lại <strong>tối đa học phí 1 buổi học</strong> cho các bạn
                  học viên vắng học có phép do trùng với lịch thi/ôn thi bắt
                  buộc ở trường, các trường hợp vắng học khác (bao gồm không
                  phép hoặc có phép) đều sẽ không hỗ trợ hoàn lại học phí. Phụ
                  huynh nên cân nhắc về việc HV vắng học vì khi đó trung tâm vẫn
                  hoạt động, giáo viên vẫn dạy, bài học vẫn tiếp tục.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  <strong>
                    Trường hợp Trung tâm thông báo nghỉ vì lý do bất khả kháng
                  </strong>
                  nào đó thì học phí của buổi học đó sẽ được bù lại vào các buổi
                  tiếp theo vào cuối tháng hoặc đầu tháng tiếp theo, sao cho đảm
                  bảo đủ số buổi/tháng của lớp.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontWeight={700}
                  style={{ textAlign: "justify" }}
                >
                  Số ngày phép của học viên sẽ không tính vào ngày mà Trung tâm
                  báo nghỉ.
                </Typography>
              </Grid>

              <Grid item container xs={12}>
                <Typography
                  variant={isMobileDevice ? "h7" : "h6"}
                  fontWeight={700}
                  color={theme.palette.text.primary}
                >
                  3. Quy định bảo lưu học phí:
                </Typography>
              </Grid>
              <Grid item container xs={12} style={{ paddingLeft: "30px" }}>
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontStyle={"italic"}
                  fontWeight={700}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  Các trường hợp sau đây được sẽ được xem xét bảo lưu học phí:
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Tham gia hoạt động thi cử do nhà trường và các cấp tổ chức
                  (cần thời gian ôn luyện từ tối thiểu 2 tuần trở lên).
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  - Dịch bệnh/ Ốm đau/ Tai nạn/ Về quê trong thời gian dài.
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  style={{
                    paddingBottom: "10px",
                    textAlign: "justify",
                  }}
                >
                  Trung tâm giải quyết bảo lưu học phí trong trường hợp học viên
                  <strong>đã đóng đủ 100% học phí</strong> của tháng đó và số
                  buổi học của lớp trong tháng mà giáo viên đã dạy tối đa là{" "}
                  <strong>2 (hai) buổi</strong>. Thời gian bảo lưu:{" "}
                  <strong>03 (ba) tháng</strong> kể từ ngày trung tâm thông báo
                  xác nhận việc bảo lưu học phí của học viên. Sau thời gian một
                  tháng, nếu học viên không tiếp tục học thì học phí sẽ{" "}
                  <strong>không</strong> được hoàn lại.
                </Typography>

                <Grid
                  item
                  container
                  xs={12}
                  style={{ justifyContent: "center" }}
                >
                  <Typography
                    variant={isMobileDevice ? "h7" : "h6"}
                    fontWeight={700}
                    color={theme.palette.text.primary}
                  >
                    =======================
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container justifyContent={"center"} xs={12} id="submit">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              Nộp phiếu
            </Button>
          </Grid>
        </Container>
        {open && Loading({ open })}
        {openSuccess &&
          Success({
            open: openSuccess,
            handleClose: setOpenSuccess,
            user: user,
          })}
        {openFail && Fail({ open: openFail, handleClose: setOpenFail })}
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          style={{ position: "fixed", bottom: "16px", right: "16px" }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </ThemeProvider>
    </form>
  );
};

export default App;
