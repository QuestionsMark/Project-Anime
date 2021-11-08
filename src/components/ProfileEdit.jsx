import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from '../contexts/UserProvider';

import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

import img from '../media/img/hos-back20502.webp';

import { HOST_ADDRESS } from '../config';

const ProfileEdit = ({types}) => {

    const [,,,, user, setUser] = useUser();

    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [favoriteAnime, setFavoriteAnime] = useState('');
    const [favoriteType, setFavoriteType] = useState('');
    const defaultBackgrounds = ["6188093e3502a02b5cd4ab9f", "618809443502a02b5cd4aba0", "618809483502a02b5cd4aba1", "618809903502a02b5cd4aba2", "618809953502a02b5cd4aba3",];
    const [customBackgrounds, setCustomBackgrounds] = useState([]);
    const [background, setBackground] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    
    const [choosedBackground, setChoosedBackground] = useState(null);
    const [choosedAvatar, setChoosedAvatar] = useState(null);
    const [backgroundPreview, setBackgroundPreview] = useState(img);

    const handleDescriptionTextChange = (e) => {
        setDescription(e.target.value);
    };
    const handleDescriptionTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleNickChange = (e) => {
        setUsername(e.target.value);
    };
    const handleFavoriteAnimeChange = (e) => {
        setFavoriteAnime(e.target.value);
    };
    const handleFavoriteTypeChange = (e) => {
        setFavoriteType(e.target.value);
    };
    const handleChooseAvatar = (e) => {
        if (e.target.files.length > 0) {
            const url = URL.createObjectURL(e.target.files[0]);
            setAvatarPreview(url);
            setChoosedAvatar(e.target.files[0]);
        }
    };
    const handleChooseBackground = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setBackgroundPreview(url);
        setChoosedBackground(e.target.files[0]);
    };

    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
        }
    };

    const handleBGChange = async (e) => {
        const background = e.target.getAttribute('data-id');
        await fetch(`${HOST_ADDRESS}/profile/change/background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                background
            }),
        });
        getUser();
    };
    const handleSaveAvatar = async () => {
        const data = new FormData();
        data.append('myImg', choosedAvatar);
        setAvatarPreview(null);
        setChoosedAvatar(null);
        const response = await fetch(`${HOST_ADDRESS}/images`, {
            headers: {
                'user': user.id
            },
            method: 'POST',
            body: data
        });
        const newAvatar = await response.json();
        const response2 = await fetch(`${HOST_ADDRESS}/profile/change/avatar`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                img: newAvatar
            }),
        });
        if (response2.ok) {
            console.log('Avatar został zmieniony!');
        }
        getUser();
    };
    const handleSaveUsername = async () => {
        const response = await fetch(`${HOST_ADDRESS}/profile/change/username`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                username
            }),
        });
        if (response.ok) {
            console.log('Nick został zmieniony');
        }
        getUser();
    };
    const handleSaveDescription = async () => {
        const response = await fetch(`${HOST_ADDRESS}/profile/change/introduction`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                title,
                description,
            }),
        });
        if (response.ok) {
            console.log('Opis został zmieniony!');
        }
        getUser();
    };
    const handleSaveFavoriteAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/profile/change/favorite-anime`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                animeId: favoriteAnime
            }),
        });
        if (response.ok) {
            console.log('Ulubione anime zostało zmienione!');
        }
        getUser();
    };
    const handleSaveFavoriteType = async () => {
        const response = await fetch(`${HOST_ADDRESS}/profile/change/favorite-type`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                favoriteType,
            }),
        });
        if (response.ok) {
            console.log('Ulubiony gatunek został zmieniony!');
        }
        getUser();
    };
    const handleSaveBackground = async () => {
        const data = new FormData();
        data.append('myImg', choosedBackground);
        setChoosedBackground(null);
        setBackgroundPreview(img);
        const response = await fetch(`${HOST_ADDRESS}/images`, {
            headers: {
                'user': user.id
            },
            method: 'POST',
            body: data,
        });
        const background = await response.json();
        const response2 = await fetch(`${HOST_ADDRESS}/profile/change/add-background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                background,
            }),
        });
        if (response2.ok) {
            console.log('Dodano nowe tło!');
        }
        getUser();
    };

    const formAnimeList = () => {
        const animeToCHoose = [...user.userAnimeData.watched]
            .filter(a => a.id !== user.favoriteAnime.id);
        animeToCHoose.push(user.favoriteAnime);
        return animeToCHoose.sort(function( a, b ) {
                if ( a.title.toLowerCase() < b.title.toLowerCase() ) return -1;
                if ( a.title.toLowerCase() > b.title.toLowerCase() ) return 1;
                return 0;
            })
            .map(anime => <MenuItem key={anime.id} value={anime.id}>{anime.title}</MenuItem>);
    };
    const formTypeList = () => {
        return [...types]
            .sort((a, b) => {
                if ( a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
                if ( a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
                return 0;
            })
            .map(t => <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>);
    };

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
    };
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
    };

    const defaultBackgroundList = () => {
        return defaultBackgrounds.map(b => {
            if (b === background) {
                return <img key={b} className="profileEdit__backgroundImg chosedBG" data-id={b} src={`${HOST_ADDRESS}/images/${b}`} alt="asd" onClick={handleBGChange}/>;
            } else {
                return <img key={b} className="profileEdit__backgroundImg" data-id={b} src={`${HOST_ADDRESS}/images/${b}`} alt="asd" onClick={handleBGChange}/>;
            } 
        });
    };

    const customBackgroundList = () => {
        return customBackgrounds.map(b => {
            if (b.id === background) {
                return <img key={b.id} className="profileEdit__backgroundImg chosedBG" data-id={b.id} src={`${HOST_ADDRESS}/images/${b.id}`} alt="asd" onClick={handleBGChange}/>;
            }  else {
                return <img key={b.id} className="profileEdit__backgroundImg" data-id={b.id} src={`${HOST_ADDRESS}/images/${b.id}`} alt="asd" onClick={handleBGChange}/>;
            }
        });
    };

    const setEdit = () => {
        const {username, introduction, favoriteAnime, favoriteType, customBackgrounds, background, avatar} = user;
        setUsername(username);
        setTitle(introduction.title);
        setDescription(introduction.description);
        setFavoriteAnime(favoriteAnime.id);
        setFavoriteType(favoriteType);
        setCustomBackgrounds(customBackgrounds);
        setBackground(background);
        setAvatarPreview(`${HOST_ADDRESS}/images/${avatar}`);
    };

    useEffect(() => {
        if (JSON.stringify(user) !== "{}"){
            setEdit();
        }
    }, [user]);

    return ( 
        <div className="profileEdit profile__content">
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Avatar</h2>
                <form className="profileEdit__addFileForm">
                    <label htmlFor="avatar-upload" className="profileEdit__addFileLabel">Wybierz nowy avatar</label>
                    <input type="file" id="avatar-upload" className="profileEdit__addFile" onChange={handleChooseAvatar}/>
                    <p className="profileEdit__addFileInfo">
                        <span className="profileEdit__AFIName">{choosedAvatar ? choosedAvatar.name : null}</span>
                        <span className="profileEdit__AFISize" style={{color: `${fileColor('avatar')}`}}>{choosedAvatar ? `${(choosedAvatar.size / 1024 /1024).toFixed(2)} MB` : null}</span>
                        <span className="profileEdit__AFIMessage" style={{color: `${fileColor('avatar')}`}}>{choosedAvatar ? `${fileMessage('avatar')}` : null}</span>
                    </p>
                </form>
                <div className="profileEdit__preview profileEdit__preview--square">
                    {avatarPreview ? <img src={avatarPreview} alt="dasdas" className="profileEdit__previewImg" /> : null}
                </div>
                <Button className="button profileEdit__save avatarButton" disabled={avatarPreview !== `${HOST_ADDRESS}/images/${user.avatar}` ? false : true} onClick={handleSaveAvatar}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Swój Nick</h2>
                <input type="text" className="profileEdit__username" placeholder="Nick" value={username} onChange={handleNickChange}/>
                <Button className="button profileEdit__save" disabled={username !== user.username ? false : true} onClick={handleSaveUsername}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Opis</h2>
                <div className="profileEdit__description">
                    <input type="text" className="profileEdit__descriptionTitle" placeholder="Tytuł" value={title} onChange={handleDescriptionTitleChange}/>
                    <textarea className="profileEdit__descriptionText" placeholder="Napisz coś o sobie..." value={description} onChange={handleDescriptionTextChange}/>
                </div>
                <Button className="button profileEdit__save" disabled={JSON.stringify(user) !== "{}" && (description !== user.introduction.description || title !== user.introduction.title) ? false : true} onClick={handleSaveDescription}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Ulubione Anime</h2>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Ulubione anime</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={JSON.stringify(user) !== "{}" ? favoriteAnime : ''} onChange={handleFavoriteAnimeChange}>
                        {JSON.stringify(user) !== "{}" ? formAnimeList() : null}
                    </Select>
                </FormControl>
                <Button className="button profileEdit__save" disabled={JSON.stringify(user) !== "{}" && favoriteAnime !== user.favoriteAnime.id ? false : true} onClick={handleSaveFavoriteAnime}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Ulubiony Gatunek</h2>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Ulubiony gatunek</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={JSON.stringify(user) !== "{}" ? user.favoriteType : 'Brak'} onChange={handleFavoriteTypeChange}>
                    <MenuItem value="Brak">
                        <em>Brak</em>
                    </MenuItem>
                        {formTypeList()}
                    </Select>
                </FormControl>
                <Button className="button profileEdit__save" disabled={JSON.stringify(user) !== "{}" && favoriteType !== user.favoriteType ? false : true} onClick={handleSaveFavoriteType}>Zapisz</Button>
            </div>
            <div className="profileEdit__section">
                <h2 className="profileEdit__title mediumTitle">Zmień Tło Profilu</h2>
                <div className="profileEdit__changeBackground">
                    <h3 className="profileEdit__backgroundsTitle">Tła standardowe:</h3>
                    <div className="profileEdit__defaultBackgrounds" data-type="default">
                        {defaultBackgroundList()}
                    </div>
                    <h3 className="profileEdit__backgroundsTitle">Tła Własne (max 3):</h3>
                    <div className="profileEdit__customBackgrounds" data-type="custom">
                        {customBackgroundList()}
                    </div>
                    {JSON.stringify(user) !== "{}" && user.customBackgrounds.length < 3 ? <div className="profileEdit__addCustomBackground">
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
                        <Button className="button profileEdit__save backgroundButton" disabled={backgroundPreview !== img ? false : true} onClick={handleSaveBackground}>Dodaj</Button>
                    </div> : null}
                </div>
                
            </div>
        </div>
     );
}
 
export default withRouter(ProfileEdit);