import { io }
from "socket.io-client";

const socket = io(
  "https://ai-assessment-generator-tav0.onrender.com",
  {
    withCredentials: true,
    autoConnect: true,
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
