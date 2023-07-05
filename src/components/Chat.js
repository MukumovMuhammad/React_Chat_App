import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../style/chat.css";

export const Chat = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [Users, setUsers] = useState([]); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    onSnapshot(queryMessages, (snapshot) => {
      let m_messages = [];
      snapshot.forEach((doc) => {
        m_messages.push({ ...doc.data(), id: doc.id });
        if (!Users.includes(doc.data().user)) {
          setUsers({...doc.data().user});
        }
      });

      setMessages(m_messages);
    });

    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };
  return (
    <div className="Main-Chat">
      <div className="Room-block">
        <div className="Room">ROOM: #{props.room}</div>
        <div className="users-list">
          <h3>In Room:</h3>
          {Users.forEach((user) => {
          return <div> {user}</div>
        })}</div>
      </div>
    <div className="Chat-App">
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <div
                className={
                  message.user === auth.currentUser.displayName
                    ? "current-user"
                    : "user"
                }
              >
                {message.user}
              </div>
              <div className="text">{message.text}</div>
              {message.user === auth.currentUser.displayName ? <button className="delete button">delete</button>: null}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
    </div>
    
  );
};
