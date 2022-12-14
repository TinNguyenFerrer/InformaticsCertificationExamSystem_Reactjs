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
import React from "react";
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
// reactstrap
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
    Label,
    Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./DetailSchedule.css"
import DropdownList from "components/Dropdown/DropdownList.js";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
import ModalSwapSchedule from "components/Modals/ModalsSwapSchedule";
import * as request from "Until/request";
import { param } from "jquery";

const DetailSchedule = () => {
    const history = useHistory()
    const studentInformInit = [{
        name: "",
        email: "",
        phoneNumber: "",
        identifierCode: "",
        password: "",
    }]
    let [students, setStudents] = useState(studentInformInit)
    let [modal, setModal] = useState(false);
    let [idStudentModal, SetIdStudentModal] = useState()
    let [examinations, setExaminations] = useState([])
    let [examinationSeleted, setExaminationSeleted] = useState({})
    let [freelanceStudent, setFreelanceStudent] = useState(false)
    //  option serch table
    const { SearchBar } = Search;
    //   option for data table
    //init table info
    const columns = [{
        dataField: 'id',
        text: 'STT',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return rowIndex
        }
    }, {
        dataField: 'name',
        text: 'T??n th?? sinh',
        sort: true
    }, {
        dataField: 'hashCode',
        text: 'M?? th?? sinh',
        sort: true
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true
    }, {
        dataField: 'birthDay',
        text: 'Ng??y sinh',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return new Date(cell).toLocaleDateString()
        }
    }, {
        dataField: '',
        text: '',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            console.log(row)
            var r = 0
            return (<div className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only"
                        role="button"
                        size="sm"
                        color=""
                        onClick={() => {
                            SetIdStudentModal(row.id)
                            setModal(!modal)
                        }}
                    >
                        <i className="fas fa-retweet"></i>
                    </DropdownToggle>
                </UncontrolledDropdown>
            </div>
            )
        }
    }];
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
    //l???y danh s??ch d??? thi theo ca v?? ph??ng
    const getAllStudentByTestScheduleAndRoomService = async () => {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const id = queryParams.get('id');
            const examroom_testscheid = queryParams.get('examroom_testscheid');
            param = {
                params: {
                    Id: id,
                    ExamRom_TestScheid: examroom_testscheid
                }
            }
            let res = await request.getAPI(`Student/GetAllByRoomAndTestSchedule`, param)
            console.log(res)
            const data = res.data;
            setStudents([...data])
            console.log([...data][0].id)
        } catch (e) {
            console.log(e)
        }
    }
    // 
    const handleDeleteStudent = (e) => {
        //deleteStudentService(e)
    }
    useEffect(() => {
        //getAllStudentByIdTestScheduleServices()
        getAllExaminationsServices()
        getAllStudentByTestScheduleAndRoomService()
    }, [])
    const handleRedirectToEdit = (id) => {
        history.push(history.location.pathname + "/edit?id=" + id)
    }

    return (
        <>
            <HeaderEmpty />
            {/* Page content */}

            <div>
                <ModalSwapSchedule onExecute={getAllStudentByTestScheduleAndRoomService} displayUseState={[modal, setModal]} idStudent={idStudentModal} />
            </div>

            <Container className="mt--8 Body_Content" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow border-0">
                            <div>
                                <CardBody>
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0">Danh s??ch th?? sinh</h3>
                                            </Col>
                                            {/* <Col className="text-right" xs="4">
                                            </Col> */}
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
                                                            keyField="email"
                                                            columns={columns}
                                                            data={students}
                                                            search
                                                        >
                                                            {
                                                                toolkitprops => (
                                                                    <React.Fragment>
                                                                        <Row >
                                                                            <Col md="4" xs="7">
                                                                                <div className="d-inline-block">T??m ki???m:&ensp;</div>
                                                                                <div className="d-inline-block">
                                                                                    <SearchBar className=" d-inline-block shadow border border-info" placeholder=" T??m ki???m ...." {...toolkitprops.searchProps} />
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
                                            keyField="birthDay"
                                            data={students}
                                            columns={columns}
                                            pagination={pagination}
                                        /> */}
                                        {/* <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">STT</th>
                                                    <th scope="col">T??n Sinh vi??n</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">S??T</th>
                                                    <th scope="col">Ng??y sinh</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            {(students.lenght != 0) &&
                                                (<tbody>{students.map((student, index) =>
                                                (
                                                    <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.phoneNumber}</td>
                                                        <td>{new Date(student.birthDay).toLocaleDateString()}</td>
                                                        <td >
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only"
                                                                    role="button"
                                                                    size="sm"
                                                                    color=""
                                                                    onClick={() => {
                                                                        SetIdStudentModal(student.id)
                                                                        setModal(!modal)
                                                                    }}
                                                                >
                                                                    <i className="fas fa-retweet"></i>
                                                                </DropdownToggle>
                                                            </UncontrolledDropdown>
                                                        </td>
                                                    </tr>))}
                                                </tbody>)}
                                        </Table> */}
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

export default DetailSchedule;
