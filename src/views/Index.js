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
import * as request from "Until/request";
import { useState } from "react";
import React, { useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// react plugin used to create charts
import Chart from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartPie1
} from "variables/charts.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { info } from "sass";

const Index = (props) => {
  let [studentsResult, setStudentsResult] = useState([])
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  //========================================
  // chart tròn
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
  const getStudentResultService = async () => {
    try {
      const response = await request.getAPI(`Examination/get-all-marks`)
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
  async function getStudentResult(idExam) {
    const studentRespon = await getStudentResultService(idExam)
    setStudentsResult(studentRespon)
  }
  //=======================================
  //  chart sóng
  const datasetBar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    studentsResult.map(item => {
        console.log(item.finalMark)
        let temp
        // if(Number.isInteger(item.finalMark))
        // {
        //     temp = item.finalMark - 1;
        // }else{
        temp = Math.floor(item.finalMark)
        if(temp === 10) temp = 9

        datasetBar[temp]++
    })
  const dataLine = {
    labels: [">=0", ">=1", ">=2", ">=3", ">=4", ">=5", ">=6", ">=7", ">=8", ">=9"],
    datasets: [
      {
        label: "Performance",
        data: datasetBar
      }
    ]
  };
  

  useEffect(() => {
    getStudentResult(1)
  },[])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Tổng quan
                    </h6>
                    <h2 className="text-white mb-0">Sơ đồ điểm</h2>
                  </div>
                  {/* <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={dataLine}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Tổng quan
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
      </Container>
    </>
  );
};

export default Index;
