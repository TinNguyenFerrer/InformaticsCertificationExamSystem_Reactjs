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
import "./AddRoom.css";
import * as request from "Until/request";
import { useHistory } from "react-router-dom";
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'

const AddRoom = () => {
  const history = useHistory()
  const { warning, info, primary, danger, success } = useAlert()
  const RoomInformInit = {
    name: "",
    location: "",
    capacity:0
  }
  const toDate = new Date()
  const [roomInfor, setRoomInfor] = useState(RoomInformInit);

  const addRoomServices = async (students) => {
    try {
      let res = await request.postAPI("ExaminationRoom",students)
      console.log(res)
      if(res.status === 200){
        success("Thêm phòng thành công")
        history.push('/admin/room')
        console.log("thêm room thành công")
      }else{
        window.alert("Thêm phòng thi thất bại kiểm tra lại dữ liệu")
      }
    } catch (e) {
      window.alert("Thêm phòng thi thất bại kiểm tra lại dữ liệu")
      console.log(e)
    }
  }
  const handelSubmitRoomInfo = () => {
    
    try{
      console.log(roomInfor)
      addRoomServices(roomInfor)
    }catch(e){
      window.alert("Thêm phòng thi thất bại kiểm tra lại dữ liệu")
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
                      Thông tin phòng thi
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Tên phòng thi
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={roomInfor.name||""}
                              id="input-username"
                              placeholder="Phòng 202"
                              type="text"
                              maxLength="255"
                              onChange={e => {
                                setRoomInfor(pre => {
                                  let newRoomInfo = { ...pre }
                                  newRoomInfo.name = e.target.value
                                  return newRoomInfo
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
                              Vị trí phòng thi
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={roomInfor.location||""}
                              id="input-username"
                              placeholder="Đại học cần thơ"
                              type="text"
                              maxLength="255"
                              onChange={e => {
                                setRoomInfor(pre => {
                                  let newRoomInfo = { ...pre }
                                  newRoomInfo.location = e.target.value
                                  return newRoomInfo
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
                              Số lượng sinh viên tối đa
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={roomInfor.capacity}
                              id="input-mark"
                              type="number"
                              onChange={e => {
                                setRoomInfor(pre => {
                                  let newRoomInfo = { ...pre }
                                  newRoomInfo.capacity = e.target.value
                                  return newRoomInfo
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3"></Col>
                        
                      </Row>
                    </div>
                    
                    <div className="d-flex flex-row-reverse">
                      <Button
                        color="primary"
                        onClick={handelSubmitRoomInfo}
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

export default AddRoom;
