import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import $ from 'jquery';

import { Button } from '@material-ui/core';
import RecommendedProfile from './RecommendedProfile';

import theme from '../media/img/kiminonawa-back20502.jpg';
import theme2 from '../media/img/hos-back20502.jpg';
import theme3 from '../media/img/shi-back20502.jpg';
import theme4 from '../media/img/sao1-back20502.jpg';
import theme5 from '../media/img/ten5-back20502.jpg';
import avatar from '../media/img/sak6-spec.jpg';


const RecommendedProfiles = () => {

    const [profiles, setProfiles] = useState([
        // objekt całego użutkownika
        {
            //...
            id: 1,
            username: "Question Mark",
            avatar: avatar,
            profileLikes: 10,
            profileTheme: theme,
            link: "/user/2023",
            //...
        },
        {
            //...
            id: 2,
            username: "Question Mark",
            avatar: avatar,
            profileLikes: 131,
            profileTheme: theme2,
            link: "/page/#202123",
            //...
        },
        {
            //...
            id: 3,
            username: "Question Mark",
            avatar: avatar,
            profileLikes: 98,
            profileTheme: theme3,
            link: "/page/#202123",
            //...
        },
        {
            //...
            id: 4,
            username: "Question Mark",
            avatar: avatar,
            profileLikes: 32,
            profileTheme: theme4,
            link: "/page/#202123",
            //...
        },
        {
            //...
            id: 5,
            username: "Question Mark",
            avatar: avatar,
            profileLikes: 97,
            profileTheme: theme5,
            link: "/page/#202123",
            //...
        }
    ]);

    // const goUp = () => {
    //     $('body, html').animate({
    //         scrollTop: '0'
    //     }, 0)
    // }

    const profilesList = profiles.map(profile => <RecommendedProfile key={profile.id} username={profile.username} avatar={profile.avatar} profileLikes={profile.profileLikes} profileTheme={profile.profileTheme} link={profile.link}/>)

    return ( 
        <section className="RP main__section scrollNav"  data-id="2">
            <h2 className="RP__title">Polecane Profile!</h2>
            <div className="RP__profiles">
                {profilesList}
            </div>
            {/* <div onClick={goUp}> */}
                <Link to="/users" className="RP__moreLink"><Button className="button RP__more">Zobacz więcej</Button></Link>
            {/* </div> */}
        </section>
     );
}
 
export default RecommendedProfiles;