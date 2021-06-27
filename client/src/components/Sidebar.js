import React ,{useState} from 'react'
import { Tab , Nav , Button , Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({id}) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [openModal, setOpenModal] = useState(false)
    const openConversation = activeKey === CONVERSATIONS_KEY

    function closeModal(){
        setOpenModal(false)
    }

    return (
        <div className="d-flex flex-column" style={{width:'250px'}}>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="d-flex overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="small">
                    yourid : <span className="text-muted">{id}</span>
                </div>
                <Button onClick={()=>setOpenModal(true)}>
                   New { openConversation ? 'conversation' : 'contacts'}
                </Button>
            </Tab.Container>
            <Modal show={openModal} onHide={closeModal}>
                { openConversation ? <NewConversationModal closeModal = {closeModal}/> : <NewContactModal closeModal = {closeModal}/>}
            </Modal>
        </div>
    )
}
