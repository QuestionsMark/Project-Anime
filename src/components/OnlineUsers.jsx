import React, { useEffect, useState } from 'react';

import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';

import SingleOnlineUser from './SingleOnlineUser';

import { useSocket } from '../contexts/SocketProvider';

const OnlineUsers = () => {

    const socket = useSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log(onlineUsers);

    const usersList = () => {
        return onlineUsers.map(u => <SingleOnlineUser key={u.socketId} user={u}/>);
    };

    const component = () => {
        return  onlineUsers.length > 0 ? <div className="online-users__content">
            <PeopleOutlineRoundedIcon className="online-users__icon"/>
            <p className="online-users__text">Online( <span className="online-users__value" style={{color: onlineUsers.length > 1 ? 'rgb(94, 196, 94)' : 'rgb(209, 65, 65)'}}>{onlineUsers.length}</span> )</p>
            {usersList()}
        </div> : null;
    };

    useEffect(() => {
        if (!socket) return;
        socket.on('online-users-changed', () => {
            socket.emit('get-online-users');
        });
        return () => socket.off('online-users-changed');
    }, [socket]);

    useEffect(() => {
        if (!socket) return;
        socket.on('get-online-users', ({ onlineUsers }) => {
            setOnlineUsers(onlineUsers);
        })
        return () => socket.off('get-online-users');
    }, [socket]);

    useEffect(() => {
        if (!socket) return;
        socket.emit('get-online-users');
    }, [socket]);

    return <>{component()}</>;
}
 
export default OnlineUsers;