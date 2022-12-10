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
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'
// modal
import ModalsWarning from "components/Modals/ModalsWarning";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as request from "Until/request";
import React from "react";
import { useState, useEffect } from 'react';
// data table
import BootstrapTable from 'react-bootstrap-table-next';
import { paginationCustom } from "variables/dataTableOption.js"
import { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
import "./Examination.css";

const Examination = () => {
  const examinationInformInit = [{
    id: null,
    name: "",
    starTime: "",
    endTime: "",
    location: "",
    minimumTheoreticalMark: 0,
    minimumPracticeMark: 0,
    gradingDeadline: ""
  }]
  let [examinations, setExaminations] = useState(examinationInformInit)
  const history = useHistory()

  let [modal, setModal] = useState(false);
  let [idDelete, SetIdDelete] = useState()

  const { warning, info, primary, danger, success } = useAlert()
  const handleRedirectAddExam = () => {
    history.push("examination/add")
  };
  const handleRedirectToEdit = (id) => {
    history.push(history.location.pathname + "/edit?id=" + id)
  }

  const deleteExamination = (e) => {
    //console.log(e)
    deleteExaminationService(e)
  }

  //console.log("rerender")

  //console.log(teachers)
  //=======-------- get list of examination---------=========
  const deleteExaminationService = async (e) => {
    try {
      const response = await request.deleteAPI("Examination/" + e)
      console.log(response)
      if (response.status == 200) {
        success("xóa thành công")
        getAllExamServices()

      }
      else {
        danger("xóa kì thi thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      danger("Xóa kì thi thất bại")
      console.log(e)
    }
  }

  const getAllExamServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      console.log(res.status)
      if (res.status == 401) {
        console.log("login")
      }
      const data = res.data;
      //data.starTime = new Date(data.starTime).toLocaleDateString() +"oo"
      setExaminations([...data])
      console.log(examinations)
      //console.log(data)
    } catch (e) {
      warning("Có lỗi trong quá trình thực thi")
      console.log(e)
    }
  }
  //  option serch table
  const { SearchBar } = Search;
  //   option for data table
  //init table info
  const columns = [{
    dataField: 'name',
    text: 'Tên kì thi',
    sort: true
  }, {
    dataField: 'examCode',
    text: 'Mã kì thi',
    sort: true
  },
  {
    dataField: 'location',
    text: 'Địa điểm thi',
    sort: true
  },
  {
    dataField: 'starTime',
    text: 'Ngày thi',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return new Date(cell).toLocaleDateString()
    }
  },
  {
    dataField: 'edit',
    text: '',
    formatter: (cell, row, rowIndex, formatExtraData) => {
      console.log(row)
      var r = 0
      return (<div className="text-right">
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
              onClick={() => (handleRedirectToEdit(row.id))}
            >
              Sửa
            </DropdownItem>
            <DropdownItem
              //onClick={() => (deleteExamination(row.id))}
              onClick={() => {
                SetIdDelete(row.id)
                setModal(!modal)
              }}
            >
              Xóa
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      )
    }
  }];
  useEffect(() => {
    getAllExamServices()
  }, [])
  //console.log(examinations)
  return (
    <>
      <HeaderEmpty />
      <div>
      <ModalsWarning onExecute={deleteExamination} displayUseState={[modal, setModal]} idDelete={idDelete} ></ModalsWarning>
      </div>
      {/* Page content */}
      <Container className="mt--8 Body_Content" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div>
                <CardBody>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col sm="7">
                        <h3 className="mb-0">Danh sách các kì thi</h3>
                      </Col>
                      <Col className="text-right" sm="5">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddExam}
                        //size="sm"
                        >
                          Tạo mới
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div className="table-responsive">
                    {/* <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Tên Kì Thi</th>
                          <th scope="col">Mã kì thi</th>
                          <th scope="col">Địa điểm thi</th>
                          <th scope="col">Bắt Đầu</th>
                          <th scope="col">Kết Thúc</th>
                          <th scope="col">Hạn Chấm Thi</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      {(examinations.lenght != 0) &&
                        (<tbody>{examinations.map((examinations, index) =>
                        (
                          <tr key={examinations.id}>
                            <td>{examinations.name}</td>
                            <td>{examinations.examCode}</td>
                            <td>{examinations.location}</td>
                            <td>{new Date(examinations.starTime).toLocaleDateString()}</td>
                            <td>{new Date(examinations.endTime).toLocaleDateString()}</td>
                            <td>{new Date(examinations.gradingDeadline).toLocaleDateString()}</td>

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
                                    onClick={() => (handleRedirectToEdit(examinations.id))}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => (deleteExamination(examinations.id))}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))}
                        </tbody>)}
                    </Table> */}
                    <PaginationProvider
                      pagination={paginationCustom(examinations.length)}
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
                              data={examinations}
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
                    // classes="align-items-center table-flush" 
                    keyField='id' 
                    data={examinations} 
                    columns={columns}
                    pagination={pagination}
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

export default Examination;
