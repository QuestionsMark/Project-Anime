import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { HOST_ADDRESS } from '../config';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(HOST_ADDRESS);
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('set-user', { userId: JSON.parse(localStorage.getItem('animark-user-id')) });
        return () => socket.off('connect');
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}