import React,{useRef} from 'react'
import { Form , Button ,Modal} from 'react-bootstrap'
import { useContact } from '../contexts/ContactProvider'


export default function NewContactModal({closeModal}) {
    const idRef = useRef()
    const nameRef = useRef()
    const { createContacts } = useContact()

    function handleSubmit(e){
        e.preventDefault()
        createContacts(idRef.current.value , nameRef.current.value)
        closeModal()
    }

    return (
        <>
          <Modal.Header closeButton>Add New Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control placeholder="Enter Your Id" type="text" ref={idRef} required/>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control placeholder="Enter Your Name" type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button type="submit">Add</Button>
                </Form>
            </Modal.Body>  
        </>
    )
}
