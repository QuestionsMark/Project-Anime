import React from 'react';
import { Link } from 'react-router-dom';

import { useData } from '../contexts/DataProvider';

import { Button } from '@material-ui/core';

import RecommendedProfile from './RecommendedProfile';

const RecommendedProfiles = () => {

    const { users } = useData();

    const profilesList = () => {
        const sorted = users
            .sort((a, b) => {
                if (a.likes.length < b.likes.length) return -1;
                if (a.likes.length > b.likes.length) return 1;
                return 0;
            })
            .reverse()
        return sorted
            .slice(0, 5)
            .map(u => <RecommendedProfile key={u.id} user={u} />);
    }

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