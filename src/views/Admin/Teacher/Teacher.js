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
import "./Teacher.css"
import DropdownList from "components/Dropdown/DropdownList.js";

const Teacher = () => {
  
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
  const getAllTeacherServices = () =>{
    request.getAPI("Teacher/GetAll")
      .then((res) => {

        const t = res.data
        setTeachers(t);
        console.log(t)
      }).catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getAllTeacherServices()
  },[])
  
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
                        <h3 className="mb-0">Danh sách giáo viên</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddTeacher}
                          size="sm"
                        >
                          Tạo mới
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
                    <Table className="align-items-center table-flush" responsive>
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

                    </Table>
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
