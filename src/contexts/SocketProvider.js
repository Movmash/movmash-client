import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import {P_URL,D_URL} from "../util/baseUrl";
const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (id !== null) {
      const newSocket = io(P_URL, { query: { id } });
      setSocket(newSocket);

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
