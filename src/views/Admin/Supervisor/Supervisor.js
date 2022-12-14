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
import { useEffect, useContext, Fragment } from "react";
import { StoreContext } from "Until/StoreProvider"
import { useState } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
// data table 
import BootstrapTable from 'react-bootstrap-table-next';
import { pagination } from "variables/dataTableOption.js"
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
//  react hook alerts
import { useAlert } from 'react-bootstrap-hooks-alert'
import 'react-bootstrap-hooks-alert/dist/Alert.css'

import { useHistory } from "react-router-dom";
import "./Supervisor.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
import * as request from "Until/request";
import { info } from "sass";
const Supervisor = () => {

  const { warning, info, primary, danger, success } = useAlert()
  let te = { id: -1, name: "" };
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useContext(StoreContext).examinationSeleted
  let [testSchedules, setTestSchedules] = useState([])
  let [testScheduleSeleted, setTestSchedulesSeleted] = useState({})
  let [examinationRooms, setexaminationRooms] = useState([])
  //   option for data table
  //init table info
  const columns = [{
    dataField: '',
    text: 'STT',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1
    }
  }, {
    dataField: 'examinationRoom.name',
    text: 'T??n ph??ng',
    sort: true
  }, {
    dataField: 'examinationRoom.capacity',
    text: 'S???c ch???a',
    sort: true
  },
  {
    dataField: 'examinationRoom.location',
    text: 'V??? tr??',
    sort: true
  },
  {
    dataField: 'teachers[0]',
    text: 'Gi??m th??? 1',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      if (cell !== undefined) {
        return (
          <Fragment>
            {cell.fullName}<br></br>
            MSCB - {cell.identifierCode}
          </Fragment>
        )
      }
      else
        return "ch??a c?? gi??m th???"
    }
  }, {
    dataField: 'teachers[1]',
    text: 'Gi??m th??? 2',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      if (cell !== undefined) {
        return (
          <Fragment>
            {cell.fullName}<br></br>
            MSCB - {cell.identifierCode}
          </Fragment>
        )
      }
      else
        return "ch??a c?? gi??m th???"
    }
  }]
  const getAllExaminationsServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      if (res.status == 200) {
        const data = res.data;
        setExaminations([...data])
        data.forEach(item => {
          if (item.id === examinationSeleted.id) {
            setExaminationSeleted(item)
          }
        })
        //console.log(examinations)
        console.log(data)
        //success("L???y danh s??ch kid thi th??nh c??ng")

      }
    } catch (e) {
      danger("L???y danh s??ch k?? thi th???t b???i")
      console.log(e)
    }
  }
  // ================khi m???t k?? thi ???????c ch???n trong dropdown===============
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    setTestSchedulesSeleted({})
    console.log(exam)
    //getRoomByIdScheduleTest(null)
    getAllScheduleTestByExaminationIdService(exam.id)
  };
  //========================= l???y danh s??ch ca thi theo k?? thi=============
  const getAllScheduleTestByExaminationIdService = async (id) => {
    try {
      let res = await request.getAPI("TestShedule/GetAllScheduleByIdExamination?IdExam=" + id)
      const data = res.data;
      setTestSchedules([...data])
      console.log(data)
    } catch (e) {
      danger("L???y danh s??ch ca thi th???t b???i")
      console.log(e)
    }
  }
  // ============khi m???t ca thi ???????c ch???n trong dropdown========
  const onScheduleTestSelected = (schedu) => {
    setTestSchedulesSeleted(schedu)
    console.log(schedu)
    getRoomByIdScheduleTest(schedu.id)
  };
  //========================= l???y danh s??ch ph??ng thi theo ca=============

  const getRoomByIdScheduleTest = async (id) => {
    try {
      if (id == null) setexaminationRooms([])
      let res = await request.getAPI("ExaminationRoom/GetAllByIdTestSchedule?idTestSchedule=" + id)
      const data = res.data;
      setexaminationRooms([...data])
      console.log(data)
    } catch (e) {
      //danger("L???y danh s??ch ph??ng thi th???t b???i")
      console.log(e)
    }
  }


  //----------------------------------------------------------------
  const history = useHistory()
  // --------------------t??? ?????ng chia gi??o vi??n---------------
  const handleAutoMergeRoomAndTeacher = async () => {
    try {
      if (testScheduleSeleted.id == null) {
        if (examinationSeleted !== null) {
          testSchedules.map(async (sche) => {
            let res = await request.postAPI("Supervisor/AutoCreateSupervisor?IdTestSchedule=" + sche.id)
            console.log(res)
            if (res.status === 200) {
              if (res.data === 'Not thing to do') {
                warning("Gi??m th??? gi??? nguy??n")
                getAllExaminationsServices()
              } else {
                getRoomByIdScheduleTest(testScheduleSeleted.id)
                success("T???o t??? ?????ng th??nh c??ng")
                getAllExaminationsServices()
              }
            }
            return;
          })
        } else {
          warning("Xin ch???n k?? thi tr?????c")
        }
      } else {
        let res = await request.postAPI("Supervisor/AutoCreateSupervisor?IdTestSchedule=" + testScheduleSeleted.id)
        console.log(res)
        if (res.status === 200) {
          if (res.data === 'Not thing to do') {
            warning("Gi??m th??? gi??? nguy??n")
          } else {
            getRoomByIdScheduleTest(testScheduleSeleted.id)
            success("T???o t??? ?????ng th??nh ??ng")
          }
        } else {
          danger("t???o t??? ????ng th???t b???i")
        }
      }
    } catch (e) {
      if (e.response.status == 400 && e.response.data == "not enough teachers") {
        warning("s??? l?????ng gi??o vi??n kh??ng ????? ????? chia ph??ng")
      }
      if (e.response.status == 400 && e.response.data == "Too more student") {
        warning("S??? l?????ng ph??ng kh??ng ????? ????? chia")
      }
      console.log(e)
    }
  };
  const [DropdowItem, setDropdowItem] = useState(te)
  const callbackFunction = (childData) => {
    console.log(childData.target.id)
  }

  //=====================
  const SupervisorInf = (teacherInf) => {

    console.log(teacherInf)
    let count = 0
    for (var t in teacherInf) {
      count++;
    }
    console.log(count)
    if (count >= 2) {
      return (
        <Fragment>
          <td>
            {teacherInf[0].fullName}<br></br>
            MSCB - {teacherInf[0].identifierCode}
          </td>
          <td>
            {teacherInf[1].fullName}<br></br>
            MSCB - {teacherInf[1].identifierCode}
          </td>
        </Fragment>
      )
    }
    else
      return (
        <Fragment>
          <td>ch??a c?? gi??m th???</td>
          <td>ch??a c?? gi??m th???</td>
        </Fragment>
      )
  }
  //=====================
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
                  <div>
                    Ch???n k?? thi: &ensp;
                    <DropdownListInline
                      item={examinations}
                      onItemSelected={onExaminationSelected}
                    >{examinationSeleted.name || "ch???n k?? thi"}
                    </DropdownListInline>
                  </div>
                  <br></br>
                  <div>
                    Ch???n ca thi: &ensp;
                    <DropdownListInline
                      item={testSchedules}
                      onItemSelected={onScheduleTestSelected}
                    >{testScheduleSeleted.name || "ch???n ca thi"}
                    </DropdownListInline>
                  </div>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="8">
                        <h3 className="mb-0">Danh s??ch ph??ng thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        {!examinationSeleted.isCreateScorecard &&
                          !examinationSeleted.isEnterScore &&
                          !examinationSeleted.isAssignedSupervisor && (
                            <Button
                              color="primary"
                              onClick={handleAutoMergeRoomAndTeacher}
                            //size="sm"
                            >
                              S???p s???p t??? ?????ng
                            </Button>
                          )}
                          
                          
                      </Col>
                    </Row>
                  </CardHeader>
                  <div className="table-responsive">
                    <BootstrapTable
                      bootstrap4={true}
                      bordered={false}
                      headerWrapperClasses="table-success"
                      classes="align-items-center table-flush table-responsive"
                      id="tb-layout-auto"
                      // classes="align-items-center table-flush" 
                      keyField='examinationRoom.id'
                      data={examinationRooms}
                      columns={columns}
                      pagination={pagination}
                    />
                    {/* <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">T??n ph??ng</th>
                          <th scope="col">S???c ch???a</th>
                          <th scope="col">V??? tr??</th>
                          <th scope="col">Gi??m th??? 1</th>
                          <th scope="col">Gi??m th??? 2</th>
                        </tr>
                      </thead>
                      {(examinationRooms.lenght != 0) &&
                        (<tbody>{examinationRooms.map((room, index) =>
                        (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{room.examinationRoom.name}</td>
                            <td>{room.examinationRoom.capacity}</td>
                            <td>{room.examinationRoom.location}</td>
                            {SupervisorInf(room.teachers)}

                          </tr>
                        ))//if fase----------------
                        }
                        </tbody>)}
                    </Table> */}
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

export default Supervisor;
