import { useLocation, Route, Switch } from "react-router-dom";
import AddExamination from "views/Examination/AddExamination.js";
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
import { useState } from 'react';
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import {Redirect} from "react-router-dom";
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
import "assets/css/Examination.css"

const Examination = () => {
  const history = useHistory()
  const handleRedirectAddExam = () => {
    history.push("examination/add") 
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
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các kì thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick = {handleRedirectAddExam}
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
                          <th scope="col">Tên Kì Thi</th>
                          <th scope="col">Địa điểm thi</th>
                          <th scope="col">Bắt Đầu</th>
                          <th scope="col">Kết Thúc</th>
                          <th scope="col">Hạn Chấm Thi</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Kì thi lần thứ 2</td>
                          <td>Đại học cần thơ</td>
                          <td>23/4/2022</td>
                          <td>23/4/2022</td>
                          <td>23/4/2022</td>

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
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>

                      </tbody>
                    </Table>
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
