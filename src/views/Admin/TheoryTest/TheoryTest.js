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
import "./TheoryTest.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
import * as request from "Until/request";
import { info } from "sass";
const TheoryTest = () => {

  let te = { id: -1, name: "" };
  //========--------------lấy danh sách kì thi------------============
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  let [testSchedules, setTestSchedules] = useState([])
  let [testScheduleSeleted, setTestSchedulesSeleted] = useState({})
  let [theoryTests, setTheoryTests] = useState([])
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
    getAllTheoryByExaminationIdAndScheduleTestService(schedu.id)
  };
  //========================= lấy danh sách đề thi theo kì thi=============
  const getAllTheoryByExaminationIdAndScheduleTestService = async (idSche) => {
    try {
      let res = await request.getAPI("TheoryTest/getAllByIdSchedule?IdSche=" + idSche)
      const data = res.data;
      setTheoryTests([...data])
      console.log(res)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  //===================================tài đề đi===================
  const dowloadTheory = async (id) => {
    try {
      let res = await request.getAPI("TheoryTest/DownloadPdfFile?id=" + id,{responseType: 'blob'})
      console.log(res);
      const type = res.headers['content-type']
      const blob = new Blob([res.data], { type: type, encoding: "UTF-8" })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `${id}.pdf`
      link.click()
      link.remove();
    } catch (e) {
      console.log(e)
    }
  }
  //==================xóa đề thi===============
  const deleteTheory = async (id) => {
    try {
      let res = await request.deleteAPI("TheoryTest/" + id)
      console.log(res);
      if (res.statusCode === 200) window.alert("xóa thành công")
      getAllTheoryByExaminationIdAndScheduleTestService(testScheduleSeleted.id)
    } catch (e) {
      console.log(e)
    }
  }

  //----------------------------------------------------------------
  const history = useHistory()
  const handleRedirectAddTheoryTest = () => {
    history.push("Theory/add")
  };
  const [DropdowItem, setDropdowItem] = useState(te)
  const callbackFunction = (childData) => {
    console.log(childData.target.id)
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
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các đề thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddTheoryTest}
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
                          <th scope="col">Tên đề</th>
                          <th scope="col">review</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {(theoryTests.lenght != 0) &&
                        (<tbody>{theoryTests.map((theory, index) =>
                        (
                          <tr key={theory.id}>
                            <td>{index + 1}</td>
                            <td>{theory.name}</td>
                            <td>
                              <Button
                                onClick={() => dowloadTheory(theory.id)}
                                size="sm"
                              >
                                Tải đề
                              </Button>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"

                                  role="button"
                                  size="sm"
                                  color=""
                                //onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  {/* <DropdownItem

                                    idteacher={theory.id}
                                    //onClick={() => (handleRedirectToEdit(theory.id))}
                                  >
                                    Sửa
                                  </DropdownItem> */}

                                  <DropdownItem
                                    onClick={() => (deleteTheory(theory.id))}
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

export default TheoryTest;
