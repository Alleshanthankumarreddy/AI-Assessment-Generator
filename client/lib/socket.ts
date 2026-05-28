import { io }
from "socket.io-client";

const socket = io(
  "http://localhost:5000",
  {

    withCredentials: true,

    autoConnect: true,

    transports: ["websocket"],

  }
);


// DEBUG
socket.on(
  "connect",

  () => {

    console.log(
      "Socket Connected:",
      socket.id
    );

  }
);


export default socket;