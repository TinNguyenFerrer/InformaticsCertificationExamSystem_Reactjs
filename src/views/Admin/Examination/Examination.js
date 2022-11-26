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
import BootstrapTable from 'react-bootstrap-table-next';
import { sizePerPageRenderer, pagination } from "variables/dataTableOption.js"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as request from "Until/request";
import React from "react";
import { useState, useEffect } from 'react';
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
        console.log("thành cong" + e)
        getAllExamServices()

      }
      else {
        window.alert("xóa giáo viên thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      window.alert("Xóa giáo viên thất bại")
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
      console.log(e)
    }
  }
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
              onClick={() => (deleteExamination(row.id))}
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
      {/* Page content */}
      <Container className="mt--8 Body_Content" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div>
                <CardBody>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các kì thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddExam}
                          size="sm"
                        >
                          Tạo mới
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
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

                    <BootstrapTable 
                    bootstrap4={true} 
                    bordered={false} 
                    headerWrapperClasses="table-success" 
                    classes="align-items-center table-flush" 
                    keyField='id' data={examinations} 
                    columns={columns}
                    pagination={pagination}
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

export default Examination;
