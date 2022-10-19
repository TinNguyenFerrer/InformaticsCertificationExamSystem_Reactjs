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



const AddStudent = () => {
  const studentInformInit = {
    Name: "",
    IdentifierCode: "",
    PhoneNumber: "",
    Email: "",
  }
  const addressInit = {
    province: "",
    district: "",
    ward: "",
    Street: ""
  }
  const toDate = new Date()
  const [teacherInfor, setTeacherInfor] = useState(studentInformInit);
  const [address, setAddress] = useState(addressInit)
  // console.log(address)
  // console.log(teacherInfor)
  const handelSubmitStudentInfo = () => {
    const addressSubmit = `${address.province}, ${address.district}, ${address.ward}, ${address.Street}`
    const teacherInformSubmit = {...teacherInfor, Address:addressSubmit}
    console.log(teacherInformSubmit)
    console.log(addressSubmit)
    // let t= addressSubmit.split(",")
    // console.log(addressSubmit.split(",",3))
    // console.log(t.slice(3,t.length).join(","))
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
                              defaultValue={teacherInfor.Name}
                              id="input-username"
                              placeholder="Phòng 202"
                              type="text"
                              // onChange={e => {
                              //   setTeacherInfor(pre => {
                              //     let newTeacherInfo = { ...pre }
                              //     newTeacherInfo.Name = e.target.value
                              //     return newTeacherInfo
                              //   })
                              // }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              địa chỉ
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              
                              defaultValue = ""
                              id="input-username"
                              placeholder="Đại học cần thơ"
                              type="text"
                            />

                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Số lượng sinh viên tối đa
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              defaultValue="5"
                              id="input-mark"
                              placeholder="5"
                              type="number"
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3"></Col>
                        
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

export default AddStudent;
