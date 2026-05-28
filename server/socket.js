let io;

export const initSocket = (
  socketIo
) => {

  io = socketIo;

};


export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.io not initialized"
    );

  }

  return io;

};