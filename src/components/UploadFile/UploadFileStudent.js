import "./UploadFileStudent.css"
import React, { useState } from 'react';
import { Button, Input, FormGroup, Label } from 'reactstrap';
const UpoadFileStudent = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

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
                <Input className='custom-file-input input_uploadFile_student ' id="customFile" type="file" name="file" onChange={changeHandler} />
                <Label className=" input_uploadFile_student_lable" for="customFile">Chọn file .csv</Label>
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
        </div>
    )
}
export default UpoadFileStudent;