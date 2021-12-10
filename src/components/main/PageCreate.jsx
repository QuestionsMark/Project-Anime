import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';
import { SRLWrapper } from "simple-react-lightbox";
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { useUser } from '../../contexts/UserProvider';

import Search from '../Search';
import Audio from '../Audio';
import NotFound from './NotFound';

import previewImage from '../../media/img/hos-back20502.webp';

import { HOST_ADDRESS } from '../../config';
import setMain from '../../utils/setMain';

const PageCreate = ({main, match, history}) => {

    const { setOpen, setResponse } = useResponsePopup();
    const { authorization, user } = useUser();
    const [anime, setAnime] = useState([]);
    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime`);
        if (response.ok) {
            const anime = await response.json();
            setAnime(anime);
        }
    };

    const [types, setTypes] = useState([]);
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            setTypes(types);
        }
    };


    const [searchPhrase, setSearchPhrase] = useState('');
    const handleSearch = (e) => {
        setSearchPhrase(e.target.value);
    };

    const [kind, setKind] = useState("series");
    const [title, setTitle] = useState('');
    const [scenario, setScenario] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [episodesAmount, setEpisodesAmount] = useState('');
    const [episodeDuration, setEpisodeDuration] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
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
            setEpisodesAmount(e.target.value);
        } else if (type === "episodeDuration") {
            setEpisodeDuration(e.target.value);
        } else if (type === "hoursValue") {
            setHours(e.target.value);
        } else if (type === "minutesValue") {
            setMinutes(e.target.value);
        } else if (type === "link") {
            setLink(e.target.value);
        } else if (type === "composer") {
            setComposer(e.target.value);
        } else if (type === "soundtrackTitle") {
            setSoundtrackTitle(e.target.value);
        }
    };
    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };

    const [animeTypes, setAnimeTypes] = useState([]);
    const handleTypesChange = e => {
        const type = e.target.value;
        const typesList = [...animeTypes];
        const typeIndex = typesList.findIndex(t => t.name === type);
        if (typeIndex !== -1) {
            typesList.splice(typeIndex, 1);
        } else {
            typesList.push(types.find(t => t.name === type));
        }
        const sorted = typesList.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });
        setAnimeTypes(sorted);
    };

    const [seasons, setSeasons] = useState([]);
    const handleSeasonsChange = (e) => {
        const seasonsList = [...seasons];
        const seasonIndex = seasonsList.indexOf(e.target.value);
        if (seasonIndex !== -1) {
            seasonsList.splice(seasonsList.indexOf(e.target.value), 1);
        } else {
            seasonsList.push(e.target.value);
        }
        setSeasons(seasonsList);
    };

    const [mini, setMini] = useState(null);
    const [background, setBackground] = useState(null);
    const [baner, setBaner] = useState(null);
    const [soundtrack, setSoundtrack] = useState(null);

    const [miniPreview, setMiniPreview] = useState({});
    const [backgroundPreview, setBackgroundPreview] = useState({});
    const [banerPreview, setBanerPreview] = useState({});
    const [soundtrackPreview, setSoundtrackPreview] = useState({});

    const getFile = (file) => {
        const url = URL.createObjectURL(file);
        const size = file.size / 1024 / 1024;
        const type = file.type;
        const data = new FormData();
        data.append('myImg', file);
        return {preview : {url, size, type}, data};
    };
    const handleChangeMini = e => {
        if (e.target.files.length > 0) {
            console.log(e.target.files);
            const file = e.target.files[0];
            const {preview, data} = getFile(file);
            setMini(data);
            setMiniPreview(preview);
        } else {
            setMini(null);
            setMiniPreview({});
        }
    };
    const handleChangeBackground = e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview, data} = getFile(file);
            setBackground(data);
            setBackgroundPreview(preview);
        } else {
            setBackground(null);
            setBackgroundPreview({});
        }
    };
    const handleChangeBaner = e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview, data} = getFile(file);
            setBaner(data);
            setBanerPreview(preview);
        } else {
            setBaner(null);
            setBanerPreview({});
        }
    };
    const handleChangeSoundtrack = e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview} = getFile(file);
            const data = new FormData();
            data.append('myMp3', file);
            setSoundtrack(data);
            setSoundtrackPreview(preview);
        }
    };

    const [validationErrors, setValidationErrors] = useState(
        [
            'Tytuł powinien zawierać od 1 do 150 znaków.',
            'Scenariusz powinien zawierać od 2 do 50 znaków.',
            'Rok produkcji powinien składać się z 4 cyfr.',
            'Ilość odcinków powinna być wyrażona liczbą.',
            'Czas trwania odcinka powinien być wyrażony liczbą minut.',
            'Podaj prawidłowy link. np. https://animark.pl',
            'Anime powinno zawierać chociaż jeden gatunek.',
            'Miniatura powinna być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)',
            'Wielkość miniatury nie powinna przekraczać 0.5MB.',
            'Tło powinno być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)',
            'Wielkość Tła nie powinna przekraczać 3MB.',
            'Baner powinien być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)',
            'Wielkość Baneru nie powinna przekraczać 3MB.',
        ]
    );
    const checkValidation = () => {
        const errors = [];
        const numbers = /[^0-9]/g;
        const numbersTest = (string) => {
            return string.match(numbers);
        };
        const imageTest = (image) => {
            return /jpg|jpeg|png|webp|gif/.test(image);
        };
        const audioTest = (audio) => {
            return /mp3|mpeg/.test(audio);
        }

        if (title.length === 0 || title.length > 150) {
            errors.push('Tytuł powinien zawierać od 1 do 150 znaków.');
        }

        if (scenario.length === 2 || scenario.length > 50) {
            errors.push('Scenariusz powinien zawierać od 2 do 50 znaków.');
        }

        if (productionDate.length !== 4 || numbersTest(productionDate)) {
            errors.push('Rok produkcji powinien składać się z 4 cyfr.');
        }

        if (kind === 'series') {
            if (episodesAmount.length === 0 || episodesAmount.length > 4 || numbersTest(episodesAmount)) {
                errors.push('Ilość odcinków powinna być wyrażona liczbą maksymalnie 4-cyfrową.');
            }

            if (episodeDuration.length === 0 || episodeDuration.length > 3 || numbersTest(episodeDuration)) {
                errors.push('Czas trwania odcinka powinien być wyrażony liczbą minut.');
            }
        } else {
            if (hours.length !== 1 || numbersTest(hours)) {
                errors.push('Ilość godzin powinna być wyrażona cyfrą.');
            }

            if (minutes.length === 0 || minutes.length > 2 || numbersTest(minutes)) {
                errors.push('Ilość minut powinna być wyrażona liczbą nie większą niż 59.');
            }
        }

        if (link.length === 0) {
            errors.push('Podaj prawidłowy link. np. https://animark.pl');
        }

        if (animeTypes.length === 0) {
            errors.push('Anime powinno zawierać chociaż jeden gatunek.');
        }

        if (!mini || !imageTest(miniPreview.type)) {
            errors.push('Miniatura powinna być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)');
        }

        if (miniPreview.size > 5.24288) {
            errors.push('Wielkość miniatury nie powinna przekraczać 0.5MB.');
        }

        if (!background || !imageTest(backgroundPreview.type)) {
            errors.push('Tło powinno być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)');
        }

        if (backgroundPreview.size > 3.145728) {
            errors.push('Wielkość Tła nie powinna przekraczać 3MB.');
        }

        if (!banerPreview || !imageTest(banerPreview.type)) {
            errors.push('Baner powinien być grafiką w wybranym formacie. (jpg, jpeg, png, webp, gif)');
        }

        if (banerPreview.size > 3.145728) {
            errors.push('Wielkość Baneru nie powinna przekraczać 3MB.');
        }

        if (soundtrack) {
            if (!audioTest(soundtrackPreview.type)) {
                errors.push('Soundtrack powinien być plikiem audio w formacie mp3.');
            }
            if (soundtrackPreview.size > 8.388608) {
                errors.push('Wielkość soundtracka nie powinna przekraczać 8MB.');
            }
            if (composer.length === 0 || composer.length > 50) {
                errors.push('Kompozytor powinien zawierać od 1 do 50 znaków.');
            }
            if (soundtrackTitle.length === 0 || soundtrackTitle.length > 150) {
                errors.push('Tytuł soundtracka powinien zawierać od 1 do 150 znaków.');
            }
        }

        return errors;
    };

    const validationList = () => validationErrors.map((e, i) => {
        return <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>;
    });

    const isChecked = (type, value) => {
        if (type === 'type') {
            if (animeTypes.findIndex(t => t.name === value) !== -1) return true;
            return false;
        } else {
            if (seasons.findIndex(a => a === value) !== -1) return true
            return false;
        }
    };

    const reset = () => {
        setKind('series');
        setTitle('');
        setScenario('');
        setProductionDate('');
        setEpisodesAmount('');
        setEpisodeDuration('');
        setHours('');
        setMinutes('');
        setLink('');
        setAnimeTypes([]);
        setSeasons([]);
        setComposer('');
        setSoundtrackTitle('');
        setMini(null);
        setBackground(null);
        setBaner(null);
        setSoundtrack(null);
    };

    const labelTypesList = () => {
        return types
            .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            .map(t => <FormControlLabel key={t.id} checked={isChecked('type', t.name)} value={t.name} control={<Checkbox />} label={t.name} onChange={handleTypesChange}/>);
    };
    const labelAnimeList =  () => {
        return anime
            .filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map(a => <FormControlLabel key={a.id} checked={isChecked('season', a.id)} value={a.id} control={<Checkbox/>} label={a.title} onChange={handleSeasonsChange}/>);
    };

    const handleRemoveSoundtrack = () => {
        setSoundtrack(null);
        setSoundtrackPreview({ url: '', size: 0, type: '' });
    };

    const handleAddNewAnime = async () => {
        const saveMini = async () => {
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'POST',
                headers: {
                    'user': user.id,
                },
                body: mini,
            });
            if (response.ok) {
                const images = await response.json();
                return images[0];
            }
        };
        const saveBackground = async () => {
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'POST',
                headers: {
                    'user': user.id,
                },
                body: background,
            });
            if (response.ok) {
                const images = await response.json();
                return images[0];
            }
        };
        const saveBaner = async () => {
            const response = await fetch(`${HOST_ADDRESS}/images`, {
                method: 'POST',
                headers: {
                    'user': user.id,
                },
                body: baner,
            });
            if (response.ok) {
                const images = await response.json();
                return images[0];
            }
        };
        const saveSoundtrack = async () => {
            const response = await fetch(`${HOST_ADDRESS}/soundtracks/${composer}/${soundtrackTitle}/${user.id}`, {
                method: 'POST',
                body: soundtrack,
            });
            if (response.ok) {
                const audio = await response.json();
                return audio;
            }
        };

        if (validationErrors.length === 0) {
            reset();
            let response;
            if (soundtrack) {
                response = await Promise.all([saveMini(), saveBackground(), saveBaner(), saveSoundtrack()]);
            } else {
                response = await Promise.all([saveMini(), saveBackground(), saveBaner()]);
            }

            let duration;
            if (kind === 'series') {
                duration = `${episodesAmount}odc. ${episodeDuration}min.`;
            } else {
                duration = `${hours}godz. ${minutes}min.`;
            }

            const miniObj = {
                id: response[0].id,
                img: response[0].img,
                fromAnime: title
            }

            const backgroundObj = {
                id: response[1].id,
                img: response[1].img,
                fromAnime: title
            }
    
            const banerObj = {
                id: response[2].id,
                img: response[2].img,
                fromAnime: title
            }
    
            let soundtrackObj;
            if (soundtrack) {
                soundtrackObj = {
                    id: response[3].id,
                    mp3: response[3].mp3,
                    title: soundtrackTitle,
                    composer: composer,
                    likes: [],
                }
            }
            
            const obj = {
                kind,
                title,
                scenario,
                productionDate,
                duration,
                link,
                types: animeTypes,
                seasons,
                mini: miniObj,
                background: backgroundObj,
                baner: banerObj,
                soundtrack: soundtrackObj,
                galeryImages: [backgroundObj, banerObj],
            }
            const response2 = await fetch(`${HOST_ADDRESS}/anime`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(obj)
            });
            if (response2.ok) {
                setResponse({status: response2.ok, message: 'Dodano nowe anime!'});
            } else {
                const error = await response2.json();
                setResponse({status: response2.ok, message: error.message});
            }
            getAnime();
            setOpen(true);
        }
    };

    const setPreviews = () => {
        const preview = { url: previewImage, size: 0, type: '' };
        setMiniPreview(preview);
        setBackgroundPreview(preview);
        setBanerPreview(preview);
        setSoundtrackPreview({ url: '', size: 0, type: '' });
    };

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    useEffect(() => {
        getAnime();
        getTypes();
    }, []);

    useEffect(() => {
        setPreviews();
    }, [anime]);

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [title, kind, scenario, productionDate, episodesAmount, episodeDuration, hours, minutes, link, animeTypes, seasons, mini, background, baner, soundtrack, composer, soundtrackTitle]);

    return ( 
        <>
        {authorization === '2' || authorization === '3' ?
            <div className="create main__content">
                <h1 className="create__createAnime">Tworzenie Nowego Anime</h1>
                <div className="create__wrapper">
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
                        <input type="text" className="create__titleInp create__inputText" placeholder="Tytuł" value={title} onChange={handleChangeTitle}/>
                    </div>
                    <div className="create__info create__section">
                        <h3 className="create__title">Informacje</h3>
                        <input type="text" className="create__scenarioInp create__inputText" placeholder="scenariusz" value={scenario} onChange={(e) => {handleInfChange("scenario", e)}}/>
                        <input type="text" className="create__productionDateInp create__inputText" placeholder="Rok produkcji" value={productionDate} onChange={(e) => {handleInfChange("productionDate", e)}}/>
                        {kind === "series" ? 
                        <div className="create__seriesKind">
                            <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość odcinków" value={episodesAmount} onChange={(e) => {handleInfChange("episodesValue", e)}}/>
                            <input type="text" className="create__duration2Inp create__inputText" placeholder="Czas trwania odcinka w min" value={episodeDuration} onChange={(e) => {handleInfChange("episodeDuration", e)}}/>
                        </div>
                        :
                        <div className="create__seriesKind">
                            <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość godzin" value={hours} onChange={(e) => {handleInfChange("hoursValue", e)}}/>
                            <input type="text" className="create__duration2Inp create__inputText" placeholder="Ilość minut" value={minutes} onChange={(e) => {handleInfChange("minutesValue", e)}}/>
                        </div> }
                    </div>
                    <div className="create__link create__section">
                        <h3 className="create__title">Link</h3>
                        <input type="text" className="create__linkInp create__inputText" placeholder="Link do oglądania" value={link} onChange={(e) => {handleInfChange("link", e)}}/>
                    </div>
                    <div className="create__types create__section">
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className="create__title">Gatunki</FormLabel>
                            <RadioGroup value={types}>
                                {types.length > 0 ? labelTypesList() : null}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="create__seasons create__section">
                        <Search handleSearch={handleSearch}/>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" className="create__title">*Powiązane Anime</FormLabel>
                            <RadioGroup value={seasons}>
                                {anime.length > 0 ? labelAnimeList() : null}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <SRLWrapper>
                        <form className="create__images create__section">
                            <h3 className="create__title">Grafiki</h3>
                            <input type="file" id="mini" className="create__imageInp" onChange={handleChangeMini}/>
                            <label htmlFor="mini" className="create__imageLabel">Wybierz Miniaturę</label>
                            {mini ? <div className="create__preview">
                                <p className="changes__size" style={{color: miniPreview.size < 0.524288 ? '#5ec45e' : '#d14141'}}>{miniPreview.size.toFixed(2)} MB {miniPreview.size < 0.524288 ? 'OK' : 'Plik jest za duży!'}</p>
                                <div className="create__preview-img create__preview-img--square" style={{ backgroundImage: `url(${miniPreview.url})` }}/>
                            </div> : null}
                            <input type="file" id="background" className="create__imageInp" onChange={handleChangeBackground}/>
                            <label htmlFor="background" className="create__imageLabel">Wybierz Tło</label>
                            {background ? <div className="create__preview">
                                <p className="changes__size" style={{color: backgroundPreview.size < 3.145728 ? '#5ec45e' : '#d14141'}}>{backgroundPreview.size.toFixed(2)} MB {backgroundPreview.size < 3.145728 ? 'OK' : 'Plik jest za duży!'}</p>
                                <div className="create__preview-img create__preview-img--background" style={{ backgroundImage: `url(${backgroundPreview.url})` }}/>
                            </div> : null}
                            <input type="file" id="baner" className="create__imageInp" onChange={handleChangeBaner}/>
                            <label htmlFor="baner" className="create__imageLabel">Wybierz Baner</label>
                            {baner ? <div className="create__preview">
                                <p className="changes__size" style={{color: banerPreview.size < 3.145728 ? '#5ec45e' : '#d14141'}}>{banerPreview.size.toFixed(2)} MB {banerPreview.size < 3.145728 ? 'OK' : 'Plik jest za duży!'}</p>
                                <div className="create__preview-img create__preview-img--background" style={{ backgroundImage: `url(${banerPreview.url})` }}/>
                            </div> : null}
                        </form>
                    </SRLWrapper>
                    <form className="create__soundtrack create__section">
                        <h3 className="create__title">*Soundtrack</h3>
                        <input type="file" id="music" className="create__soundtrackInp" onChange={handleChangeSoundtrack}/>
                        <label htmlFor="music" className="create__imageLabel">Soundtrack</label>
                        {soundtrack ? <div className="create__preview">
                            <p className="changes__size" style={{color: soundtrackPreview.size < 8.388608 ? '#5ec45e' : '#d14141'}}>{soundtrackPreview.size.toFixed(2)} MB {soundtrackPreview.size < 8.388608 ? 'OK' : 'Plik jest za duży!'}</p>
                            <Audio mp3={soundtrackPreview.url}/>
                            <RemoveRoundedIcon className="create__delete-icon" onClick={handleRemoveSoundtrack}/>
                        </div> : null}
                        <input type="text" className="create__composerInp create__inputText" placeholder="Kompozytor" value={composer} onChange={(e) => {handleInfChange("composer", e)}}/>
                        <input type="text" className="create__soundtrackTitle create__inputText" placeholder="Tytuł utworu" value={soundtrackTitle} onChange={(e) => {handleInfChange("soundtrackTitle", e)}}/>
                    </form>
                </div>
                <div className="create__send">
                    <Button className={`button create__add ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleAddNewAnime}>Dodaj Nowe Anime</Button>
                    <ul className="changes__validation-list">
                        {validationList()}
                    </ul>
                </div>
            </div> : <NotFound />}
        </>
     );
}
 
export default withRouter(PageCreate);