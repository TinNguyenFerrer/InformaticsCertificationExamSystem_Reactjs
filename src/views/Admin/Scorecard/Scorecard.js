import { useLocation, Route, Switch, Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import { useEffect, useContext } from "react";
import {StoreContext} from "Until/StoreProvider"
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
//import "./TestSchedule.css";
import DropdownListInline from "components/Dropdown/DropdownListInline.js";
import * as request from "Until/request";

const Scorecard = () => {
  const examinationInformInit = [{
    id: null,
    name: "Chọn kì thi",
    starTime: "",
    endTime: "",
    location: "",
    minimumTheoreticalMark: 0,
    minimumPracticeMark: 0,
    gradingDeadline: ""
  }]
  let te = { id: -1, name: "" };

  const history = useHistory()
  const handleAutoCreateScorecard = async (id) => {
    try {
      if (id == null) {
        window.alert("Xin chọn kì thi trước")
        return;
      }
      const response = await request.putAPI(`/Examination/${id}/CreateScorecard`)
      console.log(response)
      if (response.status == 200) {
        await getAllExamServices()
        examinations.map(exam => {
          if (exam.id == id) {
            exam.isCreateScorecard = true
            onExaminationSelected(exam)
          }
        })

      }
      else {
        window.alert("Tạo tự động thất bại")
        console.log("thất bại")
      }
    } catch (e) {
      window.alert("Tạo tự động thất bại")
      console.log(e)
    }
  };

  const handleDownloadExam = async (e, TestScheduleId) => {

    

    e.target.className = "fas fa-spinner fa-pulse fa-lg"
    const response = await request.postAPI(`TestShedule/${TestScheduleId}/DownloadSubmitFile`, {}, {responseType: 'blob',contentType: "multipart/form-data"})
    console.log(response)
    if (response.status === 200) {
      const type = response.headers['content-type']
      const fileName = response.headers["content-disposition"].split('filename=')[1].split(';')[0].replaceAll('"', '');
      console.log(fileName)
      const blob = new Blob([response.data], { type: 'application/zip', encoding: "UTF-8" })
      saveAs(blob, fileName)
      e.target.className = "fas fa-download fa-lg text-success"
    }

  }

  const [DropdowItem, setDropdowItem] = useState(te)
  let [examinations, setExaminations] = useState([])
  let [testSchedules, setTestSchedules] = useState([])
  let [examinationSeleted, setExaminationSeleted] = useContext(StoreContext).examinationSeleted
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

  const GetAllTestScheduleByIdExaminationServices = async (id) => {
    try {
      let res = await request.getAPI(`Examination/${id}/TestSchedules`)
      const data = res.data;
      setTestSchedules([...data])
      console.log(data)
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllExamServices()
    if (examinationSeleted.id !== undefined)
    GetAllTestScheduleByIdExaminationServices(examinationSeleted.id)
  }, [])
  const onExaminationSelected = (exam) => {
    setExaminationSeleted(exam)
    console.log(exam)
    GetAllTestScheduleByIdExaminationServices(exam.id)
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
                  <DropdownListInline
                    item={examinations}
                    onItemSelected={onExaminationSelected}
                  >{examinationSeleted.name || "chọn kì thi"}</DropdownListInline>
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">

                      <Col xs="8">
                        <h3 className="mb-0">File chấm thi</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          onClick={() => handleAutoCreateScorecard(examinationSeleted.id)}
                          size="sm"
                        >
                          Tạo tự động
                        </Button>

                      </Col>
                    </Row>
                  </CardHeader>
                  <div >
                    <Table className="align-items-center table-flush " responsive>
                      <thead className="">
                        <tr className="table-success">
                          <th scope="col">Ca thi</th>
                          <th scope="col">Thời gian bắt đầu</th>
                          <th scope="col">Thời gian kết thúc</th>
                          <th scope="col">Tải file</th>
                        </tr>
                      </thead>
                      {(testSchedules.lenght != 0) &&
                        (<tbody>{testSchedules.map((testSchedule, index) => {
                          return (
                            <tr key={index}>
                              <td >{testSchedule.name}</td>
                              <td>{new Date(testSchedule.starTime).toLocaleTimeString()}</td>
                              <td>{new Date(testSchedule.endTime).toLocaleTimeString()}</td>
                              <td>
                                {examinationSeleted.isCreateScorecard && (<i onClick={(e) => { handleDownloadExam(e, testSchedule.id) }} className="fas fa-download fa-lg"></i>)}
                              </td>
                            </tr>
                          )
                        })//if fase----------------
                        }
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

export default Scorecard;
