import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Checkbox } from '@material-ui/core';

import Audio from './Audio';
import Search from './Search';

import img from '../media/img/hos-back20502.jpg';

const Changes = ({changes, isUserLogged, match}) => {

    const [animeList, setAnimeList] = useState([
        {
            _id: '',
            title: '',
        }
    ]);
    const [seasons, setSeasons] = useState([]);
    const handleSeasonsChange = (e) => {
        const seasonsList = [...seasons];
        if (seasonsList.indexOf(e.target.value) === -1) {
            seasonsList.push(e.target.value);
        } else {
            seasonsList.splice(seasonsList.indexOf(e.target.value), 1);
        }
        const sorted = seasonsList.sort((a, b) => {
            if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            } else if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        setSeasons(sorted);
    }
    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const [description, setDesription] = useState('');
    const [composer, setComposer] = useState('');
    const [soundtrackTitle, setSoundtrackTitle] = useState('');
    const [scenario, setScenario] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [duration, setDuration] = useState('');
    const handleInputChange = (type, e) => {
        if (type === "description") {
            setDesription(e.target.value);
        } else if (type === "composer") {
            setComposer(e.target.value);
        } else if (type === "soundtrackTitle") {
            setSoundtrackTitle(e.target.value);
        } else if (type === "scenario") {
            setScenario(e.target.value);
        } else if (type === "productionDate") {
            setProductionDate(e.target.value);
        } else if (type === "duration") {
            setDuration(e.target.value);
        }
    }

    const [galeryPreview, setGaleryPreview] = useState(img);
    const [galery, setGalery] = useState(null);
    const [galerySize, setGalerySize] = useState('');
    const [soundtrackPreview, setSoundtrackPreview] = useState('');
    const [soundtrack, setSoundtrack] = useState(null);
    const [soundtrackSize, setSoundtrackSize] = useState('');
    const handleFileChange = (e) => {
        const type = e.target.getAttribute('data-type');
        const file = e.target.files[0];
        const url = URL.createObjectURL(e.target.files[0]);
        const size = e.target.files[0].size / 1024 / 1024;
        let response;
        let color;
        if (type === 'galery') {
            setGaleryPreview(url);
            setGalery(file);
            if (size < 3) {
                color = "green";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setGalerySize(response);
        } else if (type === 'soundtrack') {
            setSoundtrackPreview(url);
            setSoundtrack(file);
            if (size < 5) {
                color = "green";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setSoundtrackSize(response);
        }
    }

    const isChecked = (anime) => {
        if (seasons.indexOf(anime) === -1) {
            return false
        } else {
            return true
        }
    }

    const handleChange = () => {

    }

    const handleSendChange = (type) => {
        if (type === 'info') {
            fetch('http://localhost:9000/pages/change/info', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    anime: match.params.anime,
                    scenario,
                    productionDate,
                    duration
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.reload();
                })
        } else if (type === 'galery') {
            const data = new FormData();
            data.append('myImg', galery);
            fetch('http://localhost:9000/images/upload', {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'user': localStorage.getItem('UID')
                },
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(res => {
                    fetch('http://localhost:9000/pages/change/add-galery-image', {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token')
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            anime: match.params.anime,
                            img: res
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res.response);
                            window.location.reload();
                        })
                })
        } else if (type === 'description') {
            fetch('http://localhost:9000/pages/change/description', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: match.params.anime,
                    description
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.reload();
                })
        } else if (type === 'soundtrack') {
            const data = new FormData();
            data.append('myMp3', soundtrack);
            fetch(`http://localhost:9000/soundtracks/upload/${composer}/${soundtrackTitle}`, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'user': localStorage.getItem('UID')
                },
                method: 'POST',
                body: data
            })
                .then(res => res.json())
                .then(res => {
                    fetch('http://localhost:9000/pages/change/add-soundtrack', {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token')
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            anime: match.params.anime,
                            mp3: res,
                            composer,
                            soundtrackTitle
                        })
                    })
                        .then(res => res.json())
                        .then(() => {
                            window.location.reload();
                        })
                })
        } else if (type === 'seasons') {
            fetch('http://localhost:9000/pages/change/add-season', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    anime: match.params.anime,
                    seasons
                })
            })
                .then(res => res.json())
                .then(() => {
                    window.location.reload();
                })
        }
    }

    const handleChangesClose = () => {
        document.querySelector('.changes').classList.toggle('none');
    }

    const animeLabelList =  () => {
        const filtered = animeList.filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()));
        const sorted = filtered.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        return sorted.map(a => <FormControlLabel key={a._id} checked={isChecked(a.title)} value={a.title} control={<Checkbox />} label={a.title} onChange={handleSeasonsChange}/>);
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
        <div className="changes none">
            <div className="curtain" onClick={handleChangesClose}></div>
            {changes === "galery" ? <div className="changes__content">
                <h3 className="changes__title mediumTitle">Dodaj Grafikę</h3>
                <form className="changes__form">
                    <input type="file" id="galery" className="changes__galeryInp none" data-type="galery" onChange={handleFileChange}/>
                    <label htmlFor="galery" className="changes__galeryLabel create__imageLabel">Wybierz Grafikę</label>
                </form>
                <div className="changes__size">
                    {galerySize}
                </div>
                <div className="changes__preview">
                    <img src={galeryPreview} alt="galery" className="img" />
                </div>
                <Button className="button changes__button" disabled={galeryPreview !== img ? true : true} onClick={() => {handleSendChange("galery")}}>Dodaj</Button>
            </div> : null}
            {changes === "description" ? <div className="changes__content">
                <h3 className="changes__title mediumTitle">Zmień Opis</h3>
                <textarea className="changes__textarea profileEdit__descriptionText" placeholder="Nowy Opis..." value={description} onChange={(e) => {handleInputChange("description", e)}}/>
                <Button className="button changes__button" onClick={() => {handleSendChange("description")}}>Zmień</Button>
            </div> : null}
            {changes === "soundtrack" ? <div className="changes__content">
                <h3 className="changes__title mediumTitle">Dodaj Soundtrack</h3>
                <form className="changes__form">
                    <input type="file" id="soundtrack" className="changes__soundtrackInp none" data-type="soundtrack" onChange={handleFileChange}/>
                    <label htmlFor="soundtrack" className="changes__soundtrackLabel create__imageLabel">Wybierz Soundtrack</label>
                </form>
                <div className="changes__size">
                    {soundtrackSize}
                </div>
                {soundtrackPreview ? <Audio mp3={soundtrackPreview}/> : null}
                <input type="text" className="changes__composer create__inputText" placeholder="Kompozytor" value={composer} onChange={(e) => {handleInputChange("composer", e)}}/>
                <input type="text" className="changes__soundtrackTitle create__inputText" placeholder="Tytuł utworu" value={soundtrackTitle} onChange={(e) => {handleInputChange("soundtrackTitle", e)}}/>
                <Button className="button changes__button" disabled={soundtrackPreview !== '' ? '' : true} onClick={() => {handleSendChange("soundtrack")}}>Dodaj</Button>
            </div> : null}
            {changes === "seasons" ? <div className="changes__content">
                <h3 className="changes__title mediumTitle">Dodaj Powiązane Anime</h3>
                <Search handleSearch={handleSearch}/>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className="create__title">Powiązane Anime</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={seasons} onChange={handleChange}>
                        {animeLabelList()}
                    </RadioGroup>
                </FormControl>
                <Button className="button changes__button" onClick={() => {handleSendChange("seasons")}}>Dodaj</Button>
            </div> : null}
            {changes === "info" ? <div className="changes__content">
                <h3 className="changes__title mediumTitle">Zmień Informacje o Anime</h3>
                <input type="text" className="changes__scenario create__inputText" placeholder="Scenariusz" value={scenario} onChange={(e) => {handleInputChange("scenario", e)}}/>
                <input type="text" className="changes__productionDate create__inputText" placeholder="Rok Produkcji" value={productionDate} onChange={(e) => {handleInputChange("productionDate", e)}}/>
                <input type="text" className="changes__duration create__inputText" placeholder="Czas Trwania" value={duration} onChange={(e) => {handleInputChange("duration", e)}}/>
                <Button className="button changes__button" onClick={() => {handleSendChange("info")}}>Zmień</Button>
            </div> : null}
        </div>
     );
}
 
export default withRouter(Changes);