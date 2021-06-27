import React,{useCallback,useEffect, useContext,useState} from 'react'
import UseLocalStorage from '../hooks/UseLocalStorage'
import { useContact } from '../contexts/ContactProvider'
import { useSocket } from './SocketProvider'


const ConversationsContext = React.createContext()

export function useConversation(){
    return useContext(ConversationsContext)
}

export  function ConversationProvider({id,children}) {
    const [conversations, setConversations] = UseLocalStorage('conversations',[])
    const [selectConversationIndex, setSelectConversationIndex] = useState(0)
    const { contacts } = useContact()
    const socket = useSocket()

    function createConversations(recipients){
        setConversations(prevConversation=>{
            return [ ...prevConversation , {recipients , messages : []}]
        })
    }

    const formattedConversation = conversations.map((conversation,index)=>{
        const recipients = conversation.recipients.map(recipient=>{
            const contact = contacts.find(contact=>{
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id:recipient , name }
        })
        const messages = conversation.messages.map(message=>{
            const contact = contacts.find(contact=>{
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message , senderName:name,fromMe}
        })
        const selected = index === selectConversationIndex
        return {...conversation,recipients,messages,selected}
    })

    const addMessageToConversation = useCallback(({recipients , text , sender})=>{
        setConversations(prevConversation=>{
            let madeChange = false
            const newMessage = { sender , text}
            const newConversation = prevConversation.map(conversation=>{
                if(arrayEquality(conversation.recipients,recipients)){
                    madeChange = true
                    return { ...conversation , messages : [...conversation.messages,newMessage]}
                }
                return conversation
            })
            if(madeChange){
                return newConversation
            }else{
                return [...prevConversation, { recipients , messages : [newMessage]}]
            }
        })
    },[setConversations])

    useEffect(()=>{
        if(socket == null)return
        socket.on('receive-message',addMessageToConversation)
        return ()=>socket.off('receive-message')
    },[socket,addMessageToConversation])

    function sendMessage(recipients,text){
        socket.emit('send-message',{recipients,text})
        addMessageToConversation({recipients,text , sender : id})
    }
    const value = { 
        conversations : formattedConversation ,
        selectConversationIndex : setSelectConversationIndex,
        selectedConversation : formattedConversation[selectConversationIndex],
        sendMessage,
        createConversations
    }
    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}


function arrayEquality(a,b){
    if(a.length !== b.length)return false

    a.sort()
    b.sort()
    return a.every((element,index)=>{
      return  element === b[index]
    })
}