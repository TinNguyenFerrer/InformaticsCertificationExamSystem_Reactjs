
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
import { useState, useEffect } from "react";
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


const EditTeacher = () => {
  //let { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  console.log(id);
  const teacherInformInit = {
    id: null,
    address: "",
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
  //get Teacher Infor
  useEffect(() => {
    const GetTeacherInforService = async (id) => {
      const res = await request.getAPI("Teacher/" + id)
      let t = res.data
      setTeacherInfor(t);
      let addr = t.address.split(",")
      console.log(t.address.split(",", 4))
      setAddress(() => ({
        province: addr[0],
        district: addr[1],
        ward: addr[2],
        Street: addr[3]
      }))
      console.log(address)
      console.log(teacherInfor)
    }
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    GetTeacherInforService(id)
  }, [])
  const handelSubmitTeacherInfo = () => {
    const addressSubmit = `${address.province}, ${address.district}, ${address.ward}, ${address.Street}`
    const teacherInformSubmit = { ...teacherInfor, address: addressSubmit }
    console.log(teacherInformSubmit)
    console.log(addressSubmit)

    const editTecherService = async () => {
      try {
        const response = await request.postAPI("Teacher/Update/", { ...teacherInformSubmit })
        console.log(response)
        if (response.status == 200) {
          // console.log("thành cong")
          history.push('/admin/teacher')
        }
        else {
          window.alert("thêm giáo viên thất bại")
          console.log("thất bại")
        }
      } catch (e) {
        window.alert("thêm giáo viên thất bại")
        console.log(e)
      }
    }
    editTecherService()
    // let t= addressSubmit.split(",")
    // console.log(addressSubmit.split(",",3))
    // console.log(t.slice(3,t.length).join(","))
  }
  console.log(teacherInfor)
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
                      Thông tin cá nhân cán bộ
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Họ và tên
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.fullName}
                              id="input-username"

                              type="text"
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
                              Mã số cán bộ
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.identifierCode}
                              id="input-username"
                              placeholder="000122"
                              type="number"
                              max={999999}
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
                              Số điện thoại
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={teacherInfor.phoneNumber}
                              id="input-first-name"

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
                              value={teacherInfor.email}
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
                              Mật khẩu
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
                      Địa chỉ cá nhân
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
                              Tỉnh, Thành phố
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.province}
                              id="input-city"
                              placeholder="Tỉnh"
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
                              Quận, huyện
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.district}
                              id="input-country"
                              placeholder="Huyện"
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
                              Phường, xã
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={address.ward}
                              id="input-postal-code"
                              placeholder="Xã"
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
                              Số nhà, Tên đường
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
                      >Sửa</Button>
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

export default EditTeacher;