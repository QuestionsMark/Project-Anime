import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

import img from '../media/img/hos-back20502.jpg';

const ProfileEdit = ({types, avatar, username, favAnime, favType, watchedAnimeList, actualBackground, introduction, customBackgroundsList, callAPI, history}) => {

    const [userChoosed, setUserChoosed] = useState(false);
    const [typesList, setTypesList] = useState(types);
    const [nick, setNick] = useState(username);
    const [descriptionTitle, setDescriptionTitle] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [favoriteAnime, setFavoriteAnime] = useState(favAnime.title);
    const [favoriteType, setFavoriteType] = useState(favType);
    const defaultBackgrounds = ["myImg-1623824273692.png", "myImg-1623824284002.jpg", "myImg-1623824323392.jpg", "myImg-1623824334616.jpg", "myImg-1623824344703.jpg",];
    const [customBackgrounds, setCustomBackgrounds] = useState(customBackgroundsList);
    const [background, setBackground] = useState(actualBackground);
    const [choosedBackground, setChoosedBackground] = useState(null);
    const [choosedAvatar, setChoosedAvatar] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(img);
    const [avatarPreview, setAvatarPreview] = useState(avatar);

    const handleDescriptionTextChange = (e) => {
        setDescriptionText(e.target.value);
    }

    const handleDescriptionTitleChange = (e) => {
        setDescriptionTitle(e.target.value);
    }

    const handleNickChange = (e) => {
        setNick(e.target.value);
    } 

    const handleFavoriteAnimeChange = (e) => {
        setFavoriteAnime(e.target.value);
    }

    const handleFavoriteTypeChange = (e) => {
        setFavoriteType(e.target.value);
    }

    const handleBGChange = (e) => {
        const img = e.target.getAttribute('data-img');
        fetch(`http://localhost:9000/profile/change/background`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                img
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            callAPI();
        })
    }

    const handleChooseAvatar = (e) => {
        if (e.target.files.length > 0) {
            setUserChoosed(true);
            const url = URL.createObjectURL(e.target.files[0]);
            setAvatarPreview(url);
            setChoosedAvatar(e.target.files[0]);
        }
    }

    const handleChooseBackground = (e) => {
        let target = e.target;
        if (target.localName === 'span') {
            target = target.parentElement;
        }
        const url = URL.createObjectURL(e.target.files[0]);
        setBackgroundPreview(url);
        setChoosedBackground(e.target.files[0]);
    }

    const handleSave = (type) => {
        if (type === "description") {
            fetch('http://localhost:9000/profile/change/introduction', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    UID: localStorage.getItem('UID'),
                    title: descriptionTitle,
                    description: descriptionText
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.response);
                    callAPI();
                })
        } else if (type === "favAnime") {
            fetch('http://localhost:9000/profile/change/favorite-anime', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    anime: favoriteAnime
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.response);
                    callAPI();
                })
        } else if (type === "background") {
            const data = new FormData();
            data.append('myImg',choosedBackground);
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
                    fetch('http://localhost:9000/profile/change/add-background', {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token')
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            user: localStorage.getItem('UID'),
                            img: res
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res.response);
                            callAPI();
                        })
                })
        }  else if (type === "avatar") {
            const data = new FormData();
            data.append('myImg', choosedAvatar);
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
                    fetch('http://localhost:9000/profile/change/avatar', {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token')
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            user: localStorage.getItem('UID'),
                            img: res
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res.response);
                            setUserChoosed(false);
                            callAPI();
                        })
                })
        }  else if (type === "username") {
            fetch('http://localhost:9000/profile/change/username', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    username: nick
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    localStorage.setItem('l', res.link)
                    history.push(`/profile/${res.link}/settings`)
                })
        }  else if (type === "favType") {
            fetch('http://localhost:9000/profile/change/favorite-type', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    user: localStorage.getItem('UID'),
                    favType: favoriteType
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.response);
                    callAPI();
                })
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

    const formTypeList = () => {
        const formTypesList = [...typesList].sort((a, b) => {
            if ( a.name.toLowerCase() < b.name.toLowerCase() ){
              return -1;
            }
            if ( a.name.toLowerCase() > b.name.toLowerCase() ){
              return 1;
            }
            return 0;
        });
        const list = formTypesList.map(t => <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>);
        return list;
    }

    const fileColor = (type) => {
        if (type === 'avatar') {
            if (choosedAvatar) {
                let color;
                if (choosedAvatar.size <= 1048576) {
                    color = "green";
                } else {
                    color = "red";
                }
                return color;
            }
        } else if (type === 'background') {
            if (choosedBackground) {
                let color;
                if (choosedBackground.size <= 1048576) {
                    color = "green";
                } else {
                    color = "red";
                }
                return color;
            }
        }
    }

    const fileMessage = (type) => {
        if (type === 'avatar') {
            if (choosedAvatar) {
                let message;
                if (choosedAvatar.size <= 1048576) {
                    message = "OK";
                } else {
                    message = "Za duży rozmiar pliku!";
                }
                return message;
            }
        } else if (type === 'background') {
            if (choosedBackground) {
                let message;
                if (choosedBackground.size <= 1048576) {
                    message = "OK";
                } else {
                    message = "Za duży rozmiar pliku!";
                }
                return message;
            }
        }
    }

    const defaultBackgroundList = defaultBackgrounds.map(b => {
        if (b === background) {
            return <img key={b} className="profileEdit__backgroundImg chosedBG" data-img={b} src={`http://localhost:9000/images/${b}`} alt="asd" onClick={handleBGChange}/>;
        } else {
            return <img key={b} className="profileEdit__backgroundImg" data-img={b} src={`http://localhost:9000/images/${b}`} alt="asd" onClick={handleBGChange}/>;
        } 
    });

    const customBackgroundList = customBackgrounds.map(b => {
        if (b.img === background) {
            return <img key={b.id} className="profileEdit__backgroundImg chosedBG" data-img={b.img} src={`http://localhost:9000/images/${b.img}`} alt="asd" onClick={handleBGChange}/>;
        }  else {
            return <img key={b.id} className="profileEdit__backgroundImg" data-img={b.img} src={`http://localhost:9000/images/${b.img}`} alt="asd" onClick={handleBGChange}/>;
        }
    });

    useEffect(() => {
        setTypesList(types);
    },[types])

    useEffect(() => {
        setCustomBackgrounds(customBackgroundsList);
    },[customBackgroundsList])

    useEffect(() => {
        setBackground(actualBackground);
    },[actualBackground])

    useEffect(() => {
        setDescriptionText(introduction.description);
        setDescriptionTitle(introduction.title);
    },[introduction])

    useEffect(() => {
        setFavoriteAnime(favAnime.title);
        setFavoriteType(favType);
        setAvatarPreview(avatar);
        setNick(username);
    },[favAnime, favType, avatar, username])

    return ( 
        <div className="profileEdit profile__content">
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Avatar</h2>
                <form className="profileEdit__addFileForm">
                    <label htmlFor="avatar-upload" className="profileEdit__addFileLabel">Wybierz swoje tło</label>
                    <input type="file" id="avatar-upload" className="profileEdit__addFile" onChange={handleChooseAvatar}/>
                    <p className="profileEdit__addFileInfo">
                        <span className="profileEdit__AFIName">{choosedAvatar ? choosedAvatar.name : null}</span>
                        <span className="profileEdit__AFISize" style={{color: `${fileColor('avatar')}`}}>{choosedAvatar ? `${(choosedAvatar.size / 1024 /1024).toFixed(2)} MB` : null}</span>
                        <span className="profileEdit__AFIMessage" style={{color: `${fileColor('avatar')}`}}>{choosedAvatar ? `${fileMessage('avatar')}` : null}</span>
                    </p>
                </form>
                <div className="profileEdit__preview profileEdit__preview--square">
                    {userChoosed ? <img src={avatarPreview} alt="dasdas" className="profileEdit__previewImg" /> : <img src={`http://localhost:9000/images/${avatarPreview}`} alt="dasdas" className="profileEdit__previewImg" />}
                </div>
                <Button className="button profileEdit__save avatarButton" disabled={avatarPreview !== avatar ? true : true} onClick={() => {handleSave('avatar')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Swój Nick</h2>
                <input type="text" className="profileEdit__username" placeholder="Nick" value={nick} onChange={handleNickChange}/>
                <Button className="button profileEdit__save" onClick={() => {handleSave('username')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Opis</h2>
                <div className="profileEdit__description">
                    <input type="text" className="profileEdit__descriptionTitle" placeholder="Tytuł" value={descriptionTitle} onChange={handleDescriptionTitleChange}/>
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
                <Button className="button profileEdit__save" disabled={favoriteAnime !== favAnime.title ? '' : true} onClick={() => {handleSave('favAnime')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Ulubiony Gatunek</h2>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Ulubiony gatunek</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={favoriteType} onChange={handleFavoriteTypeChange}>
                        {formTypeList()}
                    </Select>
                </FormControl>
                <Button className="button profileEdit__save" onClick={() => {handleSave('favType')}}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Tło Profilu</h2>
                <div className="profileEdit__changeBackground">
                    <h3 className="profileEdit__backgroundsTitle">Tła standardowe:</h3>
                    <div className="profileEdit__defaultBackgrounds" data-type="default">
                        {defaultBackgroundList}
                    </div>
                    <h3 className="profileEdit__backgroundsTitle">Tła Własne:</h3>
                    <div className="profileEdit__customBackgrounds" data-type="custom">
                        {customBackgroundList}
                    </div>
                    <div className="profileEdit__addCustomBackground">
                        <h3 className="profileEdit__backgroundsTitle">Dodaj Własne Tło</h3>
                        <form className="profileEdit__addFileForm">
                            <label htmlFor="background-upload" className="profileEdit__addFileLabel">Wybierz swoje tło</label>
                            <input type="file" id="background-upload" className="profileEdit__addFile" onChange={handleChooseBackground}/>
                            <p className="profileEdit__addFileInfo">
                                <span className="profileEdit__AFIName">{choosedBackground ? choosedBackground.name : null}</span>
                                <span className="profileEdit__AFISize" style={{color: `${fileColor('background')}`}}>{choosedBackground ? `${(choosedBackground.size / 1024 /1024).toFixed(2)} MB` : null}</span>
                                <span className="profileEdit__AFIMessage" style={{color: `${fileColor('background')}`}}>{choosedBackground ? `${fileMessage('background')}` : null}</span>
                            </p>
                        </form>
                        <div className="profileEdit__preview">
                            <img src={backgroundPreview} alt="dasdas" className="profileEdit__previewImg" />
                        </div>
                        <Button className="button profileEdit__save backgroundButton" disabled={backgroundPreview !== img ? true : true} onClick={() => {handleSave('background')}}>Dodaj</Button>
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default withRouter(ProfileEdit);