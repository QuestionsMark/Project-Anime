import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import RecommendedProfile from './RecommendedProfile';

import { HOST_ADDRESS } from '../config';

const RecommendedProfiles = () => {

    const [profiles, setProfiles] = useState([
        {
            id: '',
            username: '',
            avatar: '',
            likes: [],
            background: '',
            link: '',
        }
    ]);

    const profilesList = () => {
        const sorted = profiles.sort((a, b) => {
            if (a.likes.length < b.likes.length) {
                return -1;
            } else if (a.likes.length > b.likes.length) {
                return 1;
            }
            return 0;
        }).reverse()
        const filtered = sorted.slice(0, 5);
        return filtered.map(p => <RecommendedProfile key={p.id} username={p.username} avatar={p.avatar} likes={p.likes} background={p.background} link={p.link}/>)
    }

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/users`)
            .then(res => res.json())
            .then(res => setProfiles(res));
    }

    useEffect(() => {
        callAPI();
    },[])

    return ( 
        <section className="RP main__section scrollNav"  data-id="2">
            <h2 className="RP__title">Polecane Profile!</h2>
            <div className="RP__profiles">
                {profilesList()}
            </div>
                <Link to="/users" className="RP__moreLink"><Button className="button RP__more">Zobacz więcej</Button></Link>
        </section>
     );
}
 
export default RecommendedProfiles;