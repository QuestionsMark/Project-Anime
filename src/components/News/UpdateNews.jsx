import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';

import SingleGraphic from './SingleGraphic';
import SingleImagePreview from '../SingleImagePreview';

import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';


const UpdateNews = ({close, getNews, id}) => {

    const { user } = useUser();
    const { setOpen, setResponse } = useResponsePopup();

    const [newsData, setNewsData] = useState({});
    const getNewsData = useCallback(async () => {
        const resposne = await fetch(`${HOST_ADDRESS}/news/${id}`);
        if (resposne.ok) {
            const newsData = await resposne.json();
            setNewsData(newsData);
        }
    }, [id]);

    const [graphics, setGraphics] = useState([]);
    const getGraphics = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/mini`);
        if (response.ok) {
            const graphics = await response.json();
            setGraphics(graphics);
        }
    };

    const [searchPhrase, setSearchPhrase] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleChangeTextData = (e, type) => {
        switch (type) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'search':
                setSearchPhrase(e.target.value);
                break;
        
            default:
                break;
        }
    };

    const [videos, setVideos] = useState(['', '', '']);
    const handleChangeVideos = (e, number) => {
        setVideos(prev => {
            return prev.map((s, i) => {
                if (i === number) return `${e.target.value}`;
                return s;
            });
        })
    };

    const [otherLinks, setOtherLinks] = useState([
        {
            link: '',
            note: '',
        },
        {
            link: '',
            note: '',
        },
        {
            link: '',
            note: '',
        },
    ]);
    const handleChangeOtherLinks = (e, number, type) => {
        setOtherLinks(prev => {
            return prev.map((s, i) => {
                if (i === number) {
                    if (type === 'link') return { link: `${e.target.value}`, note: s.note };
                    if (type === 'note') return { link: s.link, note: `${e.target.value}` };
                };
                return s;
            });
        })
    };

    const [choosedGraphics, setChoosedGraphics] = useState([]);
    const [images, setImages] = useState(null);
    const [preview, setPreview] = useState([]);
    const handleChangeImages = e => {
        const files = [...e.target.files];
        if (files.length > 0) {
            const data = new FormData();
            files.forEach(f => data.append('myImg', f));
            setImages(data);
            const previewList = files.map(f => {
                const url = URL.createObjectURL(f);
                const size = f.size / 1024 / 1024;
                const type = f.type;
                return { url, size, type };
            });
            setPreview(previewList);
        } else {
            setImages(null);
            setPreview([]);
        }
    };

    const [validationErrors, setValidationErrors] = useState([
        'Tytu?? powinien zawiera?? od 1 do 150 znak??w.',
        'Opis wst??pny powinien zawiera?? od 50 do 1000 znak??w.',
        'Wybierz grafik?? lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.',
    ]);
    const checkValidation = useCallback(() => {
        const errors = [];

        let test = true;
        for (const { type } of preview) {
            if (!(/jpg|jpeg|png|webp|gif/.test(type))) {
                test = false;
            }
        }

        if (title.length < 1 || title.length > 150) {
            errors.push('Tytu?? powinien zawiera?? od 1 do 150 znak??w.');
        }

        if (!(images || choosedGraphics.length > 0) || (images && !test)) {
            errors.push('Wybierz grafik?? lub grafiki w podanych formatach jpg, jpeg, png, webp, gif.');
        }

        if (choosedGraphics.length + preview.length > 5) {
            errors.push('Wybierz maksymalnie 5 grafik wliczaj??c proponowane grafiki.');
        }

        if (description.length < 50 || description.length > 10000) {
            errors.push('Opis powinien zawiera?? od 50 do 10000 znak??w.');
        }

        const tooBigFiles = preview.filter(p => p.size > 1.048576);
        if (tooBigFiles.length > 0) {
            errors.push(`${tooBigFiles.length > 1 ? `Grafiki za du??o wa????! (${tooBigFiles.length})` : 'Grafika za du??o wa??y'}`);
        }

        return errors;
    }, [choosedGraphics, description, images, preview, title]);
    
    const validationList = () => {
        return validationErrors.map((e, i) => <li key={i} className="changes__validation-item"><p className="changes__error">{e}</p></li>);
    };

    const previewList = () => {
        return preview.map((p, i) => <SingleImagePreview key={i} image={p} />);
    };

    const graphicsToChoose = () => {
        return graphics
            .filter(g => g.from.toLowerCase().includes(searchPhrase.toLowerCase()))
            .map(g => <SingleGraphic key={g.id} graphic={g} choosedGraphics={choosedGraphics} setChoosedGraphics={setChoosedGraphics}/>);
    };

    const showWord = () => {
        switch (choosedGraphics.length) {
            case 0:
                return 'Grafik';
            case 1:
                return 'Grafik??';
            case 5:
                return 'Grafik';
            default:
                return 'Grafiki';
        }
    };

    const handleSave = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            const customImagesObjects = [];

            let imagesResponse;
            if (images) {
                imagesResponse = await fetch(`${HOST_ADDRESS}/images`, {
                    method: 'POST',
                    headers: {
                        'user': user.id,
                    },
                    body: images,
                });
                if (imagesResponse.ok) {
                    const customImages = await imagesResponse.json();
                    for (const { id } of customImages) {
                        customImagesObjects.push({ id });
                    }
                }
            }
            if (imagesResponse?.ok || !imagesResponse) {
                const response2 = await fetch(`${HOST_ADDRESS}/news/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: user.id,
                        title: title.toUpperCase(),
                        description,
                        videos,
                        otherLinks,
                        images: customImagesObjects,
                        choosedGraphics,
                    }),
                });
                if (response2.ok) {
                    setResponse({status: response2.ok, message: 'Dodano nowy post.'});
                } else {
                    const error = await response2.json();
                    setResponse({status: response2.ok, message: error.message});
                }
            } else {
                const error = await imagesResponse.json();
                console.log(error);
                setResponse({status: imagesResponse.ok, message: error.message});
            }
            getNews();
            setOpen(true);
            close();
        }
    };

    useEffect(() => {
        getNewsData();
        getGraphics();
    }, [getNewsData]);

    useEffect(() => {
        if (JSON.stringify(newsData) !== "{}") {
            const { title, description, videos, otherLinks, images } = newsData;
            setTitle(title);
            setDescription(description);
            const videosState = [];
            for (const { src } of videos) {
                videosState.push(src);
            }
            if (videosState.length < 3) {
                for (let i = videosState.length; i < 3; i++) {
                    videosState.push('');
                }
            }
            setVideos(videosState);
            const otherLinksState = [];
            for (const { link, note } of otherLinks) {
                otherLinksState.push({
                    link,
                    note,
                })
            }
            if (otherLinksState.length < 3) {
                for (let i = otherLinksState.length; i < 3; i++) {
                    otherLinksState.push({link: '', note: ''});
                }
            }
            setOtherLinks(otherLinksState);
            const graphicsState = [];
            for (const { id } of images) {
                graphicsState.push(id);
            }
            setChoosedGraphics(graphicsState);
        }
    }, [newsData, graphics]);

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [title, description, choosedGraphics, images, checkValidation]);

    return ( 
        <div className="news__popup-add">
            <CloseRounded  className="changes__close-icon" onClick={close}/>
            <h2 className="news__popup-add-title">Dodaj nowy post</h2>
            <div className="news__popup-add-section">
                <h3 className="news__popup-add-subtitle">Tytu??</h3>
                <input type="text" className="inputText" placeholder="Tytu??" value={title} onChange={(e) => handleChangeTextData(e, 'title')}/>
            </div>
            <div className="news__popup-add-section">
                <h3 className="news__popup-add-subtitle">Opis</h3>
                <textarea className="textarea news__inp-description" placeholder="Opis..." value={description} onChange={(e) => handleChangeTextData(e, 'description')}/>
                <p className="news__popup-add-validation-text">Opis g????wny powinien zawiera?? do 10000 znak??w. ( <span style={{color: description.length < 50 || description.length > 10000 ? '#d14141' : '#5ec45e'}}>{description.length}</span> )</p>
            </div>
            <div className="news__popup-add-section">
                <h3 className="news__popup-add-subtitle">Filmy*</h3>
                <div className="news__popup-add-flex">
                    <input type="text" className="inputText" placeholder="Link !SHARE! YouTube" value={videos[0]} onChange={(e) => handleChangeVideos(e, 0)}/>
                    <input type="text" className="inputText" placeholder="Link !SHARE! YouTube" value={videos[1]} onChange={(e) => handleChangeVideos(e, 1)}/>
                    <input type="text" className="inputText" placeholder="Link !SHARE! YouTube" value={videos[2]} onChange={(e) => handleChangeVideos(e, 2)}/>
                </div>
                <div className="news__popup-add-instruction">
                    Aby doda?? link do filmu YouTube pod??rzaj tymi krokami:
                    <p className="news__popup-add-instruction-step">- Znajd?? film youTube</p>
                    <p className="news__popup-add-instruction-step">- Kliknij UDOST??PNIJ pod filmem</p>
                    <p className="news__popup-add-instruction-step">- Wybierz pierwsz?? opcj?? czyli "Umie????"</p>
                    <p className="news__popup-add-instruction-step">- Po prawej stronie znajd??: src="..."</p>
                    <p className="news__popup-add-instruction-step">- Tw??j link znajduje si?? w cudzys??owie atrybutu src</p>
                    <p className="news__popup-add-instruction-step">- Tak, wiem, skopiowanie tego linku to GIGA skurwysy??stwo, ale co poradzi??...</p>
                </div>
            </div>
            <div className="news__popup-add-other-section">
                <h3 className="news__popup-add-subtitle">Linki pomocnicze*</h3>
                <div className="news__popup-add-other-link">
                    <input type="text" className="inputText" placeholder="Link do zasobu" value={otherLinks[0].link} onChange={(e) => handleChangeOtherLinks(e, 0, 'link')}/>
                    <input type="text" className="inputText" placeholder="Notatka dotycz??ca linku" value={otherLinks[0].note} onChange={(e) => handleChangeOtherLinks(e, 0, 'note')}/>
                </div>
                <div className="news__popup-add-other-link">
                    <input type="text" className="inputText" placeholder="Link do zasobu" value={otherLinks[1].link} onChange={(e) => handleChangeOtherLinks(e, 1, 'link')}/>
                    <input type="text" className="inputText" placeholder="Notatka dotycz??ca linku" value={otherLinks[1].note} onChange={(e) => handleChangeOtherLinks(e, 1, 'note')}/>
                </div>
                <div className="news__popup-add-other-link">
                    <input type="text" className="inputText" placeholder="Link do zasobu" value={otherLinks[2].link} onChange={(e) => handleChangeOtherLinks(e, 2, 'link')}/>
                    <input type="text" className="inputText" placeholder="Notatka dotycz??ca linku" value={otherLinks[2].note} onChange={(e) => handleChangeOtherLinks(e, 2, 'note')}/>
                </div>
            </div>
            <div className="news__popup-add-other-section">
                <h3 className="news__popup-add-subtitle">Grafiki (max 5) (Obecnie post zawiera {choosedGraphics.length} {showWord()})</h3>
                <input type="text" className="inputText" placeholder="Szukaj anime" value={searchPhrase} onChange={(e) => handleChangeTextData(e, 'search')}/>
                <ul className="news__popup-add-graphics">
                    {graphicsToChoose()}
                </ul>
                <form className="news__popup-add-section">
                    <input type="file" id="image" className="create__imageInp" multiple onChange={handleChangeImages}/>
                    <label htmlFor="image" className="create__imageLabel">Wybierz w??asne grafiki</label>
                </form>
            </div>
            {preview ? <div className="news__popup-add-section">
                <ul className="changes__preview-list">
                    {previewList()}
                </ul>
            </div> : null}
            <Button className={`button news__add-button ${validationErrors.length !== 0 ? 'Mui-disabled' : ''}`} onClick={handleSave}>Zmodyfikuj</Button>
            <ul className="changes__validation-list">
                {validationList()}
            </ul>
        </div>
     );
}
 
export default UpdateNews;