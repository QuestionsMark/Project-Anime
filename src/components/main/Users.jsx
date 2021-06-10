import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Search from '../Search';
import UserList from '../UserList';
import UserLegend from '../UserLegend';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

import img from '../../media/img/sak6-spec.jpg';
import img2 from '../../media/img/hos-back20502.jpg';

const Users = ({history}) => {

    const [userList, setUserList] = useState([
        {
            id: 1,
            name: "Question Mark",
            link: "/profile/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 57,
            favoriteAnime: 
            {
                name: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
                img: img,
            },
            favoriteType: "Okruchy Życia",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 7,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 8,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 2,
            name: "Przemcioss",
            link: "/profile/9845",
            avatar: img,
            backgroundTheme: img2,
            likes: 123,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Science Fiction",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 7,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 3,
            name: "PpekKOX",
            link: "/profile/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 748,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Nadprzyrodzone",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 4,
            name: "T0NY",
            link: "/profile/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 932,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Akcja",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 6,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 6,
            name: "Turbo Bocz",
            link: "/profile/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 80,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Ecchi",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
        {
            id: 5,
            name: "ButSmokes",
            link: "/profile/4034",
            avatar: img,
            backgroundTheme: img2,
            likes: 12,
            favoriteAnime: 
            {
                name: "Violet Evergarden",
                img: img,
            },
            favoriteType: "Romans",
            achievements: [
                {
                    id: 1,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 2,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 3,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 4,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
                {
                    id: 5,
                    name: "Pierwsze koty za płoty!",
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae facere tempore nulla natus deserunt et perferendis laudantium dolorum, rerum laborum mollitia illo. Sint ratione error distinctio, necessitatibus iusto vel? Ut.",
                    img: img
                },
            ]
        },
    ]);
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const filteredUsers = () => {
        const filtered = userList.filter(user => user.name.toLowerCase().includes(searchPhrase.toLowerCase()));
        const sorted = filtered.sort((a, b) => {
            if (a.achievements.length > b.achievements.length) {
                return -1;
            } else if (a.achievements.length < b.achievements.length) {
                return 1;
            } else {
                if (a.likes > b.likes) {
                    return -1;
                } else if (a.likes < b.likes) {
                    return 1;
                } else {
                    return 0;
                }
            }
        })
        return sorted;
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, []);

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <LeftSide />
            <div className="users main__content">
                <Search handleSearch={handleSearch}/>
                <UserLegend />
                <UserList users={filteredUsers()}/>
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Users);