import React, { useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

import img from '../media/img/hos-back20502.jpg';
import img2 from '../media/img/kiminonawa-back20502.jpg';
import img3 from '../media/img/pla3-back20502.png';
import img4 from '../media/img/sao1-back20502.jpg';
import img5 from '../media/img/shi-back20502.jpg';

const ProfileEdit = ({favAnime, watchedAnimeList, background}) => {

    const [descriptionTitle, setDescriptionTitle] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [favoriteAnime, setFavoriteAnime] = useState(favAnime.title);
    const [defaultBackgrounds, setDefaultBackgrounds] = useState([img, img2, img3, img4, img5]);
    const [customBackgrounds, setCustomBackgrounds] = useState([img, img2, img3, img4, img5]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(img);

    const handleDescriptionTextChange = (e) => {
        setDescriptionText(e.target.value);
    }

    const handleDescriptionTitleChange = (e) => {
        setDescriptionTitle(e.target.value);
    }

    const handleFavoriteAnimeChange = (e) => {
        setFavoriteAnime(e.target.value);
    }

    const handleBGChange = (e) => {
        const dataType = e.target.parentElement.getAttribute('data-type');
        let backgrounds;
        if (dataType === "1") {
            backgrounds = [...e.target.parentElement.children, ...e.target.parentElement.nextSibling.nextSibling.children];
        } else {
            backgrounds = [...e.target.parentElement.children, ...e.target.parentElement.previousSibling.previousSibling.children];
        }
        backgrounds.forEach(b => b.classList.remove('chosedBG'));
        e.target.classList.add('chosedBG');
        console.log(e.target.src);
    }

    const handleChooseFile = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
        setFile(e.target.files[0]);
    }

    const handleSave = (type) => {
        if (type === "description") {
            console.log(descriptionTitle);
            console.log(descriptionText);
        } else if (type === "favAnime") {
            console.log(favoriteAnime);
        } else if (type === "background") {
            console.log(file);
        } 
    }

    const formAnimeList = () => {
        const formAnimeList = [...watchedAnimeList].sort(function( a, b ) {
            if ( a.title.toLowerCase() < b.title.toLowerCase() ){
              return -1;
            }
            if ( a.title.toLowerCase() > b.title.toLowerCase() ){
              return 1;
            }
            return 0;
        });
        const list = formAnimeList.map(anime => <MenuItem key={anime.title} value={anime.title}>{anime.title}</MenuItem>);
        return list;
    }

    const fileColor = () => {
        if (file) {
            let color;
            if (file.size <= 1048576) {
                color = "green";
            } else {
                color = "red";
            }
            return color;
        }
    }

    const fileMessage = () => {
        if (file) {
            let message;
            if (file.size <= 1048576) {
                message = "OK";
            } else {
                message = "Za duży rozmiar pliku!";
            }
            return message;
        }
    }

    const defaultBackgroundList = defaultBackgrounds.map(b => {
        if (b === background) {
            return <img className="profileEdit__backgroundImg active" src={b} alt="asd" onClick={handleBGChange}/>;
        } else {
            return <img className="profileEdit__backgroundImg" src={b} alt="asd" onClick={handleBGChange}/>;
        } 
    });

    const customBackgroundList = customBackgrounds.map(b => {
        if (b === background) {
            return <img className="profileEdit__backgroundImg active" src={b} alt="asd" onClick={handleBGChange}/>;
        }  else {
            return <img className="profileEdit__backgroundImg" src={b} alt="asd" onClick={handleBGChange}/>;
        }
    });

    return ( 
        <div className="profileEdit profile__content">
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Opis</h2>
                <div className="profileEdit__description">
                    <input type="text" className="profileEdit__descriptionTitle" placeholder="Tytuł" vlaue={descriptionTitle} onChange={handleDescriptionTitleChange}/>
                    <textarea className="profileEdit__descriptionText" placeholder="Napisz coś o sobie..." value={descriptionText} onChange={handleDescriptionTextChange}/>
                </div>
                <Button className="button profileEdit__save" onClick={() => {handleSave('description')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Ulubione Anime</h2>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Ulubione anime</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={favoriteAnime} onChange={handleFavoriteAnimeChange}>
                        {formAnimeList()}
                    </Select>
                </FormControl>
                <Button className="button profileEdit__save" onClick={() => {handleSave('favAnime')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Tło Profilu</h2>
                <div className="profileEdit__changeBackground">
                    <h3 className="profileEdit__backgroundsTitle">Tła standardowe:</h3>
                    <div className="profileEdit__defaultBackgrounds" data-type="1">
                        {defaultBackgroundList}
                    </div>
                    <h3 className="profileEdit__backgroundsTitle">Tła Własne:</h3>
                    <div className="profileEdit__customBackgrounds" data-type="2">
                        {customBackgroundList}
                    </div>
                </div>
                <div className="profileEdit__addCustomBackground">
                    <h3 className="profileEdit__backgroundsTitle">Dodaj Własne Tło</h3>
                    <form className="profileEdit__addFileForm">
                        <label htmlFor="file-upload" className="profileEdit__addFileLabel">Wybierz swoje tło</label>
                        <input type="file" id="file-upload" className="profileEdit__addFile" onChange={handleChooseFile}/>
                        <p className="profileEdit__addFileInfo">
                            <span className="profileEdit__AFIName">{file ? file.name : null}</span>
                            <span className="profileEdit__AFISize" style={{color: `${fileColor()}`}}>{file ? `${(file.size / 1024 /1024).toFixed(2)} MB` : null}</span>
                            <span className="profileEdit__AFIMessage" style={{color: `${fileColor()}`}}>{file ? `${fileMessage()}` : null}</span>
                        </p>
                    </form>
                    <div className="profileEdit__preview">
                        <img src={preview} alt="dasdas" className="profileEdit__previewImg" />
                    </div>
                    <Button className="button profileEdit__save" onClick={() => {handleSave('background')}}>Dodaj</Button>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileEdit;