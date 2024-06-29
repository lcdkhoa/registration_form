const duration = "90 phút/ buổi, 12 buổi/ tháng";
const duration2 = "50 phút/ buổi, 12 buổi/ tháng";
const classSchedule246 = "Thứ 2 - 4 - 6";
const classSchedule245 = "Thứ 2 - 4 - 5";
const classSchedule357 = "Thứ 3 - 5 - 7";
const classScheduleExpress = "Thứ 2 - 4 - 6 - 7 - Chủ Nhật";
const classSchedule36cn = "Thứ 3 - 6 - Thứ Bảy";
const classSchedule47cn = "Thứ 4 - 7 - Chủ Nhật";

const fee220 = "220.000đ /tháng";
const fee750 = "750.000đ /tháng";
const fee825 = "825.000đ /tháng";
const fee900 = "900.000đ /tháng";
const fee1000 = "1.000.000đ /tháng";
const fee1080 = "1.080.000đ /tháng";
const fee1130 = "1.130.000đ /tháng";
const fee1170 = "1.170.000đ /tháng";
const fee1440 = "1.440.000đ /tháng";
const fee1850 = "1.850.000đ /tháng";

const classTime47cn = "Thứ 4: 19:00 - 20:30, Thứ 7 & Chủ Nhật: 15:45 - 17:15";
const classTime14 = "14:00 - 15:30";
const classTime1545 = "15:45 - 17:15";
const classTime800 = "8:00 - 9:30";
// const classTime830 = "8:30 - 10:00";
const classTime845 = "8:45 - 10:15";
const classTime945 = "9:45 - 11:15";
// const classTime1010 = "10:10 - 11:40";

const ClassTables = [
  {
    id: 1,
    class: "Lớp 1",
    classInformation: [
      {
        className: "Star 1",
        classSchedule: classSchedule47cn,
        classTime: classTime47cn,
        classDuration: duration,
        fee: fee750,
        classStartDate: "12/6/2024",
      },
    ],
  },
  {
    id: 2,
    class: "Lớp 2",
    classInformation: [
      {
        className: "Star 2",
        classSchedule: classSchedule246,
        classTime: classTime1545,
        classDuration: duration,
        fee: fee750,
        classStartDate: "10/6/2024",
      },
    ],
  },
  {
    id: 3,
    class: "Lớp 3",
    classInformation: [
      {
        className: "Moon 1",
        classSchedule: classSchedule36cn,
        classTime: classTime14,
        classDuration: duration,
        fee: fee825,
        classStartDate: "18/6/2024",
      },
    ],
  },
  {
    id: 4,
    class: "Lớp 4",
    classInformation: [
      {
        className: "Moon 2A",
        classSchedule: classSchedule245,
        classTime: classTime14,
        classDuration: duration,
        fee: fee825,
        classStartDate: "10/6/2024",
      },
    ],
  },
  {
    id: 5,
    class: "Lớp 5",
    classInformation: [
      {
        className: "Moon 2B",
        classSchedule: classSchedule246,
        classTime: classTime945,
        classDuration: duration,
        fee: fee825,
        classStartDate: "Cập nhật sau",
      },
    ],
  },
  {
    id: 6,
    class: "Lớp 6",
    classInformation: [
      {
        className: "Sun 1",
        classSchedule: classSchedule357,
        classTime: classTime800,
        classDuration: duration,
        fee: fee900,
        classStartDate: "18/6/2024",
      },
    ],
  },
  {
    id: 7,
    class: "Lớp 7",
    classInformation: [
      {
        className: "Sun 2",
        classSchedule: classSchedule357,
        classTime: classTime1545,
        classDuration: duration,
        fee: fee1080,
        classStartDate: "18/6/2024",
      },
    ],
  },
  {
    id: 8,
    class: "Lớp 8",
    classInformation: [
      {
        className: "Sun 3",
        classSchedule: classSchedule357,
        classTime: classTime945,
        classDuration: duration,
        fee: fee1080,
        classStartDate: "Cập nhật sau",
      },
    ],
  },
  {
    id: 9,
    class: "Lớp 9",
    classInformation: [
      {
        className: "Sun 4",
        classSchedule: "",
        classTime: "",
        classDuration: duration,
        fee: fee1080,
        classStartDate: "Cập nhật sau",
      },
    ],
  },
  {
    id: 10,
    class: "Lớp 10",
    classInformation: [
      {
        className: "B2",
        classSchedule: "",
        classTime: "",
        classDuration: duration,
        fee: fee1130,
        classStartDate: "Cập nhật sau",
      },
    ],
  },
  {
    id: 11,
    class: "Lớp 11 - 12",
    classInformation: [
      {
        className: "Luyện thi IELTs",
        classSchedule: "",
        classTime: "",
        classDuration: duration,
        fee: fee1440,
        classStartDate: "Cập nhật sau",
      },
      {
        className: "IELTs cấp tốc 3 tháng",
        classSchedule: classScheduleExpress,
        classTime: classTime845,
        classDuration: duration,
        fee: fee1850,
        classStartDate: "10/6/2024",
      },
    ],
  },
  {
    id: 12,
    class: "Lớp 5 - 8: Luyện thi KET - PET",
    classInformation: [
      {
        className: "Luyện thi KET 1",
        classSchedule: classSchedule246,
        classTime: classTime800,
        classDuration: duration,
        fee: fee1170,
        classStartDate: "17/6/2024",
      },
    ],
  },
  {
    id: 13,
    class: "Lớp 6 - 10: Pre-IELts",
    classInformation: [
      {
        className: "Pre-IELts",
        classSchedule: "",
        classTime: "",
        classDuration: duration,
        fee: fee1000,
        classStartDate: "17/6/2024",
      },
    ],
  },
  {
    id: 14,
    class: "Mầm non",
    classInformation: [
      {
        className: "Mầm non Hướng Dương",
        classSchedule: "Thứ 3 - 4 - 6",
        classTime: "",
        classDuration: duration2,
        fee: fee220,
        classStartDate: "18/6/2024",
      },
      {
        className: "Mầm non Tuổi Thơ",
        classSchedule: "Thứ 2 - 3 - 5",
        classTime: "",
        classDuration: duration2,
        fee: fee220,
        classStartDate: "10/6/2024",
      },
      {
        className: "Mầm non Sen Hồng",
        classSchedule: "Thứ 2 - 5 - 6",
        classTime: "",
        classDuration: duration2,
        fee: fee220,
        classStartDate: "10/6/2024",
      },
    ],
  },
];

const initialFormData = {
  fullName: "",
  dob: "",
  gender: "",
  address: "",
  parentName: "",
  phone1: "",
  phone2: "",
  signature: "",
  class: "",
  className: "",
  classTime: "",
  classSchedule: "",
  fee: "0đ",
  classStartDate: "",
  classDuration: "",
};

const currentYear = new Date().getFullYear();
const MIN_DATE = new Date(1950, 0, 1);
const MAX_DATE = new Date(currentYear, 11, 31);

export { ClassTables, initialFormData, MIN_DATE, MAX_DATE };
