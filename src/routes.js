/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/Admin/Login/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";


import Examination from "views/Admin/Examination/Examination.js";
import Room from "views/Admin/Room/Room.js";
import TestSchedule from "views/Admin/Schedule/TestSchedule";
import Student from "views/Admin/Student/Student";
import Teacher from "views/Admin/Teacher/Teacher";
import TheoryTest from "views/Admin/TheoryTest/TheoryTest";
import Supervisor from "views/Admin/Supervisor/Supervisor";
import StudentAccount from "views/Admin/StudentAccount/StudentAccount";
import Scorecard from "views/Admin/Scorecard/Scorecard";
import Score from "views/Admin/Score/Score";
import scoresummary from "views/Admin/ScoreSummary/ScoreSummary";
//===layout teacher
import ScheduleTeacher from "views/Teacher/Schedule/ScheduleTeacher";
import ProfileTeacher from "views/Teacher/Profile/ProfileTeacher";
import StudentManagement from "views/Teacher/StudentManagement/StudentManagement";
import SubmitFileManageTeacher from "views/Teacher/SubmitFileManage/SubmitFileManageTeacher";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-green",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];

var routesTeacher1 = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/teacher1"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/teacher1"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/teacher1"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/teacher1"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/teacher1"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
var routesTeacher = [
  {
    path: "/profile",
    name: "Th??ng tin c?? nh??n",
    icon: "ni ni-tv-2 text-primary",
    component: ProfileTeacher,
    layout: "/teacher"
  },
  // {
  //   path: "/schedule",
  //   name: "L???ch coi thi",
  //   icon: "ni ni-planet text-blue",
  //   component: ScheduleTeacher,
  //   layout: "/teacher"
  // },
  {
    path: "/studentmanage",
    name: "Qu???n l?? th?? sinh",
    icon: "ni ni-pin-3 text-orange",
    component: StudentManagement,
    layout: "/teacher"
  },
  {
    path: "/submitfile",
    name: "Qu???n l?? n???p b??i",
    icon: "ni ni-single-02 text-yellow",
    component: SubmitFileManageTeacher,
    layout: "/teacher"
  }
  
];

var routesAdmin = [
  {
    path: "/index",
    name: "Trang ch???",
    icon: "fas fa-house-user text-red",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/examination",
    name: "K??? thi",
    icon: "ni ni-book-bookmark text-purple",
    component: Examination,
    layout: "/admin"
  },
  {
    path: "/room",
    name: "Ph??ng thi",
    icon: "ni ni-building text-blue",
    component: Room,
    layout: "/admin"
  },{
    path: "/teacher",
    name: "Gi??m th???",
    icon: "ni ni-single-02 text-yellow",
    component: Teacher,
    layout: "/admin"
  },
  {
    path: "/student",
    name: "Th?? sinh",
    icon: "ni ni-hat-3 text-orange",
    component: Student,
    layout: "/admin"
  },
  {
    path: "/testschedules",
    name: "Ca thi",
    icon: "ni ni-calendar-grid-58 text-brown",
    component: TestSchedule,
    layout: "/admin"
  },{
    path: "/studentAccount",
    name: "T???o t??i kho???n th?? sinh ",
    icon: "ni ni-key-25 text-orange",
    component: StudentAccount,
    layout: "/admin"
  },
  {
    path: "/theoryTests",
    name: "????? l?? thuy???t",
    icon: "ni ni-archive-2 text-red",
    component: TheoryTest,
    layout: "/admin"
  },
  {
    path: "/supervisor",
    name: "S???p x???p gi??m th???",
    icon: "ni ni-badge text-info",
    component: Supervisor,
    layout: "/admin"
  }
  ,
  {
    path: "/scorecard",
    name: "B??i thi th???c h??nh",
    icon: "fas fa-desktop text-green",
    component: Scorecard,
    layout: "/admin"
  },
  {
    path: "/enterscore",
    name: "Nh???p ??i???m",
    icon: "far fa-keyboard text-pink",
    component: Score,
    layout: "/admin"
  },{
    path: "/scoresummary",
    name: "T???ng k???t ??i???m",
    icon: "fas fa-database text-orange",
    component: scoresummary,
    layout: "/admin"
  }
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export {routesTeacher};
export {routesTeacher1};
export {routesAdmin}
export default routes;
