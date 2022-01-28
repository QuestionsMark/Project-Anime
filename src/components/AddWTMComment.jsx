import React, { useState, useRef } from 'react';

import { HOST_ADDRESS } from '../config';
import { useSocket } from '../contexts/SocketProvider';
import { useUser } from '../contexts/UserProvider';

const AddWTMComment = ({id, getWTMComments}) => {

    const addCommentContent = useRef();

    const socket = useSocket();
    const { user } = useUser();

    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const scrollDown = () => {
        const scrollValue = document.querySelector('.main__rightSide').scrollHeight;
        document.querySelector('.main__rightSide').scroll({
            behavior: 'smooth',
            top: scrollValue
        });
        const scrollValue2 = document.querySelector('.WTMC__list').scrollHeight;
        document.querySelector('.WTMC__list').scroll({
            behavior: 'smooth',
            top: scrollValue2
        });
    };

    const handleAddComment = async e => {
        e.preventDefault();
        if (text.length !== 0 && text.length <= 500) {
            setText('');
            const response = await fetch(`${HOST_ADDRESS}/whats-the-melody/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: user.id,
                    text,
                }),
            });
            if (response.ok) {
                socket.emit('whats-the-melody-new-comment');
                await getWTMComments();
                scrollDown();
            }
        }
    };

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment(e);
        }
    };

    const handleTextareaFocus = () => {
        const rightSide = document.querySelector('.main__rightSide');
        rightSide.scroll({
            behavior: 'smooth',
            top: rightSide.scrollHeight,
        });
        addCommentContent.current.classList.add('show');
    };

    const handleTextareaBlur = () => {
        addCommentContent.current.classList.remove('show');
    };

    return ( 
        <div className="WTMC__addComment" ref={addCommentContent}>
            <div className="WTMC__addComment-content">
                <textarea  placeholder="Napisz komentarz..." className="WTMC__textarea" value={text} onChange={handleTextChange} onKeyDown={handleKeyDown} onFocus={handleTextareaFocus} onBlur={handleTextareaBlur}></textarea>
            </div>
            <p className="addComment__validation-text">* 1 - 500 znaków. ( <span style={{color: text.length === 0 || text.length > 500 ? '#d14141' : '#5ec45e'}}>{text.length}</span> )</p>
        </div>
     );
}
 
export default AddWTMComment;