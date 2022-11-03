import { useLocation, Route, Switch } from "react-router-dom";

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
import { useState, useEffect } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
// core components
import HeaderEmpty from "components/Headers/HeaderEmpty";
// reactstrap added
import {
  Button,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Col,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  CardTitle
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./SubmitFileManageTeacher.css"
import DropdownList from "components/Dropdown/DropdownList.js";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
import * as request from "Until/request";

const SubmitFileManageTeacher = () => {
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  let [schedules, setSchedules] = useState([])
  const history = useHistory();
  //----=====lấy danh sách kì thi========------
  const getAllExaminationServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      const data = res.data;
      setExaminations([...data])
      //console.log(examinations)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  //chuyển hướng trang web
  const redirectToDetail = (ex_roomId) =>{
    history.push("submitfile/detail?examroom_testscheid="+ex_roomId);
 }
 //=====================
  const GetAllTestScheduleByIdExaminationWithTokenServices = async (idExam) => {
    try {
      let res = await request.getAPI("TestShedule/GetScheduleByTokenIdExam?idExam="+idExam)
      const data = res.data;
      setSchedules([...data])
      //console.log(examinations)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const GetAllTestScheduleByTokenServices = async () => {
    try {
      let res = await request.getAPI("TestShedule/GetScheduleByTokenTeacher")
      const data = res.data;
      setSchedules([...data])
      //console.log(examinations)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    GetAllTestScheduleByIdExaminationWithTokenServices(exam.id)
  };

  useEffect(() => {
    GetAllTestScheduleByTokenServices()
    getAllExaminationServices()
    
  }, [])
  return (
    <>
      <HeaderEmpty />

      {/* Page content */}
      <Container className="mt--8 Body_Content bg-gradient-info" fluid style={{ minHeight: "600px" }}>
        <DropdownList
          item={examinations}
          onItemSelected={onExaminationSelected}
        >{examinationSeleted.name || "chọn kì thi"}</DropdownList>
        <Row>
          {schedules.map((t, index) => (
            <Col key={index} lg="6" xl="4" className="pt-2" onClick={()=>redirectToDetail(t.room_scheduleId)}>
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h3"
                        className="text-uppercase text-muted mb-0"
                      >
                        {t.testSchedule}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">{t.roomName}</span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-warning mr-2 h3">
                      <i className = "fas fa-calendar-alt"></i> {new Date(t.startTime).toLocaleDateString()}
                    </span>{" "}
                    <div className="text-nowrap h4">{`${new Date(t.startTime).getHours()}:00  -  ${new Date(t.endTime).getHours()}:00`}</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))
          }
        </Row>
      </Container>
    </>
  );
};

export default SubmitFileManageTeacher;
