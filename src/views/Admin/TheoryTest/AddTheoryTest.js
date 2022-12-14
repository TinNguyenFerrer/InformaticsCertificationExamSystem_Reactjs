import DateTimeRange from "components/Datepiker/DateTimeRange";
import { useHistory } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
// reactstrap components
import { Card, Container, Row } from "reactstrap";
// core components
import HeaderEmpty from "components/Headers/HeaderEmpty";
import {StoreContext} from "Until/StoreProvider"
//  react hook alerts
import { useAlert } from 'react-bootstrap-hooks-alert'
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
  const history = useHistory()
  const [theoryInfor, setTheoryInfor] = useState({});
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useContext(StoreContext).examinationSeleted
  let [testSchedules, setTestSchedules] = useState([])
  let [testScheduleSeleted, setTestSchedulesSeleted] = useState({})
  const { warning, info, primary, danger, success } = useAlert()
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
      warning("Có lỗi trong quá trình lấy ca thi")
      console.log(e)
    }
  }
  // khi một ca thi được chọn trong dropdown
  const onScheduleTestSelected = (schedu) => {
    setTestSchedulesSeleted(schedu)
    console.log(schedu)
  };
  // --===========sử lý upload file =============--
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileExcel, setSelectedFileExcel] = useState();
  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  const changeFileExcelHandler = (e) => {
    console.log(e.target.files[0].type)
    setSelectedFileExcel(e.target.files[0]);
  }
  async function uploadFile() {
    try {
      const formData = new FormData();

      if (selectedFile.type != "application/pdf") {
        warning("File không phải định dạng PDF")
        return;
      }
      if (selectedFileExcel.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        warning("File không phải định dạng Excel")
        return;
      }
      if (!theoryInfor.Name) {
        warning("Nhập tên đề thi")
        return;
      }
      formData.append("file", selectedFile);
      formData.append("fileExel", selectedFileExcel);
      // formData.append("Name", theoryInfor.Name);
      // formData.append("ExaminationId",examinationSeleted.id )
      //console.log(formData.get("ExaminationId"))
      const response = await reques.post(`TheoryTest/CreateTheoryTest?Name=${theoryInfor.Name}&ScheduleId=${testScheduleSeleted.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log(response);
      success("Thêm đề thi thành công");
      history.push("/admin/theoryTests")

    } catch (error) {
      console.log(error);
      danger("Có lỗi trong quá trình UploadFile")
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
      danger("Có lỗi trong quá trình lấy danh sách kì thi")
      console.log(e)
    }
  }
  useEffect(() => {
    getAllExaminationsServices()
    if (examinationSeleted.id !== undefined)
    getAllScheduleTestByExaminationIdService(examinationSeleted.id)
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
                      <br></br>
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

                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              File đề
                            </label>
                            <FormGroup className='custom-file '>
                              <Input className='custom-file-input input_uploadFile_student ' id="customFile" type="file" name="file" onChange={changeHandler} accept=".pdf" />
                              <Label className=" input_uploadFile_student_lable" for="customFile">{selectedFile ? selectedFile.name : "Chọn file PDF"}</Label>
                            </FormGroup>

                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              File Excel
                            </label>
                            <FormGroup className='custom-file '>
                              <Input className='custom-file-input input_uploadFile_student ' id="customFileExcel" type="file" name="fileExcel" onChange={changeFileExcelHandler} accept=".xlsx" />
                              <Label className=" input_uploadFile_student_lable" for="customFileExcel">{selectedFileExcel ? selectedFileExcel.name : "Chọn file Excel"}</Label>
                            </FormGroup>

                          </FormGroup>
                        </Col>
                      </Row>

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
