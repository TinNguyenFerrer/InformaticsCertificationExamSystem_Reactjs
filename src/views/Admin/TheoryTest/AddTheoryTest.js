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
import React, { useEffect } from "react";
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
  Col,
  Label
} from "reactstrap";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";

//import "assets/css/Examination.css";
import "./AddTheoryTest.css";
import reques from "Until/request";
import * as request from "Until/request";
import DropdownList from "components/Dropdown/DropdownList.js";
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
const AddTheoryTest = () => {
  const [theoryInfor, setTheoryInfor] = useState({});



  //--------------=========-------lấy danh sách kì thi -----------===============---------
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  let [testSchedules, setTestSchedules] = useState([])
  let [testScheduleSeleted, setTestSchedulesSeleted] = useState({})
  // khi một kì thi được chọn trong dropdown
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    getAllScheduleTestByExaminationIdService(exam.id)
  };
  //========================= lấy danh sách ca thi theo kì thi=============
  const getAllScheduleTestByExaminationIdService = async (id) => {
    try {
      let res = await request.getAPI("TestShedule/GetAllScheduleByIdExamination?IdExam=" + id)
      const data = res.data;
      setTestSchedules([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  // khi một ca thi được chọn trong dropdown
  const onScheduleTestSelected = (schedu) => {
    setTestSchedulesSeleted(schedu)
    console.log(schedu)
  };
  // -------------=========-----sử lý upload file -----======-----------
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  async function uploadFile() {
    try {
      const formData = new FormData();

      if (selectedFile.type != "application/pdf") {
        window.alert("file không phải định dạng PDF")
        return;
      }
      if (!theoryInfor.Name) {
        window.alert("Nhập tên đề thi")
        return;
      }
      formData.append("file", selectedFile);
      // formData.append("Name", theoryInfor.Name);
      // formData.append("ExaminationId",examinationSeleted.id )
      //console.log(formData.get("ExaminationId"))
      const response = await reques.post(`TheoryTest/CreateTheoryTest?Name=${theoryInfor.Name}&ScheduleId=${testScheduleSeleted.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log(response);
      window.alert("thành công");
    } catch (error) {
      console.log(error);
      window.alert("Có lỗi trong quá trình UploadFile")
    }
  }
  //lấy danh sách kì thi
  const getAllExaminationsServices = async () => {
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
  useEffect(() => {
    getAllExaminationsServices()
  }, [])
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
                      Thông tin đề thi
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Tên đề thi
                            </label>
                            <Input
                              className="form-control-alternative addExamination_input_userinfor"
                              value={theoryInfor.Name || ""}
                              id="input-username"
                              type="text"
                              onChange={e => {
                                setTheoryInfor(pre => {
                                  let newTeacherInfo = { ...pre }
                                  newTeacherInfo.Name = e.target.value
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
                              Fill đề
                            </label>
                            <FormGroup className='custom-file '>
                              <Input className='custom-file-input input_uploadFile_student ' id="customFile" type="file" name="file" onChange={changeHandler} />
                              <Label className=" input_uploadFile_student_lable" for="customFile">{selectedFile ? selectedFile.name : "Chọn file .csv"}</Label>
                            </FormGroup>

                          </FormGroup>
                        </Col>
                      </Row>
                      <div>
                        Chọn kì thi: &ensp;
                        <DropdownListInline
                          item={examinations}
                          onItemSelected={onExaminationSelected}
                        >{examinationSeleted.name || "chọn kì thi"}
                        </DropdownListInline>
                      </div>
                      <br></br>
                      <div>
                        Chọn ca thi: &ensp;
                        <DropdownListInline
                          item={testSchedules}
                          onItemSelected={onScheduleTestSelected}
                        >{testScheduleSeleted.name || "chọn ca thi"}
                        </DropdownListInline>
                      </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                      <Button

                        color="primary"
                        onClick={uploadFile}
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

export default AddTheoryTest;
