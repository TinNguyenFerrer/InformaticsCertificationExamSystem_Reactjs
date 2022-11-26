import { useLocation, Route, Switch, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faFileImport } from '@fortawesome/free-solid-svg-icons'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import React, { useEffect } from "react";
import { useState, useContext, useRef } from 'react';
import { StoreContext } from "Until/StoreProvider"
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
    DropdownMenu
} from "reactstrap";
import { useHistory } from "react-router-dom";
//import "./TestSchedule.css";
import DropdownList from "components/Dropdown/DropdownList.js";
import * as request from "Until/request";
//  react chart
import Chart from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
    chartPie1
} from "variables/charts.js";
import { isIfStatement } from "typescript";
import { isBuffer } from "util";

const ScoreSummary = () => {
    let [examinations, setExaminations] = useState([])
    let [examinationSeleted, setExaminationSeleted] = React.useContext(StoreContext).examinationSeleted
    let [studentsResult, setStudentsResult] = useState([])
    //  dataset for chart
    let [datasetChart, setDatasetChart] = useState([])
    let [dataExport, setDataExport] = useState({
        listOfUsers: [],
        loading: false
    });
    // options for data table
    const columns = [{
        dataField: 'name',
        text: 'Tên  thí sinh',
        sort: true
    }, {
        dataField: 'identifierCode',
        text: 'Mã sinh viên',
        sort: true
    }, {
        dataField: 'theory',
        text: 'Điểm lý thuyết',
        sort: true
    }, {
        dataField: 'practice',
        text: 'Điểm thực hành',
        sort: true
    }, {
        dataField: 'finalMark',
        text: 'Điểm tổng',
        sort: true
    }, {
        dataField: 'resultStatus',
        text: 'Kết quả',
        sort: true
    }];
    // ------option for chart Bar-------
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }
    let datasetBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    studentsResult.map(item => {
        console.log(item.finalMark)
        let temp
        // if(Number.isInteger(item.finalMark))
        // {
        //     temp = item.finalMark - 1;
        // }else{
        temp = Math.floor(item.finalMark)
        
        datasetBar[temp]++
    })
    //setDatasetChart(t)
    const dataChartBar = {
        labels: [">=0", ">=1", ">=2", ">=3", ">=4", ">=5", ">=6", ">=7", ">=8", ">=9", "10"],
        yLabels: "hhhh",
        datasets: [
            {
                label: "Sales",
                data: datasetBar,
                maxBarThickness: 10
            }
        ]
    }
    // ------option for chart Pie-------
    let datasetPie = [0, 0]
    studentsResult.forEach(item => {
        if (item.resultStatus === `Đậu`) {
            datasetPie[0]++;
        } else {
            datasetPie[1]++;
        }
    })
    let dataChartPie = {
        labels: ['Rớt', 'Đậu'],
        datasets: [
            {
                label: '',
                data: datasetPie,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            },
        ]
    }
    // -----end option for chart Pie------
    const getStudentResultService = async (idExam) => {
        try {
            const response = await request.getAPI(`Examination/${idExam}/get-marks`)
            console.log(response.data)
            //  conver data
            const studentRespon = response.data
            studentRespon.map((item) => {
                item.resultStatus ? item.resultStatus = `Đậu` : item.resultStatus = `Trượt`;
            })
            console.log(studentRespon)
            return studentRespon
        } catch (e) {
            console.log(e)
        }
    }

    const getAllExamServices = async () => {
        try {
            let res = await request.getAPI("Examination/GetAll")
            const data = res.data;
            await setExaminations([...data])
            //console.log(examinations)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    const sizePerPageRenderer = ({
        options,
        currSizePerPage,
        onSizePerPageChange
    }) => {
        return (
            <div className="btn-group">
                {/* <button type="button" class="btn btn-outline-info btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
            </div> */}
            </div>
        )
    }
    const rowClasses = (row, rowIndex) => {
        console.log(row);
        if (row.practice < examinationSeleted.minimumPracticeMark || row.theory < examinationSeleted.minimumTheoreticalMark) return `table-danger`
        return '';
    };
    const sizePerPageList = [{
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }, {
        text: '15', value: 15
    }, {
        text: '20', value: 20
    }, {
        text: 'All', value: studentsResult.length
    }]
    const pagination = paginationFactory({
        sizePerPageRenderer,
        sizePerPage: 5,
        sizePerPageList,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: false,
        alwaysShowAllBtns: true,
    });
    useEffect(() => {
        async function getStudentResult(idExam) {
            const studentRespon = await getStudentResultService(idExam)
            setStudentsResult(studentRespon)
        }
        getAllExamServices()
        if (Object.keys(examinationSeleted).length !== 0) {
            getStudentResult(examinationSeleted.id)
        }
    }, [])
    const onExaminationSelected = async (exam) => {
        setExaminationSeleted(exam)
        const studentRespon = await getStudentResultService(exam.id)
        console.log(studentRespon)
        setStudentsResult(studentRespon)
        //console.log(exam)
        //GetAllTestScheduleByIdExaminationServices(exam.id)
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
                                    <DropdownList
                                        item={examinations}
                                        onItemSelected={onExaminationSelected}
                                    >{examinationSeleted.name || "chọn kì thi"}</DropdownList>
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">

                                            <Col xs="3">
                                                <h3 className="mb-0">Kết quả thi</h3>
                                            </Col>
                                            <Col className="text-right" xs="9">
                                                <ExportAccountCSVButton className="btn btn-info" idExam={examinationSeleted.id} dataExport={dataExport}>
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
                                        </Row>
                                    </CardHeader>
                                    <div className="table-responsive">
                                        <BootstrapTable
                                            bootstrap4={true}
                                            bordered={false}
                                            headerWrapperClasses="table-success"
                                            classes="align-items-center table-flush table-responsive"
                                            id="tb-layout-auto"
                                            keyField='id'
                                            data={studentsResult}
                                            columns={columns}
                                            pagination={pagination}
                                            rowClasses={rowClasses}
                                        />
                                    </div>
                                    <hr className="my-4" />
                                    {examinationSeleted.id === undefined ? "" : (
                                        <div>
                                            <Row>
                                                <Col xl="8">
                                                    <Card className="shadow">
                                                        <CardHeader className="bg-transparent">
                                                            <Row className="align-items-center">
                                                                <div className="col">
                                                                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                                                                        Phổ điểm
                                                                    </h6>
                                                                    <h2 className="mb-0">Điểm tổng kết</h2>
                                                                </div>
                                                            </Row>
                                                        </CardHeader>
                                                        <CardBody>
                                                            {/* Chart */}
                                                            <div className="chart">
                                                                <Bar
                                                                    data={dataChartBar}
                                                                    options={chartExample2.options}
                                                                />
                                                            </div>
                                                        </CardBody>

                                                    </Card>
                                                </Col>
                                                <Col xl="4">
                                                    <Card>
                                                        <CardHeader className="bg-transparent">
                                                            <Row className="align-items-center">
                                                                <div className="col">
                                                                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                                                                        Đậu/Rớt
                                                                    </h6>
                                                                    <h2 className="mb-0">Kết quả</h2>
                                                                </div>
                                                            </Row>
                                                        </CardHeader>
                                                        <CardBody>
                                                            {/* Chart */}
                                                            
                                                            <div className="chart">
                                                            <div className="">
                                                                <div className="d-inline-block" style={{ backgroundColor: dataChartPie.datasets[0].backgroundColor[0], height: "13px", width: "65px" }}></div>
                                                                <div className="d-inline-block" >&ensp;{dataChartPie.labels[0]}</div>
                                                                <br></br>
                                                                <div className="d-inline-block" style={{ backgroundColor: dataChartPie.datasets[0].backgroundColor[1], height: "13px", width: "65px" }}></div>
                                                                <div className="d-inline-block" >&ensp;{dataChartPie.labels[1]}</div>
                                                            </div>
                                                                <Pie
                                                                    data={dataChartPie}
                                                                //options={chartPie1.options}
                                                                />
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </CardBody>
                            </div>


                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default ScoreSummary;
