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
import React, { Suspense } from "react";
import * as request from "Until/request";
import { useState, useEffect } from 'react';
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'
// data table
import BootstrapTable from 'react-bootstrap-table-next';
import { paginationCustom } from "variables/dataTableOption.js"
import { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
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
  DropdownMenu,
  Spinner
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Room.css"
import DropdownList from "components/Dropdown/DropdownList.js";
import { info } from "sass";

const Room = () => {
  const { warning, info, primary, danger, success } = useAlert()
  const history = useHistory()
  const handleRedirectAddTeacher = () => {
    history.push("room/add")
  };
  const handleRedirectToEdit = (id) => {
    history.push("room/edit?id=" + id)
  }
  const RoomInformInit = [{
    id: "",
    name: "",
    location: "",
    capacity: ""
  }]
  let [rooms, setRooms] = useState([])
  let [loading, setLoading] = useState(true)
  const getAllRoomServices = async () => {
    try {
      let res = await request.getAPI("ExaminationRoom/GetAll")
      const data = res.data;
      if (res.status === 200) setLoading(false)
      setRooms([...data])
      console.log(data)
    } catch (e) {
      warning("Có lỗi trong quá trình thực thi")
      console.log(e)
    }
  }
  useEffect(() => {
    getAllRoomServices()
  }, [])

  const deleteRoom = (e) => {
    //console.log(e)
    const deleteTecherAPI = async (e) => {
      try {
        const response = await request.deleteAPI("ExaminationRoom/" + e)
        //console.log(response)
        if (response.status == 200) {
          success("xóa phòng thành công")
          getAllRoomServices()

        }
        else {
          danger("xóa phòng thất bại")
          console.log("thất bại")
        }
      } catch (e) {
        if (e.response.data.code === 405)
          warning(`Xóa phòng thất bại (đã thuộc kì thi:${e.response.data.examination[0].name}-${e.response.data.examination[0].examCode})`)
        console.log(e)
      }
    }
    deleteTecherAPI(e)
  }
  //==========================khóa và mở khóa phòng==================
  const unLockRoom = async (id) => {
    try {
      const response = await request.putAPI("ExaminationRoom/UnLockExaminationRoom?id=" + id)
      if (response.status === 200) {
        success("Đã mở khóa")
        getAllRoomServices()
      } else {
        danger("Mở khóa thất bại")
      }
    } catch (e) {
      danger("Lỗi! Mở khóa thất bại");
    }
  }
  const lockRoom = async (id) => {
    try {
      const response = await request.putAPI("ExaminationRoom/LockExaminationRoom?id=" + id)
      if (response.status === 200) {
        success("Đã khóa")
        getAllRoomServices()
      } else {
        danger("Khóa phòng thất bại")
      }
    } catch (e) {
      danger("Lỗi! Khóa phòng thất bại")
      console.log(e);
    }
  }
  //  option serch table
  const { SearchBar } = Search;
  //   init table info
  const columns = [{
    dataField: 'name',
    text: 'Tên Phòng',
    sort: true
  }, {
    dataField: 'location',
    text: 'Địa chỉ',
    sort: true
  },
  {
    dataField: 'capacity',
    text: 'Sức chứa',
    sort: true
  },
  {
    dataField: 'locked',
    text: 'Khóa',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      if (cell) return <i className="fas fa-lock"></i>
      return ""
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
              onClick={() => (deleteRoom(row.id))}
            >
              Xóa
            </DropdownItem>
            {row.locked ?
              (
                <DropdownItem
                  idteacher={row.id}
                  onClick={() => (unLockRoom(row.id))}
                >
                  Mở khóa
                </DropdownItem>
              ) : (
                <DropdownItem
                  idteacher={row.id}
                  onClick={() => (lockRoom(row.id))}
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
                        <h3 className="mb-0">Danh sách giáo viên</h3>
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
                  <div>
                    {/* <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên Phòng</th>
                          <th scope="col">địa chỉ</th>
                          <th scope="col">Sức chứa</th>
                          <th scope="col">Khóa</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>

                      {(rooms.lenght != 0) &&
                        (<tbody>{rooms.map((room, index) =>
                        (
                          <tr key={room.id}>
                            <td>{index}</td>
                            <td>{room.name}</td>
                            <td>{room.location}</td>
                            <td>{room.capacity}</td>
                            <td>{room.locked ? (<i className="fas fa-lock"></i>) : ""}</td>
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
                                    idteacher={room.id}
                                    onClick={() => (handleRedirectToEdit(room.id))}
                                  >
                                    Sửa
                                  </DropdownItem>
                                  <DropdownItem
                                    idteacher={room.id}
                                    onClick={() => (deleteRoom(room.id))}
                                  >
                                    Xóa
                                  </DropdownItem>
                                  {room.locked ?
                                    (
                                      <DropdownItem
                                        idteacher={room.id}
                                        onClick={() => (unLockRoom(room.id))}
                                      >
                                        Mở khóa
                                      </DropdownItem>
                                    ) : (
                                      <DropdownItem
                                        idteacher={room.id}
                                        onClick={() => (lockRoom(room.id))}
                                      >
                                        Khóa
                                      </DropdownItem>
                                    )
                                  }
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))//if fase----------------
                        }
                        </tbody>)}

                    </Table> */}
                  </div>
                  <PaginationProvider
                    pagination={paginationCustom(rooms.length)}
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
                            data={rooms}
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
                          {(loading) && (<div className="d-flex justify-content-center">
                            <br></br>
                            <Spinner style={{
                              height: '3rem',
                              width: '3rem'
                            }} color="primary">
                              Loading...
                            </Spinner>
                          </div>)}

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

export default Room;
