import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:5000'
const DeleteStreamModal = (props) => {
    const { selectedStream, toggle } = props
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        //     message.success(`Delete file ${selectedStream.name} successfully`)
        // }, 1000)
        axios.delete(`${API_URL}/streams/${selectedStream.id}`)
        .then(response => {
            if (response.status === 200) {
                message.success(`Delete file ${selectedStream.name} successfully`)
                toggle(); 
            }
            setOpen(false);
            setConfirmLoading(false);
        }).catch(error => {
            message.error(`Delete file ${selectedStream.name} failed`)
            setOpen(false);
            setConfirmLoading(false);
        })

    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button danger onClick={showModal}>
                Delete
            </Button>
            <Modal
                title="Confirm Delete"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Are you sure to delete this streaming source ?
                    <span style={{ fontWeight: 'bold', display: 'block' }}> {selectedStream.name} </span>
                </p>

            </Modal>
        </>
    );
};

export default DeleteStreamModal;