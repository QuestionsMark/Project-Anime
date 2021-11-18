import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import ProfileNav from '../ProfileNav';
import ProfileHome from '../ProfileHome';
import ProfileTop from '../ProfileTop';
import ProfileAchievements from '../ProfileAchievements';
import ProfilePrivate from '../ProfilePrivate';
import ProfileEdit from '../ProfileEdit';

import background from '../../media/img/sao1-back20502.webp';

import { HOST_ADDRESS } from '../../config';

const Profile = ({ history, match }) => {

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

    const achievementsList = () => profileData.achievements.filter(a => a.name.toLowerCase().includes(searchPhraseAchievement.toLowerCase()));

    const getProfileData = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${match.params.id}`);
        if (response.ok) {
            const profileData = await response.json();
            setProfileData(profileData);
        } else {
            history.push('/error/not-found');
        }
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
        getProfileData();
    }, [match]);

    return ( 
        <main className="main" style={{backgroundImage: `url(${profileData.background ? `${HOST_ADDRESS}/images/${profileData.background}` : background})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            {JSON.stringify(profileData) !== "{}" ? <div className="profile main__content">
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
            </div> : <div className="profile main__content"></div>}
            <RightSide />
        </main>
     );
}
 
export default withRouter(Profile);