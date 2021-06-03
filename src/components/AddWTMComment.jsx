import React from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

const AddWTMComment = () => {

    const handleAddComment = () => {
        console.log('wysyłamy')
    }

    return ( 
        <div className="WTMC__addComment">
            <textarea placeholder="Napisz komentarz..." className="WTMC__textarea"></textarea>
            <div className="WTMC__send" onClick={handleAddComment}>
                <SendRoundedIcon className="WTMC__sendIcon" />
            </div>
        </div>
     );
}
 
export default AddWTMComment;