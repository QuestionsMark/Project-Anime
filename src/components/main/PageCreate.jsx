import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { SRLWrapper } from "simple-react-lightbox";

import { FormControl, RadioGroup, Radio, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';

import Search from '../Search';
import Audio from '../Audio';

import img from '../../media/img/hos-back20502.jpg';
import { useEffect } from 'react';

const PageCreate = () => {

    const [typesList, setTypesList] = useState([]);
    const [animeList, setAnimeList] = useState([
        {
            id: 1,
            title: "Violet Evergarden",
        },
        {
            id: 2,
            title: "Plastic Memories",
        },
        {
            id: 3,
            title: "Koe no Katachi",
        },
        {
            id: 4,
            title: "Kimi no Na Wa",
        },
        {
            id: 5,
            title: "Tenki no ko",
        },
        {
            id: 6,
            title: "Naruto",
        },
        {
            id: 7,
            title: "Shigatsu wa Kimi no Uso",
        },
        {
            id: 8,
            title: "Charlotte",
        }
    ]);
    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    }

    const [kind, setKind] = useState("series");
    const [title, setTitle] = useState('');
    const [scenario, setScenario] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [episodesValue, setEpisodesValue] = useState('');
    const [episodeDuration, setEpisodeDuration] = useState('');
    const [hoursValue, setHoursValue] = useState('');
    const [minutesValue, setMinutesValue] = useState('');
    const [link, setLink] = useState('');
    const [composer, setComposer] = useState('');
    const [soundtrackTitle, setSoundtrackTitle] = useState('');
    const handleInfChange = (type, e) => {
        if (type === "kind") {
            setKind(e.target.value);
        } else if (type === "title") {
            setTitle(e.target.value);
        } else if (type === "scenario") {
            setScenario(e.target.value);
        } else if (type === "productionDate") {
            setProductionDate(e.target.value);
        } else if (type === "episodesValue") {
            setEpisodesValue(e.target.value);
        } else if (type === "episodeDuration") {
            setEpisodeDuration(e.target.value);
        } else if (type === "hoursValue") {
            setHoursValue(e.target.value);
        } else if (type === "minutesValue") {
            setMinutesValue(e.target.value);
        } else if (type === "link") {
            setLink(e.target.value);
        } else if (type === "composer") {
            setComposer(e.target.value);
        } else if (type === "soundtrackTitle") {
            setSoundtrackTitle(e.target.value);
        }
    }

    const [types, setTypes] = useState([]);
    const handleTypesChange = async function (e) {
        const typesList = [...types];
        if (typesList.findIndex(t => t.name === e.target.value) === -1) {
            await fetch(`http://localhost:9000/types/${e.target.value}`)
                .then(res => res.json())
                .then(res => {
                    typesList.push({id: res._id, name: res.name, link: res.link});
                });
        } else {
            typesList.splice(typesList.findIndex(t => t.name === e.target.value), 1);
        }
        const sorted = typesList.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
        setTypes(sorted);
        console.log(types)
    }

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

    const [mini, setMini] = useState(null);
    const [background, setBackground] = useState(null);
    const [baner, setBaner] = useState(null);
    const [soundtrack, setSoundtrack] = useState(null);

    const [previewMini, setPreviewMini] = useState(img);
    const [previewBackground, setPreviewBackground] = useState(img);
    const [previewBaner, setPreviewBaner] = useState(img);
    const [previewSoundtrack, setPreviewSoundtrack] = useState('');
    const [miniSize, setMiniSize] = useState('');
    const [backgroundSize, setBackgroundSize] = useState('');
    const [banerSize, setBanerSize] = useState('');
    const [soundtrackSize, setSoundtrackSize] = useState('');
    const handleFileChange = (e) => {
        const type = e.target.getAttribute('data-type');
        const file = e.target.files[0];
        const url = URL.createObjectURL(e.target.files[0]);
        const size = e.target.files[0].size / 1024 / 1024;
        let response;
        let color;
        if (type === 'mini') {
            setPreviewMini(url);
            setMini(file);
            if (size < 0.5) {
                color = "green";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size miniRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setMiniSize(response);
        } else if (type === 'background') {
            setPreviewBackground(url);
            setBackground(file);
            if (size < 3) {
                color = "green";
                response = <p className="create__size backgroundRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size backgroundRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setBackgroundSize(response);
        } else if (type === 'baner') {
            setPreviewBaner(url);
            setBaner(file);
            if (size < 1) {
                color = "green";
                response = <p className="create__size banerRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size banerRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setBanerSize(response);
        } else if (type === 'soundtrack') {
            setPreviewSoundtrack(url);
            setSoundtrack(file);
            if (size < 5) {
                color = "green";
                response = <p className="create__size soundtrackRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>OK</p>;
            } else {
                color = "red";
                response = <p className="create__size soundtrackRes" style={{color: color}}><span className="create__sizeInf">{e.target.files[0].name}</span><span className="create__sizeInf">{size.toFixed(2)} MB</span>Za duży rozmiar pliku!</p>;
            }
            setSoundtrackSize(response);
        }
    }

    let miniObj = {};
    let banerObj = {};
    let backgroundObj = {};
    let soundtrackObj = {};

    const isChecked = (anime) => {
        if (seasons.indexOf(anime) === -1) {
            return false
        } else {
            return true
        }
    }

    const handleChange = (e) => {
    }

    const handleAddNewAnime = () => {
        const type = kind;
        let duration;
        if (type === "series") {
            duration = `${episodesValue}odc. ${episodeDuration}min.`;
        } else {
            duration = `${hoursValue}godz. ${minutesValue}min.`;
        }
        const data = new FormData();
        data.append('myImg', background);
        fetch('http://localhost:9000/images/upload', {
            headers: {
                'authorization': localStorage.getItem('token'),
                'rank': localStorage.getItem('r'),
                'user': localStorage.getItem('UID'),
            },
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                backgroundObj = {
                    id: res.id,
                    img: res.img,
                    fromAnime: title
                }
                const data2 = new FormData();
                data2.append('myImg', baner);
                fetch('http://localhost:9000/images/upload', {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'rank': localStorage.getItem('r'),
                    'user': localStorage.getItem('UID'),
                },
                method: 'POST',
                body: data2
                })
                    .then(res => res.json())
                    .then(res => {
                        banerObj = {
                            id: res.id,
                            img: res.img,
                            fromAnime: title
                        }
                        const data3 = new FormData();
                        data3.append('myImg', mini);
                        fetch('http://localhost:9000/images/upload', {
                        headers: {
                            'authorization': localStorage.getItem('token'),
                            'rank': localStorage.getItem('r'),
                            'user': localStorage.getItem('UID'),
                        },
                        method: 'POST',
                        body: data3
                        })
                            .then(res => res.json())
                            .then(res => {
                                miniObj = {
                                    id: res.id,
                                    img: res.img,
                                    fromAnime: title
                                }
                                const data4 = new FormData();
                                data4.append('myMp3', soundtrack);

                                fetch(`http://localhost:9000/soundtracks/upload/${composer}/${soundtrackTitle}`, {
                                headers: {
                                    'authorization': localStorage.getItem('token'),
                                    'rank': localStorage.getItem('r'),
                                    'user': localStorage.getItem('UID'),
                                },
                                method: 'POST',
                                body: data4
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        soundtrackObj = {
                                            id: res.id,
                                            mp3: res.mp3,
                                            title: soundtrackTitle,
                                            composer,
                                            likes: [],
                                        }
                                        const obj = {
                                            kind,
                                            title,
                                            scenario,
                                            productionDate,
                                            duration,
                                            link,
                                            types,
                                            seasons,
                                            mini: miniObj,
                                            background: backgroundObj,
                                            baner: banerObj,
                                            soundtrack: soundtrackObj,
                                            galeryImages: [backgroundObj, banerObj]
                                        }
                                        fetch('http://localhost:9000/anime/create', {
                                            headers: {
                                                'Content-Type': 'application/json; charset=utf-8',
                                                'authorization': localStorage.getItem('token'),
                                                'rank': localStorage.getItem('r'),
                                                'user': localStorage.getItem('UID')
                                            },
                                            method: 'POST',
                                            body: JSON.stringify(obj)
                                        })
                                        .then(res => res.json())
                                        .then(res => {
                                            console.log(res);
                                        });
                                    })
                            })
                    })
            })
    }

    const typesLabelList = typesList.map(t => <FormControlLabel key={t._id} value={t.name} control={<Checkbox />} label={t.name} onChange={handleTypesChange}/>);

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
        return sorted.map(a => <FormControlLabel key={a._id} checked={isChecked(a.title)} value={a.title} control={<Checkbox/>} label={a.title} onChange={handleSeasonsChange}/>);
    }

    const callAPI = () => {
        fetch('http://localhost:9000/types')
        .then(res => res.json())
        .then(res => setTypesList(res));
        fetch('http://localhost:9000/anime')
        .then(res => res.json())
        .then(res => {
            setAnimeList(res)
        });
    }

    useEffect(() => {
        callAPI();
    },[])

    return ( 
        <main className="main">
            <div className="curtain"></div>
            <div className="create main__content">
                <h1 className="create__createAnime">Tworzenie Nowego Anime</h1>
                <div className="create__wrapper">
                    <div className="create__left">
                        <div className="create__kind create__section">
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="create__title">Typ anime</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={kind} onChange={(e) => {handleInfChange("kind", e)}}>
                                    <FormControlLabel value="series" control={<Radio />} label="Seria odcinków" className="create__radioLabel"/>
                                    <FormControlLabel value="movie" control={<Radio />} label="Film" className="create__radioLabel"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="create__animeTitle create__section">
                            <h3 className="create__title">Tytuł</h3>
                            <input type="text" className="create__titleInp create__inputText" placeholder="Tytuł" value={title} onChange={(e) => {handleInfChange("title", e)}}/>
                        </div>
                        <div className="create__info create__section">
                            <h3 className="create__title">Informacje</h3>
                            <input type="text" className="create__scenarioInp create__inputText" placeholder="scenariusz" value={scenario} onChange={(e) => {handleInfChange("scenario", e)}}/>
                            <input type="text" className="create__productionDateInp create__inputText" placeholder="Rok produkcji" value={productionDate} onChange={(e) => {handleInfChange("productionDate", e)}}/>
                            {kind === "series" ? 
                            <div className="create__seriesKind">
                                <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość odcinków" value={episodesValue} onChange={(e) => {handleInfChange("episodesValue", e)}}/>
                                <input type="text" className="create__duration2Inp create__inputText" placeholder="Czas trwania odcinka w min" value={episodeDuration} onChange={(e) => {handleInfChange("episodeDuration", e)}}/>
                            </div>
                            :
                            <div className="create__seriesKind">
                                <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość godzin" value={hoursValue} onChange={(e) => {handleInfChange("hoursValue", e)}}/>
                                <input type="text" className="create__duration2Inp create__inputText" placeholder="Ilość minut" value={minutesValue} onChange={(e) => {handleInfChange("minutesValue", e)}}/>
                            </div> }
                        </div>
                        <div className="create__link create__section">
                            <h3 className="create__title">Link</h3>
                            <input type="text" className="create__linkInp create__inputText" placeholder="Link do oglądania" value={link} onChange={(e) => {handleInfChange("link", e)}}/>
                        </div>
                        <div className="create__types create__section">
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="create__title">Gatunki</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={types} onChange={handleChange}>
                                    {typesLabelList}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="create__seasons create__section">
                            <Search handleSearch={handleSearch}/>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="create__title">Powiązane Anime</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={seasons} onChange={handleChange}>
                                    {animeLabelList()}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className="create__right">
                        <SRLWrapper>
                            <form className="create__images create__section">
                                <h3 className="create__title">Grafiki</h3>
                                <input type="file" id="mini" className="create__imageInp" data-type="mini" onChange={handleFileChange}/>
                                <label htmlFor="mini" className="create__imageLabel">Wybierz Miniaturę</label>
                                {miniSize}
                                <div className="create__preview create__preview--mini">
                                    <img src={previewMini} alt="Podgląd" className="img" srl_gallery_image="true" />
                                </div>
                                <input type="file" id="background" className="create__imageInp" data-type="background" onChange={handleFileChange}/>
                                <label htmlFor="background" className="create__imageLabel">Wybierz Tło</label>
                                {backgroundSize}
                                <div className="create__preview">
                                    <img src={previewBackground} alt="Podgląd" className="img" srl_gallery_image="true" />
                                </div>
                                <input type="file" id="baner" className="create__imageInp" data-type="baner" onChange={handleFileChange}/>
                                <label htmlFor="baner" className="create__imageLabel">Wybierz Baner</label>
                                {banerSize}
                                <div className="create__preview">
                                    <img src={previewBaner} alt="Podgląd" className="img" srl_gallery_image="true" />
                                </div>
                            </form>
                        </SRLWrapper>
                        <form className="create__soundtrack create__section">
                            <h3 className="create__title">Soundtrack</h3>
                            <input type="file" id="music" className="create__soundtrackInp" data-type="soundtrack" onChange={handleFileChange}/>
                            <label htmlFor="music" className="create__imageLabel">Soundtrack</label>
                            {soundtrackSize}
                            {previewSoundtrack ? <Audio mp3={previewSoundtrack}/> : null}
                            <input type="text" className="create__composerInp create__inputText" placeholder="Kompozytor" value={composer} onChange={(e) => {handleInfChange("composer", e)}}/>
                            <input type="text" className="create__soundtrackTitle create__inputText" placeholder="Tytuł utworu" value={soundtrackTitle} onChange={(e) => {handleInfChange("soundtrackTitle", e)}}/>
                        </form>
                    </div>
                </div>
                <div className="create__send">
                    <Button className="button create__add" onClick={handleAddNewAnime}>Dodaj Nowe Anime</Button>
                </div>
            </div>
        </main>
     );
}
 
export default PageCreate;