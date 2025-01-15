import { io } from "socket.io-client";
import { useEffect } from "react";

let socket = null;
const useSocket = (event, callBack) => {
  useEffect(() => {
    try {
      if (!socket) {
        socket = io(`http://localhost:3001`);
      }

      socket?.on(event, callBack);
    } catch (error) {
      console.log(error);
    }

    return () => {
      socket?.off(event, callBack);
    };
  }, [event, callBack]);
};

export default useSocket;
