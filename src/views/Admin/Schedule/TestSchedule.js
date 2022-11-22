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
import { useEffect, useContext } from "react";
import { StoreContext } from "Until/StoreProvider"
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
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
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
  const handleAutoCreateSchedule = async (id) => {
    try {
      if (id == null) {
        window.alert("Xin chọn kì thi trước")
        return;
      }
      const response = await request.postAPI("TestShedule/AutoCreateTestSchedule?IdExam=" + id)
      console.log(response)
      if (response.status == 200) {
        //console.log("thành cong"+e)
        //getAllTeacherServices()
        examinations.map(exam => {
          if (exam.id == id)
            onExaminationSelected(exam)
        })

      }
      else {
        window.alert("Tạo tự động thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      window.alert("Tạo tự động thất bại")
      console.log(e)
    }
  };

  const [DropdowItem, setDropdowItem] = useState(te)
  let [examinations, setExaminations] = useState([])
  let [testSchedules, setTestSchedules] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useContext(StoreContext).examinationSeleted
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

  const GetAllTestScheduleByIdExaminationServices = async (id) => {
    try {
      let res = await request.getAPI("TestShedule/GetAllByIdExamination?IdExam=" + id)
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
    if (examinationSeleted.id !== undefined)
      GetAllTestScheduleByIdExaminationServices(examinationSeleted.id)
  }, [])
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    GetAllTestScheduleByIdExaminationServices(exam.id)
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
                <div>
                    Chọn kì thi: &ensp;
                    <DropdownListInline
                      item={examinations}
                      onItemSelected={onExaminationSelected}
                    >{examinationSeleted.name || "chọn kì thi"}
                    </DropdownListInline>
                  </div>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các ca thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={() => handleAutoCreateSchedule(examinationSeleted.id)}
                          size="sm"
                        >
                          Tạo tự động
                        </Button>

                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
                    <Table className="align-items-center table-flush " responsive>
                      <thead className="">
                        <tr className="table-success">
                          <th scope="col">Ca thi</th>
                          <th scope="col">Phòng thi</th>
                          <th scope="col">Thời gian bắt đầu</th>
                          <th scope="col">Thời gian kết thúc</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {(testSchedules.lenght != 0) &&
                        (<tbody>{testSchedules.map((testSchedule, index) => {
                          let td;
                          if ((index > 0) && testSchedules[index - 1].schedu.name == testSchedule.schedu.name) {
                            return (
                              <tr key={index}>
                                <td className="border-0"></td>
                                <td >{testSchedule.room}</td>
                                <td>{new Date(testSchedule.schedu.starTime).toLocaleTimeString()}</td>
                                <td>{new Date(testSchedule.schedu.endTime).toLocaleTimeString()}</td>
                                <td className="text-right">
                                  <Link to={() => `/admin/testschedules/detailschedule?id=${testSchedule.schedu.id}&examroom_testscheid=${testSchedule.exam_testscheid}`}> Danh sách</Link>
                                </td>
                              </tr>
                            )
                          } else {

                            return (
                              <tr key={index}>
                                <td className="font-weight-bold border-top-1  border-success">{testSchedule.schedu.name}</td>
                                <td className=" border-success">{testSchedule.room}</td>
                                <td className="border-success">{new Date(testSchedule.schedu.starTime).toLocaleTimeString()}</td>
                                <td className="border-success">{new Date(testSchedule.schedu.endTime).toLocaleTimeString()}</td>
                                <td className="text-right border-success">
                                  <Link to={() => `/admin/testschedules/detailschedule?id=${testSchedule.schedu.id}&examroom_testscheid=${testSchedule.exam_testscheid}`}> Danh sách</Link>
                                </td>
                              </tr>
                            )
                          }
                        })//if fase----------------
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
