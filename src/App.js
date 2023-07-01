import { Auth } from "./components/Auth";
import "./App.css";

import Cookies from "universal-cookie";
import { useState, useRef } from "react";
import { Chat } from "./components/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auto-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef("");

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="App">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <h1>Enter Room name : </h1>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
