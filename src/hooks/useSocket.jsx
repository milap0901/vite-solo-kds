import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

const useSocket = (event, callBack) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const data = await window.apiKey.request("getLocalJsonData");
        if (!socketRef.current) {
          socketRef.current = io(`http://${data.ip_address}:3001`);
        }

        socketRef.current.on(event, callBack);
      } catch (error) {
        console.log("Socket initialization error:", error);
      }
    };

    initializeSocket();

    return () => {
      socketRef.current?.off(event, callBack);
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [event, callBack]);

  return socketRef.current;
};

export default useSocket;
