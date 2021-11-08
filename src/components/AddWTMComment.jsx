import React, { useState } from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { HOST_ADDRESS } from '../config';
import { useWTMComments } from '../contexts/WTMCommentsProvider';

const AddWTMComment = () => {

    const [, setWTMComments] = useWTMComments();

    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const scrollDown = async () => {
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
    }

    const getWTMComments = async () => {
        const response = await fetch(`${HOST_ADDRESS}/wtm/comments`);
        const comments = await response.json();
        if (!comments.error) {
            setWTMComments(comments);
        }
    }

    const handleAddComment = async () => {
        const date = new Date();
        const response = await fetch(`${HOST_ADDRESS}/wtm/add-comment`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                user: JSON.parse(localStorage.getItem('animark-user-id')),
                text,
                date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
            })
        });
        const commentAdded = await response.json();
        if (!commentAdded.error) {
            await getWTMComments();
            scrollDown();
        }
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