import React,{ useState } from 'react'
import { Modal , Button ,Form } from 'react-bootstrap'
import { useContact } from '../contexts/ContactProvider'
import { useConversation } from '../contexts/ConversationProvider'


export default function NewConversationModal({closeModal}) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContact()
    const { createConversations } = useConversation()

    function handleSubmit(e){
        e.preventDefault()
        createConversations(selectedContactIds)
        closeModal()
    }

    function handleChange(contactId){
        setSelectedContactIds(prevSelected=>{
            if(prevSelected.includes(contactId)){
                return prevSelected.filter(prevId=>{
                    return contactId !== prevId
                })
            }else{
                return [...prevSelected,contactId]
            }
        })
    }

    return (
        <>
        <Modal.Header closeButton>Create New Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact=>(
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                        type="checkbox"
                        label={contact.name}
                        value={selectedContactIds.includes(contact.id)}
                        onChange={()=>handleChange(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
        </>
    )
}
