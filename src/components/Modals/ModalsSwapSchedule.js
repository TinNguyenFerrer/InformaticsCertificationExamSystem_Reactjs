import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as request from "Until/request";
import DropdownListInline from "components/Dropdown/DropdownListInline";

const ModalSwapSchedule = (props) => {
  const {
    buttonLabel,
    className,
    displayUseState,
    idStudent,
    onExecute
  } = props;
  const [modal, setModal] = displayUseState;
  const toggle = () => {
    setExaminationRoomSeleted()
    setTestSchedulesSeleted({})
    setModal(!modal);
  }
  const changeStudentScheduleExamService = async () => {
    try{
    const formData = {
      idStudent: idStudent,
      idRoom: examinationRoomSeleted.id,
      idTestSchedule: testScheduleSeleted.id
    };
    let res = await request.putAPI("Student/ChangeTestSchedule", formData)
    onExecute()
    toggle()
  }catch(e){

  }

  }
  const [studentsInfor, setStudentInfor] = useState();
  let [testSchedules, setTestSchedules] = useState([])
  let [testScheduleSeleted, setTestSchedulesSeleted] = useState({})
  let [examinationRooms, setExaminationRooms] = useState([])
  let [examinationRoomSeleted, setExaminationRoomSeleted] = useState()
  // lấy tất cả ca thi
  const getAllTestScheduleByExaminationIdService = async (id) => {
    try {
      let res = await request.getAPI("TestShedule/GetAllScheduleByIdExamination?IdExam=" + id)
      const data = res.data;
      setTestSchedules(data)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  //lấy thông tin phòng thi theo ca
  const getAllRoomByIdTestScheduleService = async (id) => {
    try {
      if (id == null) setExaminationRooms([])

      const res = await request.getAPI("ExaminationRoom/GetAllByIdTestSchedule?idTestSchedule=" + id)
      let data = [];
      [...res.data].map((item) => {
        data.push(item.examinationRoom)
      })
      setExaminationRooms([...data])
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  // khi một ca thi được chọn trong dropdown
  const onScheduleTestSelected = (schedu) => {
    setTestSchedulesSeleted(schedu)
    console.log(schedu)
    getAllRoomByIdTestScheduleService(schedu.id)
  };
  const onExaminationRoomSelected = (room) => {
    setExaminationRoomSeleted(room)
    console.log(room)
    //getAllRoomByIdTestScheduleService(schedu.id)
  };


  const GetExaminatiionInforService = async (id) => {
    const res = await request.getAPI("Student/" + id)
    let t = res.data
    setStudentInfor(t);
    console.log(t)
    getAllTestScheduleByExaminationIdService(t.examinationId)
  }
  useEffect(() => {
    if (idStudent != undefined) {
      GetExaminatiionInforService(idStudent)

      console.log("e")
    }
  }, [idStudent])

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>

        <ModalBody>
          <h1 className='text-center'>Đổi ca thi</h1>
          Họ tên:&ensp; <b>{studentsInfor && studentsInfor.name}</b><br></br>
          Ngày sinh:&ensp; <b>{studentsInfor && (new Date(studentsInfor.birthDay).toLocaleDateString())}</b><br></br><br></br>

          Chọn ca thi: &ensp;
          <DropdownListInline
            item={testSchedules}
            onItemSelected={onScheduleTestSelected}
          >{testScheduleSeleted.name || "chọn ca thi"}

          </DropdownListInline>
          <br></br><br></br>

          Chọn phòng thi: &ensp;
          <DropdownListInline
            item={examinationRooms}
            onItemSelected={onExaminationRoomSelected}
            disabled={(() => {
              if (JSON.stringify(testScheduleSeleted) === '{}') {

                return true
              }
              return false
            })()}
          >{examinationRoomSeleted && (examinationRoomSeleted.name) || "chọn phòng"}
          </DropdownListInline>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={changeStudentScheduleExamService}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalSwapSchedule;