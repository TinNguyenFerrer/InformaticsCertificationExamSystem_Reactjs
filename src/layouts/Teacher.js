import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import TeacherNavbar from "components/Navbars/TeacherNavbar";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import SidebarTeacher from "components/Sidebar/SidebarTeacher";
import {routesTeacher as routes} from "routes.js";
import DetailStudent  from "views/Teacher/StudentManagement/DetailStudent";
import {default as DetailStudentFileSubmit} from "views/Teacher/SubmitFileManage/DetailStudent";
const Teacher = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log(prop)
      if (prop.layout === "/teacher") {
        return (
          <Route exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        console.log("null")
        return null;
      }
    });
  };

  const RouteChil = () => {
    return (
      <>
        <Route
          exact
          path={"/teacher/studentmanage/detail"}
          component={DetailStudent}
        />
        <Route
          exact
          path={"/teacher/submitfile/detail"}
          component={DetailStudentFileSubmit}
        />
        
        
      </>
    )
  }

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <SidebarTeacher
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/Logo.png"),
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <TeacherNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)
          }
          <RouteChil />
          <Redirect from="*" to="/teacher/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Teacher;
