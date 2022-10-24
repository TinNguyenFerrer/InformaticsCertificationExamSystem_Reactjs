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
import React, { useEffect } from "react";
import { useState } from 'react';
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
  DropdownMenu
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./TestSchedule.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import * as request from "Until/request";

const TestShedule = () => {
  const examinationInformInit = [{
    id: null,
    name: "Chọn kì thi",
    starTime: "",
    endTime: "",
    location: "",
    minimumTheoreticalMark: 0,
    minimumPracticeMark: 0,
    gradingDeadline: ""
  }]
  let te = { id: -1, name: "" };

  const history = useHistory()
  const handleRedirectAddSchedule = () => {
    if (examinationSeleted.id == null) {
      window.alert("Xin chọn kì thi trước")
    } else {
      history.push(`schedule/add?idexamination=${examinationSeleted.id}`)
    }
  };
  const handleRedirectToEdit = (id) => {
    if (examinationSeleted.id == null) {
      window.alert("Xin chọn kì thi trước")
    } else {
      history.push(history.location.pathname + `/edit?id=${id}&idexamination=${examinationSeleted.id}`)
    }
  }
  const deleteExamination = (e) => {
    // //console.log(e)
    // const deleteExaminationService = async (e) => {
    //   try {
    //     const response = await request.deleteAPI("Examination/" + e)
    //     console.log(response)
    //     if (response.status == 200) {
    //       console.log("thành cong"+e)
    //       getAllTeacherServices()

    //     }
    //     else {
    //       window.alert("xóa giáo viên thất bại")
    //       console.log("thất bại")
    //     }
    //   } catch (e) {
    //     window.alert("Xóa giáo viên thất bại")
    //     console.log(e)
    //   }
    // }
    // deleteExaminationService(e)
  }
  const [DropdowItem, setDropdowItem] = useState(te)
  const callbackFunction = (childData) => {
    console.log(childData.target.id)
  }
  let [examinations, setExaminations] = useState([])
  let [testSchedules, setTestSchedules] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  const getAllTestScheduleServices = async () => {
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
  const getAllTestScheduleByIdExaminationServices = async (id) => {
    try {
      let res = await request.getAPI("TestShedule/GetAllByIdExamination?id=" + id)
      const data = res.data;
      setTestSchedules([...data])
      console.log(data)
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllTestScheduleServices()
  }, [])
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    getAllTestScheduleByIdExaminationServices(exam.id)
  };
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
                  >{examinationSeleted.name || "chọn kì thi"}</DropdownList>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các ca thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddSchedule}
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
                          <th scope="col">Ca thi</th>
                          <th scope="col">Thời gian bắt đầu</th>
                          <th scope="col">Thời gian kết thúc</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {(testSchedules.lenght != 0) &&
                        (<tbody>{testSchedules.map((testSchedule, index) =>
                        (
                          <tr key={testSchedule.id}>
                            <td>{index}</td>
                            <td>{testSchedule.name}</td>
                            <td>{new Date(testSchedule.starTime).toLocaleString()}</td>
                            <td>{new Date(testSchedule.endTime).toLocaleString()}</td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"

                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem

                                    idteacher={testSchedule.id}
                                    onClick={() => (handleRedirectToEdit(testSchedule.id))}
                                  >
                                    Sửa
                                  </DropdownItem>

                                  <DropdownItem

                                    idteacher={testSchedule.id}
                                    onClick={() => (deleteExamination(testSchedule.id))}
                                  >
                                    Xóa
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))//if fase----------------
                        }
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

export default TestShedule;
