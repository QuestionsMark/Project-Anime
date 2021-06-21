import React, { useEffect, useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const AnimeOnTopQuestionnaire = ({id, refresh}) => {

    const [animeList, setAnimeList] = useState([
        {
            _id: '',
            title: ''
        }
    ]);
    const [AOTQuestionnaire, setAOTQuestionnaire] = useState('');

    const handleSendVote = (e) => {
        let target = e.target;
        if (target.localName === "span") {
            target = target.parentElement;
        }
        if (AOTQuestionnaire !== '') {
            target.disabled = true;
            target.classList.add('Mui-disabled');
            const AOTID = id;
            fetch('http://localhost:9000/aot/vote', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    AOTID,
                    user: localStorage.getItem('UID'),
                    vote: AOTQuestionnaire
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.response);
                    refresh()
                });
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
        const list = formAnimeList.map(anime => <MenuItem key={anime._id} value={anime.title}>{anime.title}</MenuItem>);
        return list;
    }

    const callAPI = () => {
        fetch('http://localhost:9000/anime')
        .then(res => res.json())
        .then(res => setAnimeList(res));
    }

    useEffect(() => {
        callAPI();
    },[])

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