import { useEffect, useState } from "react";
import moment from "moment/moment";
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

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
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
  );
};
