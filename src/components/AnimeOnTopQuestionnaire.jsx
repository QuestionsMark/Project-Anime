import React, { useEffect, useState } from 'react';

import { useAnime } from '../contexts/AnimeProvider';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { HOST_ADDRESS } from '../config';

const AnimeOnTopQuestionnaire = ({id, refresh}) => {

    const [anime] = useAnime();

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
            fetch(`${HOST_ADDRESS}/aot/vote`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    AOTID,
                    user: JSON.parse(localStorage.getItem('animark-user-id')),
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
        return [...anime]
            .sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            })
            .map(a => <MenuItem key={a.id} value={a.id}>{a.title}</MenuItem>);
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