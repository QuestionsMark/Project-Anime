import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import Loading from '../../Loading';
import Kind from './Kind';
import Seasons from './Seasons';
import Types from './Types';
import Link from './Link';
import Info from './Info';
import Title from './Title';
import Graphics from './Graphics';
import Soundtrack from './Soundtrack';

import { useResponsePopup } from '../../../contexts/ResponsePopupProvider';
import { useUser } from '../../../contexts/UserProvider';

import { HOST_ADDRESS } from '../../../config';
import setMain from '../../../utils/setMain';
import { DefaultArray } from '../../../utils/CustomClasses';

import previewImage from '../../../media/img/hos-back20502.webp';

const AnimeCreate = ({main, match, history}) => {

    const componentRef = useRef();

    const { setOpen, setResponse } = useResponsePopup();
    const { authorization, user } = useUser();
    const [anime, setAnime] = useState(new DefaultArray());
    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/title`);
        if (response.ok) {
            const anime = await response.json();
            if (!componentRef.current) return;
            setAnime(anime);
        }
    };

    const [types, setTypes] = useState(new DefaultArray());
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            if (!componentRef.current) return;
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
    const handleTypesChange = useCallback(e => {
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
    }, [animeTypes, types]);

    const [seasons, setSeasons] = useState([]);
    const handleSeasonsChange = useCallback((e) => {
        const seasonsList = [...seasons];
        const seasonIndex = seasonsList.indexOf(e.target.value);
        if (seasonIndex !== -1) {
            seasonsList.splice(seasonsList.indexOf(e.target.value), 1);
        } else {
            seasonsList.push(e.target.value);
        }
        setSeasons(seasonsList);
    }, [seasons]);

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
    const handleChangeMini = useCallback(e => {
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
    }, []);
    const handleChangeBackground = useCallback(e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview, data} = getFile(file);
            setBackground(data);
            setBackgroundPreview(preview);
        } else {
            setBackground(null);
            setBackgroundPreview({});
        }
    }, []);
    const handleChangeBaner = useCallback(e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview, data} = getFile(file);
            setBaner(data);
            setBanerPreview(preview);
        } else {
            setBaner(null);
            setBanerPreview({});
        }
    }, []);
    const handleChangeSoundtrack = useCallback(e => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const {preview} = getFile(file);
            const data = new FormData();
            data.append('myMp3', file);
            setSoundtrack(data);
            setSoundtrackPreview(preview);
        }
    }, []);

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
    const checkValidation = useCallback(() => {
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
    }, [animeTypes, background, backgroundPreview, banerPreview, composer, episodeDuration, episodesAmount, hours, kind, link, mini, miniPreview, minutes, productionDate, scenario, soundtrack, soundtrackPreview, soundtrackTitle, title]);

    const validationList = () => validationErrors.map((e, i) => {
        return <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>;
    });

    const isChecked = useCallback((type, value) => {
        if (type === 'type') {
            if (animeTypes.findIndex(t => t.name === value) !== -1) return true;
            return false;
        } else {
            if (seasons.findIndex(a => a === value) !== -1) return true
            return false;
        }
    }, [animeTypes, seasons]);

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

    const kindComponent = useMemo(() => <Kind kind={kind} handleInfChange={handleInfChange}/>, [kind]);

    const seasonsComponent = useMemo(() => <Seasons anime={anime} seasons={seasons} searchPhrase={searchPhrase} handleSearch={handleSearch} isChecked={isChecked} handleSeasonsChange={handleSeasonsChange}/>, [anime, handleSeasonsChange, isChecked, searchPhrase, seasons]);

    const typesComponent = useMemo(() => <Types types={types} isChecked={isChecked} handleTypesChange={handleTypesChange}/>, [handleTypesChange, isChecked, types]);

    const linkComponent = useMemo(() => <Link link={link} handleInfChange={handleInfChange}/>, [link]);

    const infoComponent = useMemo(() => <Info scenario={scenario} productionDate={productionDate} kind={kind} episodesAmount={episodesAmount} episodeDuration={episodeDuration} hours={hours} minutes={minutes} handleInfChange={handleInfChange}/>, [episodeDuration, episodesAmount, hours, kind, minutes, productionDate, scenario]);

    const titleComponent = useMemo(() => <Title title={title} handleChangeTitle={handleChangeTitle}/>, [title]);

    const graphicsComponent = useMemo(() => <Graphics mini={mini} miniPreview={miniPreview} background={background} backgroundPreview={backgroundPreview} baner={baner} banerPreview={banerPreview} handleChangeMini={handleChangeMini} handleChangeBackground={handleChangeBackground} handleChangeBaner={handleChangeBaner}/>, [background, backgroundPreview, baner, banerPreview, handleChangeBackground, handleChangeBaner, handleChangeMini, mini, miniPreview]);

    const soundtrackComponent = useMemo(() => <Soundtrack soundtrack={soundtrack} soundtrackPreview={soundtrackPreview} soundtrackTitle={soundtrackTitle} composer={composer} handleInfChange={handleInfChange} handleChangeSoundtrack={handleChangeSoundtrack} handleRemoveSoundtrack={handleRemoveSoundtrack}/>, [composer, handleChangeSoundtrack, soundtrack, soundtrackPreview, soundtrackTitle]);

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [goUp, main, match]);

    useEffect(() => {
        getAnime();
        getTypes();
    }, []);

    useEffect(() => {
        setPreviews();
    }, [anime]);

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [title, kind, scenario, productionDate, episodesAmount, episodeDuration, hours, minutes, link, animeTypes, seasons, mini, background, baner, soundtrack, composer, soundtrackTitle, checkValidation]);

    return ( 
        <div className="create main__content" ref={componentRef}>
            {authorization === '2' || authorization === '3' ?
            <>
                <h1 className="create__createAnime">Tworzenie Nowego Anime</h1>
                <div className="create__wrapper">
                    {kindComponent}
                    {titleComponent}
                    {infoComponent}
                    {linkComponent}
                    {typesComponent}
                    {seasonsComponent}
                    {graphicsComponent}
                    {soundtrackComponent}
                </div>
                <div className="create__send">
                    <Button className={`button create__add ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleAddNewAnime}>Dodaj Nowe Anime</Button>
                    <ul className="changes__validation-list">
                        {validationList()}
                    </ul>
                </div>
            </> : <Loading />}
        </div>
     );
}
 
export default withRouter(AnimeCreate);