import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import ProfileNav from '../ProfileNav';
import ProfileHome from '../ProfileHome';
import ProfileTop from '../ProfileTop';
import ProfileAchievements from '../ProfileAchievements';

import img from '../../media/img/sak6-spec.jpg';
import img2 from '../../media/img/vios1-spec.jpg';
import background from '../../media/img/hos-back20502.jpg';
import ProfileEdit from '../ProfileEdit';

const Profile = ({history, match}) => {

    const [profileData, setProfileData] = useState({
        id: 1,
        username: "Question Mark",
        avatar: img,
        background: background,
        accountCreateDate: "21.06.2021",
        rank: "Admin",
        likes: ["54362", "41443", "51123"],
        achievements: [
            {
                id: 1,
                name: "Pierwsze Koty za Płoty",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eligendi quia totam voluptatibus, delectus ullam ea ipsa atque cum praesentium soluta voluptatem nesciunt sapiente enim minus. Velit similique quae earum?",
                img: img
            },
            {
                id: 2,
                name: "Pierwsze Koty za Płoty",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet eligendi quia totam voluptatibus, delectus ullam ea ipsa atque cum praesentium soluta voluptatem nesciunt sapiente enim minus. Velit similique quae earum?",
                img: img
            }
        ],
        points: 123,
        introductionTitle: "O Mnie Słów Kilka...",
        introduction: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum expedita ipsa a nihil recusandae. Voluptate exercitationem quam molestiae modi tenetur! Fuga reiciendis obcaecati aliquam earum nesciunt iusto iure nulla ipsa?",
        statistics: {
            watched: [{title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}, {title: "Violet Evergarden", link: "/page/cos", rate: 10}, {title: "Naruto", link: "/page/cos", rate: 9}, {title: "Plastic Memories", link: "/page/cos", rate: 6}],
            stopped: [],
            processOfWatching: [{title: "Yahari Ore no Seishun Love Comedy wa Machigatteiru. Zoku", link: "/page/cos"}],
            planned: [{title: "Bleach", link: "/page/cos"}, {title: "Attack of Titan", link: "/page/cos"}, {title: "Re Zero", link: "/page/cos"}]
        },
        userAnimeData: {
            series: [
                {
                    id: 1,
                    title: "Violet Evergarden",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 12, name: "Psychologiczne", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 2,
                    title: "Naruto",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 12, name: "Psychologiczne", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 3,
                    title: "Plastic Memories",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 12, name: "Psychologiczne", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 4,
                    title: "Shigatsu wa Kimi no Uso",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
            ],
            movies: [
                {
                    id: 5,
                    title: "Koe no Katachi",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 12, name: "Psychologiczne", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 6,
                    title: "Kimi no Na Wa",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 7,
                    title: "Kimi no Na Wa",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
                {
                    id: 8,
                    title: "Kimi no Na Wa",
                    img: img2,
                    link: "/page/cos",
                    types: [{id: 11, name: "Dramat", link: "/types/cos"}, {id: 13, name: "Okruchy Życia", link: "/types/cos"}, {id: 14, name: "Komedia", link: "/types/cos"}, {id: 15, name: "Szkolne", link: "/types/cos"}],
                    rate: 9
                },
            ],
        },
        favoriteAnime: {
            title: "Violet Evergarden",
            link: "/page/cos",
            img: img2,
            rate: 9
        },
        favoriteType: "Science Fiction"
    });
    const [searchPhraseAnime, setSearchPhraseAnime] = useState('');
    const [searchPhraseAchievement, setSearchPhraseAchievement] = useState('');

    const handleSearchAnime = (e) => {
        setSearchPhraseAnime(e.target.value);
    }

    const handleSearchAchievement = (e) => {
        setSearchPhraseAchievement(e.target.value);
    }

    const animeList = () => {
        const filtered = [...profileData.userAnimeData.series, ...profileData.userAnimeData.movies].filter(a => a.title.toLowerCase().includes(searchPhraseAnime.toLowerCase()));
        return filtered;
    }

    const achievementsList = () => {
        const filtered = profileData.achievements.filter(a => a.name.toLowerCase().includes(searchPhraseAchievement.toLowerCase()));
        return filtered;
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, []);

    return ( 
        <main className="main" style={{backgroundImage: `url(${profileData.background})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            <div className="profile main__content">
                <ProfileNav />
                <Switch>
                    <Route path="/profile/:userID" exact>
                        <ProfileHome data={profileData}/>
                    </Route>
                    <Route path="/profile/:userID/user-top">
                        <ProfileTop animeList={animeList()} handleSearch={handleSearchAnime}/>
                    </Route>
                    <Route path="/profile/:userID/achievements">
                        <ProfileAchievements achievements={achievementsList()} handleSearch={handleSearchAchievement}/>
                    </Route>
                    <Route path="/profile/:userID/settings">
                        <ProfileEdit favAnime={profileData.favoriteAnime} watchedAnimeList={profileData.statistics.watched} background={background}/>
                    </Route>
                </Switch>
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Profile);