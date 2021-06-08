import React, { useState, useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import SingleFolder from '../SingleFolder';
import GaleryImages from '../GaleryImages';

import img from '../../media/img/hos-back20502.jpg';
import Search from '../Search';

const Galery = ({history}) => {

    const [anime, setAnime] = useState({
        series: [
            {
                id: 1,
                title: "Violet Evergarden",
                link: "/galery/vios",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Violet Evergarden"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Violet Evergarden"
                    }
                ]
            },
            {
                id: 2,
                title: "Naruto",
                link: "/galery/nar",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Naruto"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Naruto"
                    }
                ]
            }
        ],
        movies: [
            {
                id: 3,
                title: "Koe no Katachi",
                link: "/galery/koe",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    }
                ]
            },
            {
                id: 4,
                title: "Kimi no Na Wa",
                link: "/galery/kimi",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    }
                ]
            },
            {
                id: 5,
                title: "Tenko no Ko",
                link: "/galery/ten",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    }
                ]
            },
            {
                id: 6,
                title: "Koe no Katachi",
                link: "/galery/koe",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    }
                ]
            },
            {
                id: 7,
                title: "Kimi no Na Wa",
                link: "/galery/kimi",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    }
                ]
            },
            {
                id: 8,
                title: "Tenko no Ko",
                link: "/galery/ten",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    }
                ]
            },
            {
                id: 9,
                title: "Koe no Katachi",
                link: "/galery/koe",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Koe no Katachi"
                    }
                ]
            },
            {
                id: 10,
                title: "Kimi no Na Wa",
                link: "/galery/kimi",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Kimi no Na Wa"
                    }
                ]
            },
            {
                id: 11,
                title: "Tenko no Ko",
                link: "/galery/ten",
                galeryImages: [
                    {
                        id: 1,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    },
                    {
                        id: 2,
                        img: img,
                        fromAnime: "Tenko no Ko"
                    }
                ]
            }
        ]
    });
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const folderList = () => {
        const folders = [...anime.series, ...anime.movies];
        const filtered = folders.filter(f => f.title.toLowerCase().includes(searchPhrase.toLowerCase()));
        return filtered.map(f => <SingleFolder key={f.id} anime={f.title} link={f.link} images={f.galeryImages}/>)
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
    }, []);

    return ( 
        <main className="main">
            <div className="galery main__content">
                <Switch>
                    <Route path="/galery" exact>
                        <div className="galery__search">
                            <Search handleSearch={handleSearch}/>
                        </div>
                        <div className="galery__folderContainer">
                            {folderList()}
                        </div>
                    </Route>
                    <Route path="/galery/:anime">
                        <SRLWrapper>
                            <GaleryImages anime={[...anime.series, ...anime.movies]}/>
                        </SRLWrapper>
                    </Route>
                </Switch>
            </div>
        </main>
     );
}
 
export default withRouter(Galery);