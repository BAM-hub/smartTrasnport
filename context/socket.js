import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";
import React from 'react';

export const socket = io(SOCKET_URL, {
    transports: ["websocket"]
  });;
export const SocketContext = React.createContext(socket);