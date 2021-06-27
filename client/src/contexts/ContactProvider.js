import React,{useContext } from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage'

const ContactContext = React.createContext()

export function useContact(){
    return useContext(ContactContext)
}

export  function ContactProvider({children}) {
    const [contacts, setContacts] = UseLocalStorage('contacts',[])

    function createContacts(id,name){
        setContacts(prevContacts=>{
            return [...prevContacts , {id ,name}]
        })
    }
    
    return (
        <ContactContext.Provider value={{contacts , createContacts}}>
            {children}
        </ContactContext.Provider>
    )
}
