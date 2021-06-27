import React ,{useRef} from 'react'
import { Form ,Button, Container} from 'react-bootstrap'
import { v4 as UI} from 'uuid'

export default function Login({onIdSubmit}) {
    const idRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }

    function createNewId(){
        onIdSubmit(UI())
    }
    return (
        <Container className="align-items-center d-flex" style={{height:'100vh'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" ref={idRef}  required/>
                </Form.Group>
                <Button type="submit" className="m-3">Create</Button>
                <Button onClick={createNewId}>create New Id</Button>
            </Form>
        </Container>
    )
}
