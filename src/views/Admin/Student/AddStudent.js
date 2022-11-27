import DateTimeRange from "components/Datepiker/DateTimeRange";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import HeaderEmpty from "components/Headers/HeaderEmpty";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
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

//import "assets/css/Examination.css";
import "./AddStudent.css";
import * as request from "Until/request";


const AddStudent = () => {
  const history = useHistory()
  const queryParams = new URLSearchParams(window.location.search);
  const idexamination = queryParams.get('idexamination');
  const [studentsInfor, setStudentInfor] = useState();

  let [freelanceStudent, setFreelanceStudent] = useState(false)
  const addStudentServices = async (students) => {
    try {
      let res = await request.postAPI("Student", students)
      console.log(res)
      if (res.status === 200) {
        history.push('/admin/student')

      } else {
        window.alert("Thêm học sinh thất bại kiểm tra lại dữ liệu")
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handelSubmitStudentInfo = () => {

    try {
      let students = studentsInfor
      students.birthDay = new Date(studentsInfor.birthDay).toISOString()
      students.examinationId = idexamination
      console.log(students)
      addStudentServices(students)
    } catch (e) {
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
                    <h2 className="text-center  mb-4">
                      THÊM SINH VIÊN
                    </h2>
                    <div>
                        <Col lg="12">
                          {/* <div className="student-input-freelanceStudent">
                            <Input
                              type="checkbox"
                              checked={freelanceStudent}
                              onChange={() => {
                                setFreelanceStudent(!freelanceStudent);
                              }}
                            />
                            <Label check>Sinh viên tự do</Label>
                          </div> */}
                          <UpoadFileStudent >
                            Tải từ file
                          </UpoadFileStudent>
                        </Col>
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
