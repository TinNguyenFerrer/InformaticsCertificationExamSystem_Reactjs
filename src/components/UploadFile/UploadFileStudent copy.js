import "./UploadFileStudent.css"
import React, { useState } from 'react';
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
    DropdownItem } 
from 'reactstrap';
const UpoadFileStudent = ({children,prop,url}) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const studentInformInit = [{
        name: "",
        email: "",
        phoneNumber: "",
        identifierCode: "",
        password: "",
      }]
    let [students, setStudents] = useState([])
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };
    const onFileLoadedHandler = (data, fileInfo, originalFile) =>{
        console.dir(originalFile)
        setSelectedFile(originalFile)
    }
    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);

        fetch(
            'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <FormGroup className='custom-file '>
                {/* <Input className='custom-file-input input_uploadFile_student ' id="customFile" type="file" name="file" onChange={changeHandler} /> */}
                <Label className=" input_uploadFile_student_lable" for="customFile">{(selectedFile&&selectedFile.name)||"Chọn file .csv"}</Label>
                <CSVReader cssInputClass='custom-file-input input_uploadFile_student ' id="customFile" onFileLoaded={onFileLoadedHandler} />

            </FormGroup>
            {isSelected ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                
                <p></p>
            )}
            <div>
                <Button color="success"size="sm" onClick={handleSubmission}>Gửi file</Button>
            </div>
            <br></br>

            <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên Sinh viên</th>
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
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phoneNumber}</td>
                            
                          </tr>))}
                        </tbody>)}
                    </Table>


        </div>
    )
}
export default UpoadFileStudent;