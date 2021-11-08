import React from 'react';

const Achievement = ({achievement}) => {

    const { img, name, description } = achievement;

    return ( 
        <div className="userList__achievement">
            <img src={img} alt="achievement" className="img userList__achievementImg" />
            <div className="userList__achievementInfo">
                <p className="userList__achievementTitle">{name}</p>
                <p className="userList__achievementDescription">{description}</p>
            </div>
        </div>
     );
}
 
export default Achievement;