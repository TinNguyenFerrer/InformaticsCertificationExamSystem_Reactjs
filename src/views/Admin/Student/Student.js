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
import { useState, useEffect } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
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
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Label
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Student.css"
import DropdownList from "components/Dropdown/DropdownList.js";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
import * as request from "Until/request";

const Student = () => {
  const history = useHistory()
  const studentInformInit = [{
    name: "",
    email: "",
    phoneNumber: "",
    identifierCode: "",
    password: "",
  }]
  let [students, setStudents] = useState(studentInformInit)
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  let [freelanceStudent, setFreelanceStudent] = useState(false)
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
  const getAllStudentByIdExaminationServices = async (id) => {
    try {
      let res = await request.getAPI("Student/GetAllByIdExamination?id=" + id)
      const data = res.data;
      setStudents([...data])
      console.log(data)
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    getAllStudentByIdExaminationServices(exam.id)
  };
  const handleRedirectAddStudent = () => {
    if (examinationSeleted.id == null) {
      window.alert("Bạn phải chọn kì thi trước")
    } else {
      history.push("student/add?idexamination=" + examinationSeleted.id)
    }
  };
  const getAllStudentServices = async () => {
    try {
      let res = await request.getAPI("Student/GetAll")
      const data = res.data;
      setStudents([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const deleteStudentService = async (e) => {
    try {
      const response = await request.deleteAPI("Student/" + e)
      console.log(response)
      if (response.status == 200) {
        console.log("thành cong" + e)
        getAllStudentServices()

      }
      else {
        window.alert("xóa giáo viên thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      window.alert("Xóa giáo viên thất bại")
      console.log(e)
    }
  }
  const handleDeleteStudent = (e) => {
    deleteStudentService(e)
  }
  useEffect(() => {
    getAllStudentServices()
    getAllExaminationsServices()
  }, [])
  const handleRedirectToEdit = (id) => {
    history.push(history.location.pathname + "/edit?id=" + id)
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

                  <DropdownList
                    item={examinations}
                    onItemSelected={onExaminationSelected}
                  >{examinationSeleted.name || "chọn kì thi"}
                  </DropdownList>
                  <br></br>
                  <div className="student-input-freelanceStudent">
                    <Input 
                      type="checkbox"
                      checked={freelanceStudent}
                      onChange={() => {
                        setFreelanceStudent(!freelanceStudent);
                      }}
                    />
                    <Label check>Sinh viên tự do</Label>
                  </div>
                  <UpoadFileStudent >
                    Tải từ file
                  </UpoadFileStudent>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Danh sách thí sinh</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddStudent}
                          size="sm"
                        >
                          Tạo mới
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên Sinh viên</th>
                          <th scope="col">Email</th>
                          <th scope="col">SĐT</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {(students.lenght != 0) &&
                        (<tbody>{students.map((student, index) =>
                        (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phoneNumber}</td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                    onClick={() => (handleRedirectToEdit(student.id))}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => (handleDeleteStudent(student.id))}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>))}
                        </tbody>)}
                    </Table>
                  </div>
                  <hr className="my-4" />

                </CardBody>
              </div>


            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Student;
