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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import * as request from "Until/request";
import React from "react";
import { useState, useEffect } from 'react';
const Header = () => {
  //=============================================================
  // lấy kỳ thi
  let [examinations, setExaminations] = useState([])
  const getAllExamServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      console.log(res.status)
      if (res.status == 401) {
        console.log("login")
      }
      const data = res.data;
      //data.starTime = new Date(data.starTime).toLocaleDateString() +"oo"
      setExaminations([...data])
      console.log(examinations)
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
//=============================================================
  //  lấy phòng thi
  let [rooms, setRooms] = useState([])
  const getAllRoomServices = async () => {
    try {
      let res = await request.getAPI("ExaminationRoom/GetAll")
      const data = res.data;
      setRooms([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
//=============================================================
  //  lấy giám thị
  let [teachers, setTeachers] = useState([])
  const getAllTeacherServices = () => {
    request.getAPI("Teacher/GetAll")
      .then((res) => {

        const t = res.data
        setTeachers(t);
        console.log(t)
      }).catch((e) => {
        console.log(e)
      })
  }
  //============================================================
  //lấy thí sinh
  let [students, setStudents] = useState([])
  const getAllStudentServices = async () => {
    try {
      let res = await request.getAPI("Student/GetAll")
      const data = res.data;
      setStudents([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllExamServices()
    getAllRoomServices()
    getAllTeacherServices()
    getAllStudentServices()
  }, [])
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Kỳ thi
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {examinations.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="ni ni-book-bookmark" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "} */}
                      <span className="text-nowrap">Tổng kỳ thi đã tổ chức</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Phòng thi
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{rooms.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="ni ni-building" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "} */}
                      <span className="text-nowrap">Tổng số phòng thi hiện có </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Giám thị
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{teachers.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-single-02" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "} */}
                      <span className="text-nowrap">Tổng số giám thị</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Thí sinh
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{students.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-hat-3" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 70
                      </span>{" "} */}
                      <span className="text-nowrap">Tổng thí sinh</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
