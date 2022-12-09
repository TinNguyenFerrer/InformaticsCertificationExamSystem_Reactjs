import { useLocation, Route, Switch, Link } from "react-router-dom";
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faFileImport } from '@fortawesome/free-solid-svg-icons'
// data table
import BootstrapTable from 'react-bootstrap-table-next';
import { paginationCustom } from "variables/dataTableOption.js"
import { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// react state
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
import DropdownListInline from "components/Dropdown/DropdownListInline";
import * as request from "Until/request";

const Score = () => {
  const { warning, info, primary, danger, success } = useAlert()
  const getStudentResultService = async (idExam) => {
    try {
      const response = await request.getAPI(`Examination/${idExam}/get-marks`)
      console.log(response.data)
      return response.data
    } catch (e) {
      console.log(e)
      return []
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
  //  options for data table
  const { SearchBar } = Search;
  const columns = [{
    dataField: 'name',
    text: 'Tên  thí sinh',
    sort: true
  }, {
    dataField: 'identifierCode',
    text: 'Mã sinh viên',
    sort: true
  }, {
    dataField: 'theory',
    text: 'Điểm lý thuyết',
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
  const handleFileUploadTheoryMark = async (e) => {
    try {
      console.log(e.target.files[0])
      if (examinationSeleted.id == undefined) {
        window.alert("Chọn kì thi")
        return
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await request.putAPI(`FinalResult/import-theoretical-mark`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log(response);
      if (response.status === 200) {
        success("Nhập điểm thành công")
        const studentResponse = await getStudentResultService(examinationSeleted.id)
        setStudents(studentResponse)
      }
    } catch (e) {
      danger("Nhập điểm thất bại")
      console.error(e)
    }
  }
  const handleFileUploadPraticeMark = async (e) => {
    try {
      console.log(e.target.files[0])
      if (examinationSeleted.id == undefined) {
        window.alert("Chọn kì thi")
        return
      }
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await request.putAPI(`FinalResult/import-practice-mark`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log(response);
      if (response.status === 200) {
        success("Nhập điểm thành công")
        const studentResponse = await getStudentResultService(examinationSeleted.id)
        setStudents(studentResponse)
      }
    } catch (e) {
      danger("Nhập điểm thất bại")
      console.error(e)
    }
  }
  useEffect(() => {
    getAllExamServices()
    if (examinationSeleted.id !== undefined) {
      (async () => {
        const studentRespon = await getStudentResultService(examinationSeleted.id)
        setStudents(studentRespon)
      }
      )()
    }

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
                  <DropdownListInline
                    item={examinations}
                    onItemSelected={onExaminationSelected}
                  >{examinationSeleted.name || "chọn kì thi"}</DropdownListInline>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="3">
                        <h3 className="mb-0">Nhập điểm thi</h3>
                      </Col>
                      <Col className="text-right" xs="9">
                        <input
                          onChange={handleFileUploadTheoryMark}
                          type="file"
                          style={{ display: "none" }}
                          accept=".csv"
                          ref={theoryMark}
                        />
                        <Button
                          style={{ fontSize: '12px' }}
                          color="primary"
                          type="file"
                          onClick={() => { theoryMark.current.click() }}
                          size=""
                        >
                          <FontAwesomeIcon icon={faListOl} />
                          &nbsp; Điểm trắc nghiệm
                        </Button>
                        {/* ------------------------------------------------------ */}
                        <input
                          onChange={handleFileUploadPraticeMark}
                          type="file"
                          accept=".xlsx"
                          style={{ display: "none" }}
                          ref={praticeMark}
                        />
                        <Button
                          style={{ fontSize: '12px' }}
                          color="primary"
                          onClick={() => { praticeMark.current.click() }}
                          size=""
                        >
                          <FontAwesomeIcon icon={faFileImport} />
                          &nbsp; Điểm thực hành
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div className="table-responsive">
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
                    <PaginationProvider
                      pagination={paginationCustom(students.length)}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <div className="table-responsive">

                            <ToolkitProvider
                              bootstrap4={true}
                              keyField="id"
                              columns={columns}
                              data={students}
                              search
                            >
                              {
                                toolkitprops => (
                                  <React.Fragment>
                                    <Row >
                                      <Col md="4" xs="7">
                                        <div className="d-inline-block">Tìm kiếm:&ensp;</div>
                                        <div className="d-inline-block">
                                          <SearchBar className=" d-inline-block shadow border border-info" placeholder=" Tìm kiếm ...." {...toolkitprops.searchProps} />
                                        </div>
                                      </Col>
                                      <Col md="8" xs="12" className="d-flex justify-content-end">
                                        {/* <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                      /> */}
                                      </Col>
                                    </Row>
                                    <BootstrapTable
                                      //bootstrap4={true}
                                      bordered={false}
                                      headerWrapperClasses="table-success"
                                      classes="align-items-center table-flush table-responsive"
                                      id="tb-layout-auto"
                                      {...toolkitprops.baseProps}
                                      // columns={toolkitprops.baseProps.columns}
                                      // classes="align-items-center table-flush" 
                                      // keyField={toolkitprops.baseProps.keyField}
                                      // data={toolkitprops.baseProps.data}
                                      // columns={columns}
                                      // pagination={pagination}
                                      {...paginationTableProps}
                                    //pagination={}
                                    />
                                  </React.Fragment>
                                )
                              }
                            </ToolkitProvider>
                            <Row>
                              <Col lg="6">
                                <SizePerPageDropdownStandalone
                                  {...paginationProps}
                                />
                                <PaginationTotalStandalone
                                  {...paginationProps}
                                />
                              </Col>
                              <Col lg="6" className="d-flex justify-content-end ">
                                <PaginationListStandalone  {...paginationProps} />
                              </Col>
                            </Row>
                          </div>
                        )
                      }

                    </PaginationProvider>
                    {/* <BootstrapTable
                      bootstrap4={true}
                      bordered={false}
                      headerWrapperClasses="table-success"
                      classes="align-items-center table-flush table-responsive"
                      id="tb-layout-auto"
                      keyField='id'
                      data={students}
                      columns={columns}
                    /> */}
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
