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
// data table
import BootstrapTable from 'react-bootstrap-table-next';
import { paginationCustom } from "variables/dataTableOption.js"
import { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
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
  // setting for data table
  const { SearchBar } = Search;
  const history = useHistory()
  const columns = [{
    dataField: 'id',
    text: 'STT',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1
    }
  },{
    dataField: 'identifierCode',
    text: 'Mã thí sinh',
    sort: true
  }, {
    dataField: 'name',
    text: 'Tên thí sinh',
    sort: true
  }, {
    dataField: 'fileSubmitted.fileWord',
    text: 'Word',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <React.Fragment>
      {cell ? <i className="fas fa-file-word text-primary fa-lg"></i> : <i className="fas fa-exclamation-triangle text-red fa-lg"></i>}
      </React.Fragment>
      )
    }
  },{
    dataField: 'fileSubmitted.fileExcel',
    text: 'Excel',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <React.Fragment>
      {cell ? <i className="fas fa-file-excel fa-lg text-success"></i> : (<i className="fas fa-exclamation-triangle text-red fa-lg"></i>)}
      </React.Fragment>
      )
    }
  }, {
    dataField: 'fileSubmitted.filePowerPoint',
    text: 'PowerPoint',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <React.Fragment>
      {cell ? <i className="fas fa-file-powerpoint fa-lg text-orange"></i> : <i className="fas fa-exclamation-triangle text-red fa-lg"></i>}
      </React.Fragment>
      )
    }
  }]
  const handleRedirectAddTeacher = () => {
    history.push("teacher/add")
  };
  let [loading, SetLoading] = useState(true)
  let [students, setStudents] = useState([])
  let [lockStudents, setLockStudents] = useState(true)
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
      SetLoading(false)
      console.log(data)
    } catch (e) {
      SetLoading(false)
      console.log(e)
    }
  }
  const checkUserIsLockedService = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const examroom_testscheid = queryParams.get('examroom_testscheid');
      const param = {
        params: {
          ExamRom_TestScheid: examroom_testscheid
        }
      }
      console.log(examroom_testscheid)
      let res = await request.getAPI(`Student/CheckStudentIsLocked`, param)
      //const data = res.data;
      if (res.status === 200) {
        if(res.data === false){
          setLockStudents(false)
        }
      } 
      //setStudents([...data])
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  //-----------mở bài làm----------
  const unlockUserService = async () => {
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
        setLockStudents(pre => !pre)
      } else {
        window.alert("Kích hoạt thất bại xin thử lại")
      }
      //setStudents([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  //-----------khóa bài làm----------
  const lockUserService = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const examroom_testscheid = queryParams.get('examroom_testscheid');
      const param = {
        params: {
          ExamRom_TestScheid: examroom_testscheid
        }
      }
      let res = await request.getAPI(`Student/LockStudent`, param)
      const data = res.data;
      if (res.status == 200) {
        window.alert("Bài thi kết thúc");
        setLockStudents(pre => !pre)
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
    checkUserIsLockedService()
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
                  {lockStudents ?
                    (<Button color="success" onClick={unlockUserService}>Mở bài làm</Button>) :
                    <Button color="danger" onClick={lockUserService}>Khóa làm bài</Button>
                  }
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h2 className="mb-0">Danh sách nộp bài</h2>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button color="primary" onClick={getAllInfoSubmitFileOfStudentBySchedule_RoomIdService}>
                          Kiểm tra
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div className="table-responsive">

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

                    {/* <Table className="align-items-center table-flush" responsive>
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
                    </Table> */}
                    {(loading) && (<div className="d-flex justify-content-center">
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
