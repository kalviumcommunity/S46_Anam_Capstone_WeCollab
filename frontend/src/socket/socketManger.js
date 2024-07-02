import { io } from "socket.io-client";

let socket;
let onlineUsers;
let unreadMessages;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(`${import.meta.env.VITE_SOCKET_URI}`, {
      query: {userId} ,
    });

    socket.on("connect", () => {
      console.log("Socket connected", socket.id);
    });

    socket.on("getOnlineUsers", (users) => {
        console.log("Online users:", users);
        onlineUsers = users
    });

    socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
    });

    socket.on("sendUnreadMessages",(message) => {
      unreadMessages = message
  })

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

export const getOnlineUsers = () => {
    if(!socket){
        throw new Error("Socket not initialized. Call initializeSocket first.");
    }
    return onlineUsers
}

export const getUnreadMessages = () => {
  if(!socket){
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return unreadMessages
}

export const clearUnreadMessages = (value) => {
  unreadMessages = unreadMessages.filter((message) => message !== value)
}

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};