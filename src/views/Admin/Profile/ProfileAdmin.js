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
import { StoreContext } from "../../../Until/StoreProvider";
import { useState, useEffect } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
// core components
import HeaderEmpty from "components/Headers/HeaderEmpty";
import UserHeader from "components/Headers/UserHeader.js";
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
  Label
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./ProfileTeacher.css"
import DropdownList from "components/Dropdown/DropdownList.js";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
import * as request from "Until/request";

const ProfileAdmin = () => {
  const addressInit = {
    province: "",
    district: "",
    ward: "",
    Street: ""
  }
  const teacherInformInit = {
    id: null,
    address: "",
    fullName: "",
    identifierCode: "",
    phoneNumber: "",
    email: "",
    password: ""
  }
  //================== use context =================
  const [nameTeacherContext, setNameTeacherContext] = React.useContext(StoreContext).nameTeacher;
  //==================----------get infor teacher------------==============
  const [teacherInfor, setTeacherInfor] = useState(teacherInformInit);
  const getTeacherInforByToken = async () => {
    try {
      let res = await request.getAPI("Teacher/GetTeacherInfoByTokenIdExam")
      setTeacherInfor(res.data)
      GetTeacherInforService(res.data.id)
      console.log(res.data)
      //---------set context----------
      setNameTeacherContext(res.data.fullName)
    } catch (e) {
      console.log(e)
    }
  }
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
  // ===============edit teacher============== 
  const editTecherService = async () => {
    try {
      const addressSubmit = `${address.province}, ${address.district}, ${address.ward}, ${address.Street}`
      const teacherInformSubmit = { ...teacherInfor, address: addressSubmit }
      const response = await request.postAPI("Teacher/UpdateAdmin/", { ...teacherInformSubmit })
      console.log(response)
      if (response.status == 200) {
        // console.log("thành cong")
        //history.push('/admin/teacher')
        window.alert("thành công")
        getTeacherInforByToken()
      }
      else {
        window.alert("Sửa giáo viên thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      window.alert("Sửa giáo viên thất bại")
      console.log(e)
    }
  }

  //let { id } = useParams();
  const history = useHistory()
  const [address, setAddress] = useState(addressInit)
  //get Teacher Infor
  // useEffect(() => {
    //   GetTeacherInforService(teacherInfor.id)
    // }, [])
    const handelSubmitTeacherInfo = () => {
      editTecherService()
      // let t= addressSubmit.split(",")
      // console.log(addressSubmit.split(",",3))
      // console.log(t.slice(3,t.length).join(","))
    }
    console.log(teacherInfor)
    useEffect(() => { getTeacherInforByToken() }, [])

  return (
    <>
      <HeaderEmpty />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../../assets/img/theme/AdminLogo.png")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">

                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="description">MSCB</span><br></br>
                        <span className="description">{teacherInfor.identifierCode}</span>
                      </div>
                      {/* <div>
                        <span className="heading">|</span>
                        <span className="description"></span>
                      </div> */}
                      <div>
                        <span className="description">SĐT</span><br></br>
                        <span className="description">{teacherInfor.phoneNumber} </span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {teacherInfor.fullName}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {teacherInfor.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    
                  </div>
                  <p>
                  {address.province}, 
                  {address.district}, <br></br>
                  {address.ward}, 
                 {address.Street}
                  </p>
                  <hr className="my-4" />
                  <div>
                    <i className="ni education_hat mr-2" />
                    Quản trị viên
                  </div>
                  
                  
                </div>
              </CardBody>
            </Card>
          </Col>


          <Col className="order-xl-1" xl="8">
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
                                value={teacherInfor ? teacherInfor.fullName : ""}
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
                                value={teacherInfor ? teacherInfor.identifierCode : ""}
                                id="input-identifierCode"
                                placeholder="000000"
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
                                value={teacherInfor ? teacherInfor.phoneNumber : ""}
                                id="input-phoneNumber"
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
                                placeholder="XXXXXXX@ctu.edu.vn"
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
                                id="input-password"
                                placeholder="xxxx xxx xxx"
                                type="password"
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
                                id="input-district"
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
                                htmlFor="input-"
                              >
                                Phường, xã
                              </label>
                              <Input
                                className="form-control-alternative"
                                value={address.ward}
                                id="input-wards"
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
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default ProfileAdmin;
