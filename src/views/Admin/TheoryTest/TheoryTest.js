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
import React, { useEffect } from "react";
import { useState } from 'react';
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
import "./TheoryTest.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import * as request from "Until/request";
import { info } from "sass";
const TheoryTest = () => {

  let te = { id: -1, name: "" };
  //========--------------lấy danh sách kì thi------------============
  let [examinations, setExaminations] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useState({})
  let [theoryTests, setTheoryTests] = useState([])
  const getAllExaminationsServices = async () => {
    try {
      let res = await request.getAPI("Examination/GetAll")
      const data = res.data;
      setExaminations([...data])
      //console.log(examinations)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  // khi một kì thi được chọn trong dropdown
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    //getAllTheoryByExaminationIdService(exam.id)
  };
  //========================= lấy danh sách đề thi theo kì thi=============
  const getAllTheoryByExaminationIdService = async (id) => {
    try {
      let res = await request.getAPI("TheoryTest/getAllByIdExam?IdTest="+id)
      const data = res.data;
      setTheoryTests([...data])
      console.log(res)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  //===================================lấy danh sách đề thi===================
  
  //----------------------------------------------------------------
  const history = useHistory()
  const handleRedirectAddTheoryTest = () => {
    history.push("Theory/add")
  };
  const [DropdowItem, setDropdowItem] = useState(te)
  const callbackFunction = (childData) => {
    console.log(childData.target.id)
  }
  useEffect(() => {
    getAllExaminationsServices()
    
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
                <DropdownList
                    item={examinations}
                    onItemSelected={onExaminationSelected}
                  >{examinationSeleted.name || "chọn kì thi"}
                  </DropdownList>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      
                      <Col xs="8">
                        <h3 className="mb-0">Danh sách các đề thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={handleRedirectAddTheoryTest}
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
                          <th scope="col">Tên đề</th>
                          <th scope="col">review</th>
                          <th scope="col">Sức chứa</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>80</td>
                          <td>Phòng 202</td>
                          <td>Lầu 2 khoa, công nghệ thông tin</td>
                          <td>80</td>
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

export default TheoryTest;
