import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import {IBasedModal} from "../types/types.ts";


const BasedModal: React.FC<IBasedModal> = ({show, handleClose, Title, children, addFunction, addText}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addFunction}>
                        {addText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BasedModal