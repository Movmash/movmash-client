import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (id !== null) {
      const newSocket = io("http://localhost:8000", { query: { id } });
      setSocket(newSocket);
      console.log(newSocket);

      return () => {
        newSocket.emit("disconnect");
        newSocket.off();
      };
    }
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
