
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
import { useHistory } from "react-router-dom";
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
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
//import "assets/css/Examination.css";
import "./AddTeacher.css";
import * as request from "Until/request";


const AddTeacher = () => {
  const teacherInformInit = {
    fullName: "",
    identifierCode: "",
    phoneNumber: "",
    email: "",
    password: ""
  }
  const addressInit = {
    province: "",
    district: "",
    ward: "",
    Street: ""
  }
  const history = useHistory()
  const [teacherInfor, setTeacherInfor] = useState(teacherInformInit);
  const [address, setAddress] = useState(addressInit)
  // console.log(address)
  // console.log(teacherInfor)
  const handelSubmitTeacherInfo = () => {
    const addressSubmit = `${address.province}, ${address.district}, ${address.ward}, ${address.Street}`
    const teacherInformSubmit = { ...teacherInfor, Address: addressSubmit }
    console.log(teacherInformSubmit)
    console.log(addressSubmit)

    const addTecherAPI = async () => {
      try {
        const response = await request.postAPI("Teacher/Create/", { ...teacherInformSubmit })
        console.log(response)
        if (response.status == 200) {
          console.log("th??nh cong")
          history.push('/admin/teacher')
        }
        else {
          window.alert("th??m gi??o vi??n th???t b???i")
          console.log("th???t b???i")
        }
      } catch (e) {
        window.alert("th??m gi??o vi??n th???t b???i")
        console.log(e)
      }
    }
    addTecherAPI()
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
                  {/* <h6 className="heading-small text-muted mb-4">
                    Th??m t??? m???t danh s??ch gi??o vi??n
                  </h6>
                  <UpoadFileStudent >
                    T???i danh s??ch
                  </UpoadFileStudent> */}
                  <br></br>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Th??ng tin c?? nh??n gi??m th???
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              H??? v?? t??n
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.fullName}
                              id="input-username"
                              placeholder="Tr???n Minh T??n"
                              type="text"
                              maxLength="255"
                              onChange={e => {
                                setTeacherInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.fullName = e.target.value
                                  return newTeacherInfo
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
                              M?? s??? c??n b???
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.IdentifierCode}
                              id="input-username"
                              placeholder="000122"
                              type="number"
                              max={999999999999999}
                              onChange={e => {
                                setTeacherInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.identifierCode = e.target.value
                                  return newTeacherInfo
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
                              S??? ??i???n tho???i
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.PhoneNumber}
                              id="input-first-name"
                              placeholder="xxxx xxx xxx"
                              type="number"
                              onChange={e => {
                                setTeacherInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.phoneNumber = e.target.value
                                  return newTeacherInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              id="input-email"
                              placeholder="tantran@ctu.edu.vn"
                              type="email"
                              value={teacherInfor.Email}
                              onChange={e => {
                                setTeacherInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.email = e.target.value
                                  return newTeacherInfo
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
                              M???t kh???u
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.password}
                              id="input-first-name"
                              placeholder="xxxx xxx xxx"
                              type="text"
                              onChange={e => {
                                setTeacherInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.password = e.target.value
                                  return newTeacherInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* ================================================================ */}
                    {/* Address */}
                    <h5 className="heading-small text-muted">
                      ?????a ch??? c?? nh??n
                    </h5>
                    <div className="pl-lg-4">
                      <br />
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              T???nh, Th??nh ph???
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.province}
                              id="input-city"
                              placeholder="T???nh"
                              type="text"
                              onChange={e => {
                                setAddress(pre => {
                                  let newAddress = { ...pre }
                                  newAddress.province = e.target.value
                                  return newAddress
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Qu???n, huy???n
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.district}
                              id="input-country"
                              placeholder="Huy???n"
                              type="text"
                              onChange={e => {

                                setAddress(pre => {
                                  let newAddress = { ...pre }
                                  newAddress.district = e.target.value
                                  return newAddress
                                })

                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Ph?????ng, x??
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.ward}
                              id="input-postal-code"
                              placeholder="X??"
                              type="text"
                              onChange={e => {

                                setAddress(pre => {
                                  let newAddress = { ...pre }
                                  newAddress.ward = e.target.value
                                  return newAddress
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              S??? nh??, T??n ???????ng
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.Street}
                              id="input-address"
                              placeholder=""
                              type="text"
                              onChange={e => {
                                setAddress(pre => {
                                  let newAddress = { ...pre }
                                  newAddress.Street = e.target.value
                                  return newAddress
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <Button
                        color="primary"
                        onClick={handelSubmitTeacherInfo}
                        size="lg"
                        className="align-items-end"
                      >T???o m???i</Button>
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

export default AddTeacher;
