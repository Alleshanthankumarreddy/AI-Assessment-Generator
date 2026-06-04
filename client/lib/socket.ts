import { io }
from "socket.io-client";

const socket = io(

  "https://ai-assessment-generator-delta.vercel.app/",

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
