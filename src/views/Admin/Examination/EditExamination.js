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
import { useState, useEffect } from "react";
import { useAlert } from 'react-bootstrap-hooks-alert'
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
import * as request from "Until/request";
//import "assets/css/Examination.css";
import "./AddExamination.css";



const EditExamination = () => {
  const history = useHistory()
  const { warning, info, primary, danger, success } = useAlert()
  const examinationInformInit = [{
    id: null,
    name: "",
    starTime: "",
    //endTime: "",
    location: "",
    minimumTheoreticalMark: 0,
    minimumPracticeMark: 0
    //gradingDeadline: ""
  }]
  const toDate = new Date()
  const [examinationInfor, setExaminationInfor] = useState(examinationInformInit);
  //------------======== GetTeacherInfor ==========---------------
  console.log(examinationInfor)
  useEffect(() => {
    const GetExaminatiionInforService = async (id) => {
      const res = await request.getAPI("Examination/" + id)
      let t = res.data
      console.log("thong tin kì thi")
      console.log(t)
      setExaminationInfor(t);
    }
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    GetExaminatiionInforService(id)
  }, [])
  const editTeacherServices = async (exam) => {
    try {
      let res = await request.putAPI("Examination",exam)
      console.log(res)
      if(res.status === 200){
        history.push('/admin/examination')
        success("Sửa kì thi thành công")
      }else{
        danger("Sửa thông tin kì thi thất bại kiểm tra lại dữ liệu")
      }
    } catch (e) {
      console.log(e)
      danger("Có lỗi trong quá trình sửa")
    }
  }
  const handelSubmitExaminationInfo = () => {
    try{
    let examinationSubmit= examinationInfor
    examinationSubmit.starTime = new Date(examinationInfor.starTime).toISOString()
    // examinationSubmit.endTime = new Date(examinationInfor.endTime).toISOString()
    // examinationSubmit.gradingDeadline = new Date(examinationInfor.gradingDeadline).toISOString()
    if(examinationSubmit.starTime==undefined ||examinationSubmit.starTime==""){
      warning("Chưa nhập thời gian thi")
      return
    }
    if(examinationSubmit.location==undefined ||examinationSubmit.location==""){
      warning("Chưa nhập địa điểm thi")
      return
    }
    if(examinationSubmit.name==undefined || examinationSubmit.name == '' ){
      warning("Chưa nhập tên kì thi")
      return
    }
    if(examinationSubmit.minimumTheoreticalMark==undefined){
      warning("Chưa nhập điểm đậu lý thuyết")
      return
    }
    if(examinationSubmit.minimumPracticeMark==undefined){
      warning("Chưa nhập điểm đậu thực hành")
      return
    }
    console.log(examinationSubmit)
    editTeacherServices(examinationSubmit)
    }catch(e){
      window.alert("Thêm giáo viên thất bại kiểm tra lại dữ liệu")
    }
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
                      Thông tin kì thi
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Tên kì thi
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={examinationInfor.name||""}
                              id="input-username"
                              placeholder="Thi chứng chỉ UD công nghệ thông tin"
                              type="text"
                              onChange={e => {
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  console.log(typeof( e.target.value))
                                  newExaminationInfor.name = e.target.value
                                  return newExaminationInfor
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
                              Địa điểm tổ chức thi
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={examinationInfor.location||""}
                              id="input-username"
                              placeholder="Đại học cần thơ"
                              type="text"
                              onChange={e => {
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  newExaminationInfor.location = e.target.value
                                  return newExaminationInfor
                                })
                              }}
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
                              Điểm đậu lý thuyết
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              id="input-mark"
                              //placeholder="5"
                              type="number"
                              value={examinationInfor.minimumTheoreticalMark||""}
                              onChange={e => {
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  newExaminationInfor.minimumTheoreticalMark = e.target.value
                                  return newExaminationInfor
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3"></Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Điểm đậu thực hành
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              id="input-mark"
                              type="number"
                              value={examinationInfor.minimumPracticeMark||""}
                              onChange={e => {
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  newExaminationInfor.minimumPracticeMark = e.target.value
                                  return newExaminationInfor
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
                      Mốc thời gian
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
                              Ngày bắt đầu 
                            </label>
                            <Input
                              value={new Date(examinationInfor.starTime).toLocaleDateString('en-CA')}
                              onChange={(date)=>{
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  console.log(date.target.value)
                                  newExaminationInfor.starTime = date.target.value
                                  newExaminationInfor.endTime ="" 
                                  newExaminationInfor.gradingDeadline ="" 
                                  return newExaminationInfor
                                })
                              }}
                              className="form-control-alternative"
                              name="input-city"
                              id="input-city"
                              placeholder=""
                              type="date"
                              min={`${toDate.getFullYear()}-${toDate.getMonth()+1}-${toDate.getDate()}`}
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Ngày kết thúc
                            </label>
                            <Input
                              disabled={examinationInfor.starTime?false:true}
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Huyện"
                              type="date"
                              //min={`${toDate.getFullYear()}-${toDate.getMonth()+1}-${toDate.getDate()}`}
                              min={new Date(examinationInfor.starTime).toLocaleDateString('en-CA')}
                              value={new Date(examinationInfor.endTime).toLocaleDateString('en-CA')}
                              onChange={(date)=>{
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  newExaminationInfor.endTime = date.target.value
                                  newExaminationInfor.gradingDeadline ="" 
                                  return newExaminationInfor
                                })
                              }}
                            />
                          </FormGroup>
                        </Col> */}
                        
                      </Row>
                      {/* <Row>
                      <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Thời hạn chấm bài
                            </label>
                            <Input
                              disabled={examinationInfor.endTime?false:true}
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="Huyện"
                              type="date"
                              //min={`${toDate.getFullYear()}-${toDate.getMonth()+1}-${toDate.getDate()}`}
                              min={new Date(examinationInfor.starTime).toLocaleDateString('en-CA')}
                              max={new Date(examinationInfor.endTime).toLocaleDateString('en-CA')}
                              value={new Date(examinationInfor.gradingDeadline).toLocaleDateString('en-CA')}
                              onChange={(date)=>{
                                setExaminationInfor(pre => {
                                  let newExaminationInfor = { ...pre }
                                  newExaminationInfor.gradingDeadline = date.target.value
                                  return newExaminationInfor
                                })
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <Button
                        color="primary"
                        onClick={handelSubmitExaminationInfo}
                        size=""
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

export default EditExamination;
