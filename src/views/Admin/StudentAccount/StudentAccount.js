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
import { useState, useEffect, useContext } from 'react';
import { StoreContext } from "Until/StoreProvider"
// react alert hook
import { useAlert } from 'react-bootstrap-hooks-alert'
// data table 
import BootstrapTable from 'react-bootstrap-table-next';
import { pagination } from "variables/dataTableOption.js"
// reactstrap components
import { Card, Container, DropdownItem, Row } from "reactstrap";
import { Redirect } from "react-router-dom";
// core components
import HeaderEmpty from "components/Headers/HeaderEmpty";
import ExportAccountCSVButton from "components/ExportSCV/ExportAccountCSVButton";
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
    Label
} from "reactstrap";
import { useHistory } from "react-router-dom";
// import "./Student.css"
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
import UpoadFileStudent from "components/UploadFile/UploadFileStudent";
import * as request from "Until/request";

const Student = () => {
    const history = useHistory()
    const { warning, info, primary, danger, success } = useAlert()
    const studentInformInit = [{
        name: "",
        email: "",
        phoneNumber: "",
        identifierCode: "",
        password: "",
    }]
    let [students, setStudents] = useState(studentInformInit)
    let [examinations, setExaminations] = useState([])
    let [examinationSeleted, setExaminationSeleted] = useContext(StoreContext).examinationSeleted
    let [data, setdata] = useState({
        listOfUsers: [],
        loading: false
    });
    //  column for data table
    const columns = [{
        dataField: 'name',
        text: 'T??n sinh vien',
        sort: true
      }, {
        dataField: 'birthDay',
        text: 'Ng??y sinh',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return new Date(cell).toLocaleDateString()
          }
      },
      {
        dataField: 'identifierCode',
        text: 'M?? sinh vi??n',
        sort: true
      },
      {
        dataField: 'password',
        text: 'M???t kh???u',
        sort: true
      }];

    const getUsers = async (idExam) => {
        if (!data.loading) {
            try {
                setdata(pre => ({ ...pre, loading: true }));
                const response = await request.getAPI(`Examination/${idExam}/student-accounts-for-export`)
                console.log(response)
                const accounts = [];
                response.data.map((user) => {
                    var { name, ...rest } = user;
                    console.log(typeof name)
                    accounts.push({
                        ...rest,
                        firstname: name.lastIndexOf(" ") != -1 ? name.slice(name.lastIndexOf(" ") + 1) : name,
                        lastname: name.lastIndexOf(" ") != -1 ? name.slice(0, name.lastIndexOf(" ")) : name
                    })
                })
                setdata({
                    listOfUsers: accounts,
                    loading: false
                });
                console.log(data)
                //done(true)
            } catch (e) {
                console.log(e)
                setdata(pre => ({
                    ...pre,
                    loading: false
                }));
            };
        }
    }

    ////----------------tao m???t kh???u t??? ?????ng
    const handleAutoCreatePass = async (id) => {
        try {
            if (id == null) {
                window.alert("Xin ch???n k?? thi tr?????c")
                return;
            }
            const response = await request.getAPI("Student/CreatePassWord?IdExam=" + id)
            console.log(response)
            getAllStudentByIdExaminationServices(examinationSeleted.id)
            if (response.status == 200) {
                //console.log("th??nh cong"+e)
                //getAllTeacherServices()
                examinations.map(exam => {
                    if (exam.id == id)
                        onExaminationSelected(exam)
                })
                success("T???o m???t kh???u th??nh c??ng")
            }
            else {
                danger("T???o t??? ?????ng th???t b???i")
                console.log("th???t b???i")
            }
        } catch (e) {
            danger("T???o t??? ?????ng th???t b???i")
            console.log(e)
        }
    };

    //================================================================
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
        console.log(exam.id)
        getUsers(exam.id)
        getAllStudentByIdExaminationServices(exam.id)
    };
    const getAllStudentServices = async () => {
        try {
            let res = await request.getAPI("Student/GetAll")
            const data = res.data;
            setStudents([...data])
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }
    const deleteStudentService = async (e) => {
        try {
            const response = await request.deleteAPI("Student/" + e)
            console.log(response)
            if (response.status == 200) {
                console.log("th??nh cong" + e)
                getAllStudentServices()

            }
            else {
                window.alert("x??a gi??o vi??n th???t b???i")
                console.log("th???t b???i")
            }
        } catch (e) {
            window.alert("X??a gi??o vi??n th???t b???i")
            console.log(e)
        }
    }
    const dataExport = (Listdata) => {
        return Listdata
    }
    useEffect(() => {
        getAllStudentServices()
        getAllExaminationsServices()
        if (examinationSeleted.id != undefined) {
            getAllStudentByIdExaminationServices(examinationSeleted.id)
            getUsers(examinationSeleted.id)
            getAllStudentByIdExaminationServices(examinationSeleted.id)
        }
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
                                    <div>
                                        Ch???n k?? thi: &ensp;
                                        <DropdownListInline
                                            item={examinations}
                                            onItemSelected={onExaminationSelected}
                                        >{examinationSeleted.name || "ch???n k?? thi"}
                                        </DropdownListInline>
                                    </div>
                                    <Row className="text-right justify-content-end">
                                        <Col className=" mt-2" lg="auto">
                                            <ExportAccountCSVButton className="btn btn-info" idExam={examinationSeleted.id} dataExport={data}>
                                                <span className="svg-icon svg-icon-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect opacity="1" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor"></rect>
                                                        <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor"></path>
                                                        <path opacity="0.5" d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                Export
                                            </ExportAccountCSVButton>
                                        </Col>
                                        <Col className=" mt-2" lg="auto">
                                            <Button
                                                color="primary"
                                                onClick={() => handleAutoCreatePass(examinationSeleted.id)}
                                            // size="sm"
                                            >
                                                T???o t??? ?????ng
                                            </Button>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <div className="table-responsive">
                                        {/* <Table className="align-items-center table-flush" responsive>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">STT</th>
                                                    <th scope="col">T??n Sinh vi??n</th>
                                                    <th scope="col">Ng??y sinh</th>
                                                    <th scope="col">M?? Th?? Sinh</th>
                                                    <th scope="col">M???t kh???u</th>
                                                    <th scope="col">M?? Ph??ch</th>
                                                </tr>
                                            </thead>
                                            {(students.lenght != 0) &&
                                                (<tbody>{students.map((student, index) =>
                                                (
                                                    <tr key={index}>
                                                        <td>{index}</td>
                                                        <td>{student.name}</td>
                                                        <td>{new Date(student.birthDay).toLocaleDateString()}</td>
                                                        <td>{student.identifierCode || ""}</td>
                                                        <td>{student.password || ""}</td>
                                                        <td>{student.hashCode || ""}</td>
                                                    </tr>))}
                                                </tbody>)}
                                        </Table> */}
                                        <BootstrapTable
                                            bootstrap4={true}
                                            bordered={false}
                                            headerWrapperClasses="table-success"
                                            classes="align-items-center table-flush table-responsive"
                                            id="tb-layout-auto"
                                            // classes="align-items-center table-flush" 
                                            keyField='email' 
                                            data={students}
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

export default Student;
