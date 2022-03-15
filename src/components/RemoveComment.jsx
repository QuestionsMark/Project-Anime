import React from 'react';

import { RemoveRounded } from '@material-ui/icons';
import { HOST_ADDRESS } from '../config';
import { useResponsePopup } from '../contexts/ResponsePopupProvider';
import { useSocket } from '../contexts/SocketProvider';

const RemoveComment = ({collection, collectionId, id, refresh}) => {

    const socket = useSocket();
    const { setResponse, setOpen } = useResponsePopup();

    const handleRemoveComment = async () => {
        const response = await fetch(`${HOST_ADDRESS}/${collection}/${collectionId}/comments/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setResponse({ status: response.ok, message: 'Usunięto komentarz.' });
        } else {
            const error = await response.json();
            setResponse({ status: response.ok, message: error.message });
        }
        socket.emit('whats-the-melody-delete-comment');
        setOpen(true);
    };

    return <RemoveRounded className="remove-icon" onClick={handleRemoveComment}/>;
}
 
export default RemoveComment;