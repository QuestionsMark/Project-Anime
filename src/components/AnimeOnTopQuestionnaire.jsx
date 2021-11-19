import React, { useState } from 'react';

import { useData } from '../contexts/DataProvider';
import { useUser } from '../contexts/UserProvider';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { HOST_ADDRESS } from '../config';

const AnimeOnTopQuestionnaire = ({id}) => {

    const [,,,, user] = useUser();
    const { anime, setAnimeOnTop } = useData();
    const getAnimeOnTop = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
        if (response.ok) {
            const animeOnTop = await response.json();
            setAnimeOnTop(animeOnTop);
        }
    };

    const [vote, setVote] = useState('');
    const handleVoteChange = e => {
        setVote(e.target.value);
    };

    const handleVote = async () => {
        if (vote !== '') {
            await fetch(`${HOST_ADDRESS}/anime-on-top/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    user: user.id,
                    vote,
                }),
            });
            getAnimeOnTop();
        }
    };

    const formAnimeList = () => {
        return [...anime]
            .sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            })
            .map(a => <MenuItem key={a.id} value={a.title}>{a.title}</MenuItem>);
    };

    return ( 
        <div className="AOT__questionnaire">
            <h2 className="AOT__questionnaireTitle">Które anime według Ciebie jest najlepsze?</h2>
            <div className="AOT__form">
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Anime</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={vote} onChange={handleVoteChange}>
                        {formAnimeList()}
                    </Select>
                </FormControl>
                <Button className={`button AOT__send ${vote ? '' : 'Mui-disabled'}`} onClick={handleVote}>Zagłosuj</Button>
            </div>
        </div>
     );
}
 
export default AnimeOnTopQuestionnaire;