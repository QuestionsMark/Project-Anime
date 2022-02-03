import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import ProfileNav from '../ProfileNav';
import ProfileHome from '../ProfileHome';
import ProfileTop from '../ProfileTop';
import ProfileAchievements from '../ProfileAchievements';
import ProfilePrivate from '../ProfilePrivate';
import ProfileEdit from '../ProfileEdit';

import { HOST_ADDRESS } from '../../config';
import Loading from '../Loading';

const Profile = ({ history, match }) => {

    const componentRef = useRef();

    const [profileData, setProfileData] = useState({});
    const [searchPhraseAnime, setSearchPhraseAnime] = useState('');
    const handleSearchAnime = (e) => {
        setSearchPhraseAnime(e.target.value);
    }

    const [searchPhraseAchievement, setSearchPhraseAchievement] = useState('');
    const handleSearchAchievement = (e) => {
        setSearchPhraseAchievement(e.target.value);
    }

    const animeList = () => profileData.userAnimeData.watched.filter(a => a.title.toLowerCase().includes(searchPhraseAnime.toLowerCase()));

    const achievementsList = () => {
        return profileData.achievements
            .filter(a => a.name.toLowerCase().includes(searchPhraseAchievement.toLowerCase()))
            .sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.level > b.level) return -1;
                if (a.level < b.level) return 1;
                return 0;
            })
    };

    const getProfileData = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${match.params.id}`);
        if (response.ok) {
            const profileData = await response.json();
            if (!componentRef.current) return;
            setProfileData(profileData);
        } else {
            history.push('/error/not-found');
        }
    }, [history, match]);

    const profileComponent = JSON.stringify(profileData) === "{}" ?
        <Loading />
        :
        <>
            <ProfileNav />
            <Switch>
                <Route path="/users/:userID" exact>
                    <ProfileHome profileData={profileData} match={match} getProfileData={getProfileData}/>
                </Route>
                <Route path="/users/:userID/user-top">
                    <ProfileTop animeList={animeList()} handleSearch={handleSearchAnime}/>
                </Route>
                <Route path="/users/:userID/achievements">
                    <ProfileAchievements achievements={achievementsList()} handleSearch={handleSearchAchievement}/>
                </Route>
                <Route path="/users/:userID/settings">
                    <ProfileEdit profileData={profileData} getProfileData={getProfileData} />
                </Route>
                <Route path="/users/:userID/private">
                    <ProfilePrivate />
                </Route>
            </Switch>
        </>;

    useEffect(() => {
        getProfileData();
    }, [getProfileData, match]);

    return ( 
        <div className="profile main__content" ref={componentRef}>
            {profileComponent}
        </div>
     );
}
 
export default withRouter(Profile);