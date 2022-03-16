import React, { useCallback, useEffect, useRef, useState } from 'react';

import { SendRounded } from '@material-ui/icons';

import { useUser } from '../../contexts/UserProvider';
import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { HOST_ADDRESS } from '../../config.js';

const AddComment = ({collectionId, getData, collection}) => {

    const addCommentDiv = useRef();
    const textarea = useRef();

    const { user } = useUser();
    const { setResponse, setOpen } = useResponsePopup();

    const [validationErrors, setValidationErrors] = useState(
        ['Komentarz powinien zawierać od 1 do 3000 znaków.']
    );
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const checkValidation = useCallback(() => {
        const errors = [];

        if (text.length === 0 || text.length > 3000) {
            errors.push('Komentarz powinien zawierać od 1 do 3000 znaków.');
        }

        return errors;
    }, [text.length]);

    const handleShowValidate = () => {
        addCommentDiv.current.classList.add('show');
    };
    const handleHideValidate = () => {
        addCommentDiv.current.classList.remove('show');
    };

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment(e);
        }
    };

    const handleAddComment = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            setText('');
            textarea.current.blur();
            const response = await fetch(`${HOST_ADDRESS}/${collection}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionID: collectionId,
                    userID: user.id,
                    text,
                }),
            });
            if (response.ok) {
                getData();
            } else {
                const { message } = await response.json();
                setResponse({ status: response.ok, message });
                setOpen(true);
            }
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [checkValidation, text]);

    return ( 
        <div ref={addCommentDiv} className="addComment">
            <div className="addComment__content">
                <div className="addComment__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${user.avatar || ''})` }}/>
                <form className="addComment__form" onSubmit={handleAddComment}>
                    <textarea ref={textarea} className="addComment__textarea" placeholder="Napisz komentarz..." value={text} onChange={handleTextChange} onKeyDown={handleKeyDown} onFocus={handleShowValidate} onBlur={handleHideValidate}/>
                    <button type="submit" className="addComment__btn-submit" onClick={handleAddComment}><SendRounded className="addComment__sendIcon"/></button>
                </form>
            </div>
            <p className="addComment__validation-text">* Komentarz powinien zawierać od 1 do 3000 znaków. ( <span style={{color: text.length === 0 || text.length > 3000 ? '#d14141' : '#5ec45e'}}>{text.length}</span> )</p>
        </div>
     );
}
 
export default AddComment;