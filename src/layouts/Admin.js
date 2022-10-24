import AddExamination from "views/Admin/Examination/AddExamination.js";
import AddRoom from "views/Admin/Room/AddRoom.js";
import EditRoom from "views/Admin/Room/EditRoom.js";
import AddStudent from "views/Admin/Student/AddStudent";
import EditStudent from "views/Admin/Student/EditStudent";
import AddTeacher from "views/Admin/Teacher/AddTeacher";
import EditTeacher from "views/Admin/Teacher/EditTeacher";
import AddSchedule from "views/Admin/Schedule/AddSchedule";
import AddTheoryTest from "views/Admin/TheoryTest/AddTheoryTest";
import EditExamination from "views/Admin/Examination/EditExamination.js";
import Icons from "views/examples/Icons.js";

import "./Admin.css"
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
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import SidebarAdmin from "components/Sidebar/SidebarAdmin";

import { routesAdmin } from "routes.js";

const RouteChil = () => {
  return (
    <>
      <Route
        exact
        path={"/admin/examination/add"}
        component={AddExamination}
      />
      <Route
        exact
        path={"/admin/examination/edit"}
        component={EditExamination}
      />
      <Route
        exact
        path={"/admin/room/add"}
        component={AddRoom}
      />
      <Route
        exact
        path={"/admin/room/edit"}
        component={EditRoom}
      />
      <Route
        exact
        path={"/admin/student/add"}
        component={AddStudent}
      />
      <Route
        exact
        path={"/admin/student/edit"}
        component={EditStudent}
      />
      <Route
        exact
        path={"/admin/teacher/add"}
        component={AddTeacher}
      />
      <Route
        exact
        path={"/admin/teacher/edit"}
        component={EditTeacher}
      />
      <Route
        exact
        path={"/admin/schedule/add"}
        component={AddSchedule}
      />
      <Route
        exact
        path={"/admin/Theory/add"}
        component={AddTheoryTest}
      />
    </>
  )
}
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routesAdmin.length; i++) {
      if (
        props.location.pathname.indexOf(routesAdmin[i].layout + routesAdmin[i].path) !==
        -1
      ) {
        return routesAdmin[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <SidebarAdmin
        {...props}
        routes={routesAdmin}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/Logo.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />

        <Switch>
          {getRoutes(routesAdmin)}
          <RouteChil />
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
