import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as request from "Until/request";
import DropdownListInline from "components/Dropdown/DropdownListInline";

const ModalsWarning = (props) => {
  const {
    buttonLabel,
    className,
    displayUseState,
    onExecute,
    idDelete
  } = props;
  const [modal, setModal] = displayUseState;
  const toggle = () => {
    setModal(!modal);
  }

 const executeFunctions = () => {
  onExecute(idDelete)
  toggle()
 }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>

        <ModalBody>
          <h1 className='text-center'>Bạn có chắc chắn muốn xóa?</h1>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={executeFunctions}>Xóa</Button>{' '}
          <Button color="secondary" onClick={toggle}>Thoát</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalsWarning;