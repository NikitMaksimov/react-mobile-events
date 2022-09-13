import io from "socket.io-client";

import './App.css';
import Events from "./components/events/Events";

const socket = io.connect("http://localhost:4200/", {
  reconnection: true
});

function App() {
  return (
    <div className="App">
      <Events socket={socket} />
    </div>
  );
}

export default App;
