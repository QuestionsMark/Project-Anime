import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import Loading from './Loading';
import RecommendedProfile from './RecommendedProfile';

import { HOST_ADDRESS } from '../config';

import { DefaultArray } from '../utils/CustomClasses';

const RecommendedProfiles = () => {

    const componentRef = useRef();

    const [users, setUsers] = useState(new DefaultArray());
    const getRecommendedProfiles = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/recommended`);
        if (response.ok) {
            const users = await response.json();
            if (!componentRef.current) return;
            setUsers(users);
        }
    };

    const profilesList = () => {
        const sorted = users
            .sort((a, b) => {
                if (a.likes.length < b.likes.length) return -1;
                if (a.likes.length > b.likes.length) return 1;
                if (a.achievements.length < b.achievements.length) return -1;
                if (a.achievements.length > b.achievements.length) return 1;
                return 0;
            })
            .reverse()
        return sorted
            .slice(0, 5)
            .map(u => <RecommendedProfile key={u.id} user={u} />);
    }

    const recommendedProfilesComponent = users instanceof DefaultArray ?
        <Loading />
        :
        <>
            <h2 className="RP__title">Polecane Profile!</h2>
            <div className="RP__profiles">
                {profilesList()}
            </div>
            <Link to="/users" className="RP__moreLink"><Button className="button RP__more">Zobacz więcej</Button></Link>
        </>;

    useEffect(() => {
        getRecommendedProfiles();
    }, []);

    return ( 
        <section className="RP main__section scrollNav" ref={componentRef} data-id="2">
            {recommendedProfilesComponent}
        </section> 
     );
}
 
export default RecommendedProfiles;