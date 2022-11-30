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
      return rowIndex+1
    }
  }, {
    dataField: 'examinationRoom.name',
    text: 'Tên phòng',
    sort: true
  }, {
    dataField: 'examinationRoom.capacity',
    text: 'Sức chứa',
    sort: true
  },
  {
    dataField: 'examinationRoom.location',
    text: 'Vị trí',
    sort: true
  },
  {
    dataField: 'teachers[0]',
    text: 'Giám thị 1',
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
        return "chưa có giám thị"
    }
  }, {
    dataField: 'teachers[1]',
    text: 'Giám thị 2',
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
        return "chưa có giám thị"
    }
  }]
  const getAllExaminationsServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      if (res.status == 200) {
        const data = res.data;
        setExaminations([...data])
        //console.log(examinations)
        console.log(data)
        //success("Lấy danh sách kid thi thành công")

      }
    } catch (e) {
      danger("Lấy danh sách kì thi thất bại")
      console.log(e)
    }
  }
  // ================khi một kì thi được chọn trong dropdown===============
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    setTestSchedulesSeleted({})
    console.log(exam)
    //getRoomByIdScheduleTest(null)
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
      danger("Lấy danh sách ca thi thất bại")
      console.log(e)
    }
  }
  // ============khi một ca thi được chọn trong dropdown========
  const onScheduleTestSelected = (schedu) => {
    setTestSchedulesSeleted(schedu)
    console.log(schedu)
    getRoomByIdScheduleTest(schedu.id)
  };
  //========================= lấy danh sách phòng thi theo ca=============

  const getRoomByIdScheduleTest = async (id) => {
    try {
      if (id == null) setexaminationRooms([])
      let res = await request.getAPI("ExaminationRoom/GetAllByIdTestSchedule?idTestSchedule=" + id)
      const data = res.data;
      setexaminationRooms([...data])
      console.log(data)
    } catch (e) {
      danger("Lấy danh sách phòng thi thất bại")
      console.log(e)
    }
  }


  //----------------------------------------------------------------
  const history = useHistory()
  // --------------------tự động chia giáo viên---------------
  const handleAutoMergeRoomAndTeacher = async () => {
    try {
      if (testScheduleSeleted.id == null) {
        if (examinationSeleted !== null) {
          testSchedules.map(async (sche) => {
            let res = await request.postAPI("Supervisor/AutoCreateSupervisor?IdTestSchedule=" + sche.id)
            console.log(res)
            if (res.status === 200) {
              success("Tạo tự động thành ông")
            } else {
              danger("tạo tự đông thất bại")
            }
            return;
          })
        } else {
          warning("Xin chọn kì thi trước")
        }
      } else {
        let res = await request.postAPI("Supervisor/AutoCreateSupervisor?IdTestSchedule=" + testScheduleSeleted.id)
        console.log(res)
        if (res.status === 200) {
          getRoomByIdScheduleTest(testScheduleSeleted.id)
          success("Tạo tự động thành ông")
        } else {
          danger("tạo tự đông thất bại")
        }
      }
    } catch (e) {
      if (e.response.status == 400 && e.response.data == "not enough teachers") {
        warning("số lượng giáo viên không đủ để chia phòng")
      }
      if (e.response.status == 400 && e.response.data == "Too more student") {
        warning("Số lượng phòng không đủ để chia")
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
          <td>chưa có giám thị</td>
          <td>chưa có giám thị</td>
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
                        <h3 className="mb-0">Danh sách phòng thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleAutoMergeRoomAndTeacher}
                          size="sm"
                        >
                          Sắp sếp tự động
                        </Button>

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
                          <th scope="col">Tên phòng</th>
                          <th scope="col">Sức chứa</th>
                          <th scope="col">Vị trí</th>
                          <th scope="col">Giám thị 1</th>
                          <th scope="col">Giám thị 2</th>
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
