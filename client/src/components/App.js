import Login from "./Login";
import UseLocalStorage from '../hooks/UseLocalStorage';
import Dashbord from './Dashbord';
import { ContactProvider } from '../contexts/ContactProvider'
import {ConversationProvider } from '../contexts/ConversationProvider'
import { SocketProvider } from '../contexts/SocketProvider'

function App() {
  const [id, setId] = UseLocalStorage()
  const dashboard =(
            <SocketProvider id={id}>
            <ContactProvider>
              <ConversationProvider id={id}>
              <Dashbord id={id}/>
              </ConversationProvider>
            </ContactProvider>
            </SocketProvider>            
            )


  return (
    <>
    {id ? dashboard : <Login onIdSubmit={setId}/> }
    
    </>
  )
}

export default App;
