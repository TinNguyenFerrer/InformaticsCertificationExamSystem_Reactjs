import "./UploadFileStudent.css"
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import * as request from "Until/request";
import CSVReader from 'react-csv-reader'
import {
    Button,
    Table,
    Input,
    FormGroup,
    Label,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}
    from 'reactstrap';

const UpoadFileStudent = ({ children, prop, url }) => {
    //set option reader scv
    const papaparseOptions = {
        skipEmptyLines: true
    }
    const queryParams = new URLSearchParams(window.location.search);
    const idexamination = queryParams.get('idexamination');
    const history = useHistory()
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    let [students, setStudents] = useState([])

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };
    const onFileLoadedHandler = (data, fileInfo, originalFile) => {
        const headerSCV = ['IdentifierCode', 'Name', 'BirthDay', 'BirthPlace', 'Email', 'PhoneNumber']
        if (JSON.stringify(data[0]) != JSON.stringify(headerSCV)) {
            window.alert("Không giống mẫu")
            return
        }
        let dataStudent = new Array();
        for (var i = 1; i < data.length; i++) {
            dataStudent.push(data[i])
        }
        setStudents(dataStudent)
        console.dir(dataStudent)
        console.dir(data)
        setSelectedFile(originalFile)
    }
    const handleSubmission = async () => {
        try {
            if (students.length == 0) {
                window.alert("Chọn file trước")
                return
            }
            const formData = new FormData();
            formData.append("file", selectedFile);
            const res = await request.postAPI(`Student/CreateStudentSCV?idExam=${idexamination}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(res)
            if(res.status ===200){
                window.alert("Thêm thành công")
                history.push("/admin/student")
            }

        } catch (e) {
            console.log(e)
            window.alert("Thêm thất bại")
        }
    };


    return (
        <div>
            <FormGroup className='custom-file '>
                {/* <Input className='custom-file-input input_uploadFile_student ' id="customFile" type="file" name="file" onChange={changeHandler} /> */}
                <Label className=" input_uploadFile_student_lable" for="customFile">{(selectedFile && selectedFile.name) || "Chọn file .csv"}</Label>
                <CSVReader parserOptions={papaparseOptions} fileEncoding="UTF-8" cssInputClass='custom-file-input input_uploadFile_student ' id="customFile" onFileLoaded={onFileLoadedHandler} />

            </FormGroup>
            {selectedFile ? (
                <div><br></br>
                    <p>Tên file: {selectedFile.name}</p>
                    <p>Kích cỡ: {selectedFile.size}</p>
                    <p>
                        Lần sửa cuối cùng:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (

                <p></p>
            )}
            <div>
                <Button color="success" size="lg" onClick={handleSubmission}>Gửi file</Button>
            </div>
            <br></br>

            <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã Học viên</th>
                        <th scope="col">Họ Tên </th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Quên quán</th>
                        <th scope="col">Email</th>
                        <th scope="col">SĐT</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {(students.lenght != 0) &&
                    (<tbody>{students.map((student, index) =>
                    (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{student[0]}</td>
                            <td>{student[1]}</td>
                            <td>{student[2]}</td>
                            <td>{student[3]}</td>
                            <td>{student[4]}</td>
                            <td>{student[5]}</td>
                            <td>{student[6]}</td>

                        </tr>))}
                    </tbody>)}
            </Table>


        </div>
    )
}
export default UpoadFileStudent;