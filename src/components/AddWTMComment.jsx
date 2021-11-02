import React, { useState } from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { HOST_ADDRESS } from '../config';

const AddWTMComment = ({scrollDown}) => {

    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddComment = () => {
        const date = new Date();
        fetch(`${HOST_ADDRESS}/wtm/add-comment`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                text,
                date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
            })
        })
            .then(res => res.json())
            .then(() => {
                scrollDown();
            });
        setText('');
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment();
        }
    }

    const handleTextareaFocus = () => {
        const rightSide = document.querySelector('.main__rightSide');
        rightSide.scroll({
            behavior: 'smooth',
            top: rightSide.scrollHeight,
        });
    }

    return ( 
        <div className="WTMC__addComment">
            <textarea placeholder="Napisz komentarz..." className="WTMC__textarea" value={text} onChange={handleTextChange} onKeyDown={handleKeyDown} onFocus={handleTextareaFocus}></textarea>
            <div className="WTMC__send" onClick={handleAddComment}>
                <SendRoundedIcon className="WTMC__sendIcon" />
            </div>
        </div>
     );
}
 
export default AddWTMComment;