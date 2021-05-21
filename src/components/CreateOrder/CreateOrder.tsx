import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap/cjs';
import './CreateOrder.css';

const CreateOrder: React.FC<any> = ({onSubmit, validated}) => {
    const [show, setShow] = useState(false);
    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={showModal}>
                Create Order
            </Button>
            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={onSubmit}>
                        <Form.Group controlId="deviceManufacturer" className='form-group mb-2'>
                            <Form.Label className='mb-1'>Device Manufacturer</Form.Label>
                            <Form.Control required className="form-control" size="sm" type="text"
                                          placeholder="Device Manufacturer"/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Device Manufacturer.
                            </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group controlId="deviceBrand" className='mb-2'>
                            <Form.Label className='mb-1'>Device Brand</Form.Label>
                            <Form.Control required className="form-control" size="sm" type="text"
                                          placeholder="Device Brand"/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Device Brand.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="deviceType" className='mb-0'>
                            <Form.Label className='mb-1'>Device Type</Form.Label>
                            <Form.Control required className="form-control" size="sm" type="text"
                                          placeholder="Device Type"/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a Device Type.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <button className="form-control btn btn-primary mt-3" type="submit">Submit</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
};

export default CreateOrder;
