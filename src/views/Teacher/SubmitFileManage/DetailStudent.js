import { useLocation, Route, Switch, Link } from "react-router-dom";

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
import * as request from "Until/request";
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
  Spinner
} from "reactstrap";
import { useHistory } from "react-router-dom";
//import "./Teacher.css"
import DropdownList from "components/Dropdown/DropdownList.js";

const DetailStudent = () => {

  const history = useHistory()
  const handleRedirectAddTeacher = () => {
    history.push("teacher/add")
  };

  let [students, setStudents] = useState([])
  //console.log("rerender")
  //console.log(teachers)
  const getAllInfoSubmitFileOfStudentBySchedule_RoomIdService = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const examroom_testscheid = queryParams.get('examroom_testscheid');
      const param = {
        params: {
          ExamRom_TestScheid: examroom_testscheid
        }
      }
      let res = await request.getAPI(`Student/GetAllInforSubmitFile`, param)
      const data = res.data;
      setStudents([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const UnlockUserService = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const examroom_testscheid = queryParams.get('examroom_testscheid');
      const param = {
        params: {
          ExamRom_TestScheid: examroom_testscheid
        }
      }
      let res = await request.getAPI(`Student/UnlockStudent`, param)
      const data = res.data;
      if (res.status == 200) {
        window.alert("Thí sinh có thể bắt đầu làm bài");
      } else {
        window.alert("Kích hoạt thất bại xin thử lại")
      }
      //setStudents([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllInfoSubmitFileOfStudentBySchedule_RoomIdService()
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
                  <Button color="success" onClick={UnlockUserService}>Bắt đầu làm bài</Button>

                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Danh sách học viên</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button color="primary" onClick={getAllInfoSubmitFileOfStudentBySchedule_RoomIdService}>
                          Kiểm tra
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
                          <th scope="col">Word</th>
                          <th scope="col">Excel</th>
                          <th scope="col">PowerPoint</th>
                        </tr>
                      </thead>
                      {(students.lenght != 0) &&
                        (<tbody>{students.map((student, index) =>
                        (
                          <tr key={index + 1}>
                            <td>{index}</td>
                            <td>{student.name}</td>
                            <td>{student.fileSubmitted.fileWord ? <i className="fas fa-file-word text-primary fa-lg"></i> : <i className="fas fa-exclamation-triangle text-red fa-lg"></i>}</td>
                            <td>{student.fileSubmitted.fileExcel ? <i className="fas fa-file-excel fa-lg text-success"></i> : (<i className="fas fa-exclamation-triangle text-red fa-lg"></i>)}</td>
                            <td>{student.fileSubmitted.filePowerPoint ? <i className="fas fa-file-powerpoint fa-lg text-orange"></i> : <i className="fas fa-exclamation-triangle text-red fa-lg"></i>}</td>

                          </tr>))}
                        </tbody>)}
                    </Table>
                    {(students.length == 0) && (<div className="d-flex justify-content-center">
                      <br></br>
                      <Spinner style={{
                        height: '3rem',
                        width: '3rem'
                      }} color="primary">
                        Loading...
                      </Spinner>
                    </div>)}
                  </div>
                  <hr className="my-4" />

                </CardBody>
              </div>


            </Card>
          </div>
        </Row>
      </Container >
    </>
  );
};

export default DetailStudent;
