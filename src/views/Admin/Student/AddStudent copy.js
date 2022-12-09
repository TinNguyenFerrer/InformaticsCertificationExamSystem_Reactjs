import DateTimeRange from "components/Datepiker/DateTimeRange";
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
import { useState } from "react";
import { useHistory } from "react-router-dom";
// reactstrap components
import { Card, Container, Row } from "reactstrap";

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
  Col
} from "reactstrap";

//import "assets/css/Examination.css";
import "./AddStudent.css";
import * as request from "Until/request";


const AddStudentDefault = () => {
  const history = useHistory()
  const studentInformInit = [{
    name: "",
    email: "",
    phoneNumber: "",
    identifierCode: "",
    password: "",
    birthDay: "",
    birthPlace: ""
  }]
  const addressInit = {
    province: "",
    district: "",
    ward: "",
    Street: ""
  }
  const toDate = new Date()
  const queryParams = new URLSearchParams(window.location.search);
  const idexamination = queryParams.get('idexamination');
  const [studentsInfor, setStudentInfor] = useState(studentInformInit);
  const addStudentServices = async (students) => {
    try {
      let res = await request.postAPI("Student",students)
      console.log(res)
      if(res.status === 200){
        history.push('/admin/student')
        
      }else{
        window.alert("Thêm giáo viên thất bại kiểm tra lại dữ liệu")
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handelSubmitStudentInfo = () => {
    
    try{
      let students= studentsInfor
      students.birthDay = new Date(studentsInfor.birthDay).toISOString()
      students.examinationId=idexamination
      console.log(students)
      addStudentServices(students)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <HeaderEmpty />
      {/* Page content */}
      <Container className="mt--8 Body_Content" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div>
                <CardBody>

                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Thông tin sinh viên
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Tên sinh viên
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={studentsInfor.name}
                              id="input-username"
                              placeholder="Nguyễn Văn A"
                              type="text"
                              onChange={e => {
                                setStudentInfor(pre => {
                                  let newStudentInfo = { ...pre }
                                  newStudentInfo.name = e.target.value
                                  return newStudentInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Số điện thoại
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={studentsInfor.phoneNumber}
                              defaultValue=""
                              id="input-username"
                              placeholder="xxxx xxx xxx"
                              type="number"
                              onChange={e => {
                                setStudentInfor(pre => {
                                  let newStudentInfo = { ...pre }
                                  newStudentInfo.phoneNumber = e.target.value
                                  return newStudentInfo
                                })
                              }}
                            />

                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={studentsInfor.email}
                              id="input-email"
                              type="email"
                              onChange={e => {
                                setStudentInfor(pre => {
                                  let newStudentInfo = { ...pre }
                                  newStudentInfo.email = e.target.value
                                  return newStudentInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Mật khẩu
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={studentsInfor.password}
                              id="input-text"
                              type="password"
                              onChange={e => {
                                setStudentInfor(pre => {
                                  let newStudentInfo = { ...pre }
                                  newStudentInfo.password = e.target.value
                                  return newStudentInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ngày sinh
                            </label>
                            <Input
                              value={studentsInfor.birthDay}
                              onChange={(date) => {
                                setStudentInfor(pre => {
                                  let newStudentInfor = { ...pre }
                                  newStudentInfor.birthDay = date.target.value
                                  return newStudentInfor
                                })
                              }}
                              className="form-control-alternative"
                              name="input-city"
                              id="input-city"
                              placeholder=""
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Nơi sinh
                            </label>
                            <Input
                              value={studentsInfor.birthPlace}
                              onChange={(e) => {
                                setStudentInfor(pre => {
                                  let newStudentInfor = { ...pre }
                                  newStudentInfor.birthPlace = e.target.value
                                  return newStudentInfor
                                })
                              }}
                              className="form-control-alternative"
                              name="input-city"
                              id="input-city"
                              placeholder=""
                              type="text"
                            />
                          </FormGroup>
                        </Col> */}
                      </Row>
                    </div>

                    <div className="d-flex flex-row-reverse">
                      <Button
                        color="primary"
                        onClick={handelSubmitStudentInfo}
                        size=""
                        className="align-items-end"
                      >Tạo mới</Button>
                    </div>
                  </Form>



                </CardBody>
              </div>


            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddStudentDefault;
