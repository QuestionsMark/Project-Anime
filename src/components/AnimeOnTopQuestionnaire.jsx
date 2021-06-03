import React, { useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const AnimeOnTopQuestionnaire = () => {

    const [animeList, setAnimeList] = useState([
        {
            id: 1,
            title: "Violet Evergarden"
        },
        {
            id: 2,
            title: "Sword Art Online"
        },
        {
            id: 3,
            title: "Charlotte"
        },
        {
            id: 4,
            title: "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"
        },
        {
            id: 5,
            title: "Sakurasou no Pet na Kanojo"
        },
        {
            id: 6,
            title: "Fruits Bbasket"
        },
        {
            id: 7,
            title: "Bleach"
        },
        {
            id: 1,
            title: "Violet Evergarden"
        },
        {
            id: 2,
            title: "Sword Art Online"
        },
        {
            id: 3,
            title: "Charlotte"
        },
        {
            id: 4,
            title: "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai"
        },
        {
            id: 5,
            title: "Sakurasou no Pet na Kanojo"
        },
        {
            id: 6,
            title: "Fruits Bbasket"
        },
        {
            id: 7,
            title: "Bleach"
        }
    ]);
    const [AOTQuestionnaire, setAOTQuestionnaire] = useState('');

    const handleSendVote = (e) => {
        const vote = AOTQuestionnaire;
        let target = e.target;
        if (target.localName === "span") {
            target = target.parentElement;
        }
        if (vote !== '') {
            target.disabled = true;
            console.log(`fetchujemy z ${vote}`);
            target.classList.add('Mui-disabled');
        } else {
            console.log('jesteś zjebem');
        }
    }

    const handleAOTQChange = (e) => {
        setAOTQuestionnaire(e.target.value)
    }

    const formAnimeList = () => {
        let formAnimeList = [...animeList].sort(function( a, b ) {
            if ( a.title.toLowerCase() < b.title.toLowerCase() ){
              return -1;
            }
            if ( a.title.toLowerCase() > b.title.toLowerCase() ){
              return 1;
            }
            return 0;
        });
        const list = formAnimeList.map(anime => <MenuItem key={anime.id} value={anime.title}>{anime.title}</MenuItem>);
        return list;
    }

    return ( 
        <div className="AOT__questionnaire">
            <h2 className="AOT__questionnaireTitle">Które anime według Ciebie jest najlepsze?</h2>
            <div className="AOT__form">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Anime</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={AOTQuestionnaire} onChange={handleAOTQChange}>
                        {formAnimeList()}
                    </Select>
                </FormControl>
                <Button className="button AOT__send" onClick={handleSendVote}>Zagłosuj</Button>
            </div>
        </div>
     );
}
 
export default AnimeOnTopQuestionnaire;