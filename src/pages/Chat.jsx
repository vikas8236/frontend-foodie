// import { useEffect, useState } from 'react';
// import 'tailwindcss/tailwind.css';
// import chat from '../assets/chat.png';

// const TawkToWidget = () => {
//   const [isChatVisible, setIsChatVisible] = useState(true);

//   useEffect(() => {
//     var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
//     (function(){
//       var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//       s1.async = true;
//       s1.src = 'https://embed.tawk.to/669a4e7232dca6db2cb21a52/DEFAULT';
//       s1.charset = 'UTF-8';
//       s1.setAttribute('crossorigin', '*');
//       s0.parentNode.insertBefore(s1, s0);
//     })();
//   }, []);

//   const toggleChat = () => {
//     setIsChatVisible(!isChatVisible);
//   };

//   return (
//     <div class="p-6 w-[800px]">
//     <h1 class="text-3xl tracking-tight font-light" id="chat-header"></h1>
//     <div
//       id="chat-log"
//       class="mt-4 w-full relative p-6 overflow-y-auto h-[30rem] bg-gray-50 border border-gray-200"
//     ></div>
//     <div class="mt-4">
//       <input
//         id="chat-message-input"
//         class="py-2 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-blue-500"
//         type="text"
//         placeholder="Write your message here."
//       />
//       <button
//         id="chat-message-submit"
//         class="py-2 px-4 ml-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
//         type="submit"
//       >
//         Send
//       </button>
//     </div>
//   </div>
//   );
// };

// export default TawkToWidget;

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async () => {
    if (newMessage.trim() === '') return
    const response = await axios.post(
      'https://5075-103-180-81-98.ngrok-free.app/chat/messages/',
      { message: newMessage }
    )
    setMessages([...messages, response.data])
    setNewMessage('')
  }


  return (
    <div
  style={{
    fontFamily: "'Arial', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  }}
>
  <h1 style={{ margin: '0 0 20px', color: '#333' }}>Help Chatbot</h1>
  <div
    id='chat-box'
    style={{
      width: '100%',
      height: '400px',
      overflowY: 'scroll',
      borderRadius: '8px',
      border: '1px solid #ddd',
      padding: '15px',
      backgroundColor: '#fff',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
    }}
  >
    {messages.map((msg) => {
      return (
        <div key={msg.id} style={{ marginBottom: '15px' }}>
          <p style={{ margin: '0 0 5px', fontSize: '16px' }}>
            <strong style={{ color: '#007bff' }}>User:</strong> {msg.message}
          </p>
          {msg.response && (
            <p style={{ margin: '0', fontSize: '16px', color: '#555' }}>
              <strong style={{ color: '#28a745' }}>Bot:</strong> {msg.response}
            </p>
          )}
        </div>
      );
    })}
  </div>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginTop: '20px',
      width: '100%',
    }}
  >
    <input
      type='text'
      value={newMessage}
      onChange={e => setNewMessage(e.target.value)}
      placeholder='Type your question here...'
      style={{
        width: 'calc(100% - 100px)',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
      }}
    />
    <button
      onClick={sendMessage}
      style={{
        width: '80px',
        marginLeft: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Send
    </button>
  </div>
</div>

  )
}

export default Chat
