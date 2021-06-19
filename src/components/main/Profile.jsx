import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import ProfileNav from '../ProfileNav';
import ProfileHome from '../ProfileHome';
import ProfileTop from '../ProfileTop';
import ProfileAchievements from '../ProfileAchievements';

import ProfileEdit from '../ProfileEdit';

import background from '../../media/img/sao1-back20502.jpg';

const Profile = ({history, match, isUserLogged}) => {

    const [profileData, setProfileData] = useState({
        id: 1,
        username: '',
        avatar: '',
        background: '',
        customBackgrounds: [],
        createAccountDate: '',
        rank: '',
        likes: [],
        achievements: [],
        // {
        //     id: 2,
        //     name: "Pierwsze Koty za Płoty",
        //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eligendi quia totam voluptatibus, delectus ullam ea ipsa atque cum praesentium soluta voluptatem nesciunt sapiente enim minus. Velit similique quae earum?",
        //     img: img
        // }
        points: 0,
        introduction: {
            title: '',
            description: '',
        },
        userAnimeData: {
            watched: [],
            stopped: [],
            processOfWatching: [],
            planned: []
        },
        favoriteAnime: {
            title: '',
            link: '',
            img: '',
            rate: 0
        },
        favoriteType: ''
    });
    const [types, setTypes] = useState([
        {
            _id: '',
            name: '',
            description: '',
        }
    ])
    const [searchPhraseAnime, setSearchPhraseAnime] = useState('');
    const [searchPhraseAchievement, setSearchPhraseAchievement] = useState('');

    const handleSearchAnime = (e) => {
        setSearchPhraseAnime(e.target.value);
    }

    const handleSearchAchievement = (e) => {
        setSearchPhraseAchievement(e.target.value);
    }

    const animeList = () => {
        const filtered = [...profileData.userAnimeData.watched].filter(a => a.title.toLowerCase().includes(searchPhraseAnime.toLowerCase()));
        return filtered;
    }

    const achievementsList = () => {
        const filtered = profileData.achievements.filter(a => a.name.toLowerCase().includes(searchPhraseAchievement.toLowerCase()));
        return filtered;
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    const callAPI = () => {
        fetch(`http://localhost:9000/users/${match.params.userLink}`)
            .then(res => res.json())
            .then(res => {
                if (res.response) {
                    history.push(`/${match.params.userLink}`)
                } else {
                    setProfileData(res)
                }
            });
        
        fetch('http://localhost:9000/types')
            .then(res => res.json())
            .then(res => setTypes(res));
    }

    useEffect(() => {
        goUp();
        callAPI();
    }, []);

    useEffect(() => {
        callAPI();
    },[match])

    return ( 
        <main className="main" style={{backgroundImage: `url(${profileData.background ? `http://localhost:9000/images/${profileData.background}` : background})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            <div className="profile main__content">
                <ProfileNav isUserLogged={isUserLogged}/>
                <Switch>
                    <Route path="/profile/:userID" exact>
                        <ProfileHome data={profileData} match={match} callAPI={callAPI}/>
                    </Route>
                    <Route path="/profile/:userID/user-top">
                        <ProfileTop animeList={animeList()} handleSearch={handleSearchAnime}/>
                    </Route>
                    <Route path="/profile/:userID/achievements">
                        <ProfileAchievements achievements={achievementsList()} handleSearch={handleSearchAchievement}/>
                    </Route>
                    <Route path="/profile/:userID/settings">
                        <ProfileEdit
                        types={types}
                        avatar={profileData.avatar}
                        username={profileData.username}
                        favAnime={profileData.favoriteAnime}
                        favType={profileData.favoriteType}
                        watchedAnimeList={profileData.userAnimeData.watched}
                        actualBackground={profileData.background}
                        introduction={profileData.introduction}
                        customBackgroundsList={profileData.customBackgrounds}
                        callAPI={callAPI}/>
                    </Route>
                </Switch>
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Profile);