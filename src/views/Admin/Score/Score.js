import { useLocation, Route, Switch, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faFileImport } from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next';
import React, { useEffect } from "react";
import { useState, useContext, useRef } from 'react';
import { StoreContext } from "Until/StoreProvider"
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
//import "./TestSchedule.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import * as request from "Until/request";

const Score = () => {

  const getStudentResultService = async (idExam) => {
    try {
      const response = await request.getAPI(`Examination/${idExam}/import-theoretical-mark`)
      console.log(response.data)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  const handleImportTheoryMark = async (e) => {
    try {
      const response = await request.putAPI(`/Examination/${e}/CreateScorecard`)
      console.log(response)
      if (response.status === 200) {
        await getAllExamServices()
        examinations.map(exam => {
          if (exam.id == e) {
            exam.isCreateScorecard = true
            onExaminationSelected(exam)
          }
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

  const columns = [{
    dataField: 'name',
    text: 'Tên  thí sinh',
    sort: true
  }, {
    dataField: 'identifierCode',
    text: 'Mã sinh viên',
    sort: true
  }, {
    dataField: 'practice',
    text: 'Điểm thực hành',
    sort: true
  }, {
    dataField: 'word',
    text: 'Word',
    sort: true
  }, {
    dataField: 'excel',
    text: 'Excel',
    sort: true
  }, {
    dataField: 'powerPoint',
    text: 'PowerPoint',
    sort: true
  }];
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = React.useContext(StoreContext).examinationSeleted
  let [students, setStudents] = useState([])
  let theoryMark = useRef(null);
  let praticeMark = useRef(null);
  const getAllExamServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      const data = res.data;
      await setExaminations([...data])
      //console.log(examinations)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  const GetAllTestScheduleByIdExaminationServices = async (id) => {
    try {
      let res = await request.getAPI(`Examination/${id}/TestSchedules`)
      const data = res.data;

      console.log(data)
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllExamServices()
  }, [])
  const onExaminationSelected = async (exam) => {
    setExaminationSeleted(exam)
    const studentRespon = await getStudentResultService(exam.id)
    setStudents(studentRespon)
    //console.log(exam)
    //GetAllTestScheduleByIdExaminationServices(exam.id)
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

                      <Col xs="3">
                        <h3 className="mb-0">File chấm thi</h3>
                      </Col>
                      <Col className="text-right" xs="9">
                        <input
                          //onChange={handleFileUpload}
                          type="file"
                          style={{ display: "none" }}
                          accept=".csv, .xlsx"
                          ref={theoryMark}
                        />
                        <Button
                          style={{ fontSize: '12px' }}
                          color="primary"
                          type="file"
                          onClick={()=>{theoryMark.current.click()}}
                          size=""
                        >
                          <FontAwesomeIcon icon={faListOl} />
                          &nbsp; Điểm trắc nghiệm
                        </Button>
                        {/* ------------------------------------------------------ */}
                        <input
                          //onChange={handleFileUpload}
                          type="file"
                          accept=".xlsx"
                          style={{ display: "none" }}
                          ref={praticeMark}
                        />
                        <Button
                          style={{ fontSize: '12px' }}
                          color="primary"
                          onClick={()=>{praticeMark.current.click()}}
                          size=""
                        >
                          <FontAwesomeIcon icon={faFileImport} />
                          &nbsp; Điểm thực hành
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
                    {/* <Table className="align-items-center table-flush " responsive>
                      <thead className="">
                        <tr className="table-success">
                          <th scope="col">Ca thi</th>
                          <th scope="col">Thời gian bắt đầu</th>
                          <th scope="col">Thời gian kết thúc</th>
                          <th scope="col">Tải file</th>
                        </tr>
                      </thead>
                      {(testSchedules.lenght != 0) &&
                        (<tbody>{testSchedules.map((testSchedule, index) => {
                          return (
                            <tr key={index}>
                              <td >{testSchedule.name}</td>
                              <td>{new Date(testSchedule.starTime).toLocaleTimeString()}</td>
                              <td>{new Date(testSchedule.endTime).toLocaleTimeString()}</td>
                              <td>
                                {examinationSeleted.isCreateScorecard && (<i onClick={(e) => { handleDownloadExam(e, testSchedule.id) }} className="fas fa-download fa-lg"></i>)}
                              </td>
                            </tr>
                          )
                        })//if fase----------------
                        }
                        </tbody>)}
                    </Table> */}
                    <BootstrapTable
                      bootstrap4={true}
                      bordered={false}
                      headerWrapperClasses="table-success"
                      classes="align-items-center table-flush table-responsive"
                      keyField='id'
                      data={students}
                      columns={columns}
                    />
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

export default Score;
