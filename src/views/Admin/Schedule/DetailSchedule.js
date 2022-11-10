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
    let [idStudentModal,SetIdStudentModal ] = useState()
    let [examinations, setExaminations] = useState([])
    let [examinationSeleted, setExaminationSeleted] = useState({})
    let [freelanceStudent, setFreelanceStudent] = useState(false)
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
    const getAllStudentByIdExaminationServices = async (id) => {
        try {
            let res = await request.getAPI("Student/GetAllByIdExamination?id=" + id)
            const data = res.data;
            setStudents([...data])
            console.log(data)
            //console.log(data)
        } catch (e) {
            console.log(e)
        }
    }
    const onExaminationSelected = (exam) => {
        setExaminationSeleted(exam)
        console.log(exam)
        getAllStudentByIdExaminationServices(exam.id)
    };
    const handleRedirectAddStudent = () => {
        if (examinationSeleted.id == null) {
            window.alert("Bạn phải chọn kì thi trước")
        } else {
            history.push("student/add?idexamination=" + examinationSeleted.id)
        }
    };
    //lấy danh sách dự thi theo ca và phòng
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
            console.log(data)
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
                <ModalSwapSchedule onExecute={getAllStudentByTestScheduleAndRoomService} displayUseState = {[modal, setModal]} idStudent={idStudentModal} />
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
                                                <h3 className="mb-0">Danh sách thí sinh</h3>
                                            </Col>
                                            <Col className="text-right" xs="4">
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <div >
                                        <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">STT</th>
                                                    <th scope="col">Tên Sinh viên</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">SĐT</th>
                                                    <th scope="col">Ngày sinh</th>
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

export default DetailSchedule;
