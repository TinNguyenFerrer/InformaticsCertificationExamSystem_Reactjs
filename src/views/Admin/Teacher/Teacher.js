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
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
import HeaderEmpty from "components/Headers/HeaderEmpty";
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'
// data table
import BootstrapTable from 'react-bootstrap-table-next';
import { paginationCustom } from "variables/dataTableOption.js"
import { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// reactstrap added
import {
  Button,
  Dropdown,
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
import "./Teacher.css"
import DropdownList from "components/Dropdown/DropdownList.js";

const Teacher = () => {
  const { warning, info, primary, danger, success } = useAlert()
  const history = useHistory()
  const handleRedirectAddTeacher = () => {
    history.push("teacher/add")
  };
  const handleRedirectToEdit = (id) => {
    history.push("teacher/edit?id=" + id)
  }
  const teacherInformInit = [{
    id: "",
    fullName: "",
    identifierCode: "",
    phoneNumber: "",
    email: "",
    address: ""
  }]
  let [teachers, setTeachers] = useState([])
  //console.log("rerender")
  //console.log(teachers)
  const getAllTeacherServices = () => {
    request.getAPI("Teacher/GetAll")
      .then((res) => {

        const t = res.data
        setTeachers(t);
        console.log(t)
      }).catch((e) => {
        danger("Có lỗi trong quá trình thực thi")
        console.log(e)
      })
  }
  const unLockTeacher = async(id) => {
    try {
      const response = await request.putAPI(`Teacher/${id}/UnLock`)
      if (response.status === 200) {
        success("Mở khóa thành công")
        getAllTeacherServices()
      } else {
        danger("Mở khóa giáo viên thất bại")
      }
    } catch (e) {
      danger("Mở khóa giáo viên thất bại")
      console.log(e);
    }
  }
  const lockTeacher =async(id)=>{
    try {
      const response = await request.putAPI(`Teacher/${id}/Lock`)
      if (response.status === 200) {
        success("Khóa giáo viên thành công")
        getAllTeacherServices()
      } else {
        danger("Khóa giáo viên thất bại")
      }
    } catch (e) {
      danger("Lỗi! Khóa giáo viên thất bại")
      console.log(e);
    }
  }
  //  option serch table
  const { SearchBar } = Search;
  //  Data table option
  const columns = [{
    dataField: 'fullName',
    text: 'Tên giáo viên',
    sort: true
  }, {
    dataField: 'address',
    text: 'địa chỉ',
    sort: true
  },
  {
    dataField: 'identifierCode',
    text: 'mã giáo viên',
    sort: true
  }, {
    dataField: 'phoneNumber',
    text: 'SDT',
    sort: true
  }, {
    dataField: 'email',
    text: 'EmailT',
    sort: true
  }, {
    dataField: 'locked',
    text: 'Khóa',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      if (cell) return <i className="fas fa-lock"></i>
      return ""
    }
  },{
    dataField: 'edit',
    text: '',
    formatter: (cell, row, rowIndex, formatExtraData) => {
      console.log(row)
      var r = 0
      return (<div className="text-right">
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

              idteacher={row.id}
              onClick={() => (handleRedirectToEdit(row.id))}
            >
              Sửa
            </DropdownItem>

            <DropdownItem

              idteacher={row.id}
              onClick={() => (deleteTeacher(row.id))}
            >
              Xóa
            </DropdownItem>
            {row.locked ?
              (
                <DropdownItem
                  idteacher={row.id}
                  onClick={() => (unLockTeacher(row.id))}
                >
                  Mở khóa
                </DropdownItem>
              ) : (
                <DropdownItem
                  idteacher={row.id}
                  onClick={() => (lockTeacher(row.id))}
                >
                  Khóa
                </DropdownItem>
              )
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      )
    }
  }];

  useEffect(() => {
    getAllTeacherServices()
  }, [])

  const deleteTeacher = (e) => {
    //console.log(e)
    const deleteTecherAPI = async (e) => {
      try {
        const response = await request.deleteAPI("Teacher/" + e)
        //console.log(response)
        if (response.status == 200) {
          console.log("thành cong")
          getAllTeacherServices()

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
    deleteTecherAPI(e)
  }

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => {
    return (
      <div className="btn-group">
        <button type="button" class="btn btn-outline-info btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {currSizePerPage}
        </button>
        <div className="dropdown-menu">
          {
            options.map(option => (
              <div className="dropdown-item"
                key={option.text}
                onClick={() => onSizePerPageChange(option.page)}
              >
                {option.text}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  // const pagination = paginationFactory({
  //   sizePerPageRenderer,
  //   sizePerPage: 5,
  //   lastPageText: '>>',
  //   firstPageText: '<<',
  //   nextPageText: '>',
  //   prePageText: '<',
  //   showTotal: true,
  //   alwaysShowAllBtns: true,
  // });
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
                      <Col sm="7">
                        <h3 className="mb-0">Danh sách giám thị</h3>
                      </Col>
                      <Col className="text-right" sm="5">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddTeacher}
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
                          <th scope="col">STT</th>
                          <th scope="col">Tên giáo viên</th>
                          <th scope="col">địa chỉ</th>
                          <th scope="col">mã giáo viên</th>
                          <th scope="col">sdt</th>
                          <th scope="col">Email</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>

                      {(teachers.lenght != 0) &&
                        (<tbody>{teachers.map((teacher, index) =>
                        (
                          <tr key={teacher.id}>
                            <td>{index}</td>
                            <td>{teacher.fullName}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.identifierCode}</td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.email}</td>
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

                                    idteacher={teacher.id}
                                    onClick={() => (handleRedirectToEdit(teacher.id))}
                                  >
                                    Sửa
                                  </DropdownItem>

                                  <DropdownItem

                                    idteacher={teacher.id}
                                    onClick={() => (deleteTeacher(teacher.id))}
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

                    </Table> */}
                    <PaginationProvider
                      pagination={paginationCustom(teachers.length)}
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
                              data={teachers}
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
                      // classes="align-items-center table-flush table-responsive"
                      classes="align-items-center table-flush table-responsive"
                      id="tb-layout-auto"
                      keyField='id'
                      data={teachers}
                      columns={columns}
                      pagination={pagination}
                    //pagination={ paginationFactory() }
                    /> */}
                    {(teachers.length == 0) && (<div className="d-flex justify-content-center">
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

export default Teacher;
