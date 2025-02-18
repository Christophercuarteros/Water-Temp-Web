import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const sensorData = JSON.parse(event.data); 
      setData(sensorData); 
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close(); // Clean up WebSocket connection on unmount
    };
  }, [url]);

  return data;
};

export default useWebSocket;
