import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import Audio from '../Audio';
import UserRate from '../UserRate';
import Comments from '../Comments';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import backgroundImg from '../../media/img/pla3-back20502.png';
import img from '../../media/img/sak6-spec.jpg';
import img2 from '../../media/img/ten5-back20502.jpg';
import mp3 from '../../media/mp3/sak.mp3';
import SingleSeason from '../SingleSeason';

const Page = () => {

    const [isAuthorized, setIsAuthorized] = useState(true);
    const [animeData, setAnimeData] = useState({
        id: 1,
        title: "Shuumatsu Nani Shitemasu ka? Isogashii desu ka? Sukutte Moratte Ii desu ka?",
        watchLink: "https://anime-odcinki.pl/",
        seasons: [
            {
                title: "coś tam",
                background: backgroundImg,
                link: "/pages/cos"
            },
            {
                title: "coś tam",
                background: backgroundImg,
                link: "/pages/cos"
            },
            {
                title: "coś tam",
                background: backgroundImg,
                link: "/pages/cos"
            },
            {
                title: "coś tam",
                background: backgroundImg,
                link: "/pages/cos"
            },
            {
                title: "Jakiś dłuższy tytuł żeby sprawdzić czy wszystko dobrz działa i nie buguje sie",
                background: backgroundImg,
                link: "/pages/cos"
            },
            {
                title: "Jakiś dłuższy tytuł żeby sprawdzić czy wszystko dobrz działa i nie buguje sie",
                background: backgroundImg,
                link: "/pages/cos"
            },
            
        ],
        background: backgroundImg,
        miniImg: img,
        rate: 9.43,
        likes: 1451,
        scenario: "Yamanaka Ichizashi",
        productionDate: "2012r",
        duration: "25 odc. po 25min",
        soundtrack: {
            mp3: mp3,
            composer: "Kajura Yuuki",
            title: "Swordland"
        },
        images: [
            {
                id: 1,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 2,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 3,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 4,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 5,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 6,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 7,
                img: img2,
                fromAnime: "Violet Evergarden"
            },
            {
                id: 8,
                img: img2,
                fromAnime: "Violet Evergarden"
            }
        ],
        types: [
            {
                id: 1,
                name: "Dramat",
                link: "/types/dramat"
            },
            {
                id: 2,
                name: "Romans",
                link: "/types/romans"
            },
            {
                id: 3,
                name: "Okruchy Życia",
                link: "/types/okruchy-zycia"
            },
            {
                id: 4,
                name: "Komedia",
                link: "/types/komedia"
            },
            {
                id: 5,
                name: "Magia",
                link: "/types/magia"
            },
            {
                id: 6,
                name: "Science Fiction",
                link: "/types/science-fiction"
            },
            {
                id: 7,
                name: "Komedia",
                link: "/types/komedia"
            },
            {
                id: 8,
                name: "Nadprzyrodzone",
                link: "/types/nadprzyrodzone"
            },
            {
                id: 9,
                name: "Fantasy",
                link: "/types/fantasy"
            }
        ],
        description: {
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, vero in. Dicta quos omnis, reprehenderit unde, debitis at consectetur alias, dolore aspernatur in expedita rem suscipit id pariatur dolores odio beatae! Harum eligendi id illo sit a quidem consequuntur expedita voluptate non? Minima illo consectetur, adipisci corrupti saepe obcaecati in esse excepturi repudiandae possimus repellendus amet voluptatem velit quas quaerat quo earum id? Iste ut itaque aut. Atque adipisci laborum unde sequi. Fugit, ipsum. Quidem tenetur hic atque corporis, cum voluptates quibusdam suscipit quisquam, molestiae voluptas doloribus iusto fugiat officiis dicta illum dignissimos nemo. Possimus vel sunt aut! Harum, unde aliquid eos placeat iusto commodi ullam quia quos similique enim eaque tempora quidem et earum, facere assumenda error alias non quae repellat consectetur libero cum adipisci numquam? Minima maiores aperiam provident earum aliquid rem veniam. Inventore magni eum iusto sapiente vero quam aspernatur eveniet id saepe? Ab labore recusandae libero quam reprehenderit inventore quas eaque numquam sapiente perferendis, maiores consectetur delectus rerum officiis amet! Repudiandae reiciendis doloribus neque illum laudantium optio soluta excepturi aliquam nostrum! Consectetur ipsa laborum saepe animi explicabo veniam ullam doloribus, quam dolore ad cum impedit ex suscipit porro. Impedit unde illo dolor maiores minus aliquam numquam nulla nihil eligendi iusto quaerat, explicabo, delectus quia fugit quod excepturi et provident magnam ipsa ratione saepe! Molestias ullam facere repudiandae, veritatis nesciunt ipsa blanditiis adipisci ex soluta aliquid amet dicta quas dolores rem corporis esse asperiores. Assumenda ratione mollitia eaque impedit molestias error odio provident sequi non, est natus similique aut possimus dolor illum harum, placeat nesciunt ipsam quia neque iste eveniet? Deserunt obcaecati earum minima odio cum similique vero et rem est, consequuntur ex fuga sed molestias, voluptates natus sint asperiores ut veritatis deleniti at. Optio eligendi at ex qui, odit explicabo autem est quo nam cumque omnis facere nesciunt. Cum sequi neque molestias similique obcaecati quam nulla eligendi accusantium hic aliquam, alias aut tenetur autem beatae nemo fugit. Distinctio tempore nam doloremque autem, est facere officia ratione aut iste aspernatur voluptates harum soluta, vero labore ducimus enim quos eveniet odio aperiam sed error. Vel, eos, consequuntur asperiores molestias reprehenderit accusamus magni praesentium sint eaque dicta minus delectus quam esse illum animi vero laudantium. Vel sapiente dolorem ea quasi optio, minima minus voluptate corrupti quidem provident rem! Harum quis ratione saepe cumque provident? Libero debitis, quibusdam sint aspernatur maiores asperiores fugit nihil harum sunt, laboriosam fuga, sapiente magni?",
            author: "Question Mark",
        },
        comments: [
            {
                id: 1,
                username: "Question Mark",
                img: img,
                date: "13:54 01.12.2021",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, voluptatum facilis doloribus mollitia minus laudantium consequatur deserunt facere nihil et veritatis sequi qui perferendis ratione natus error. Earum voluptatibus natus amet ut unde? At obcaecati, labore reprehenderit vitae nulla pariatur, deserunt asperiores et voluptatibus rerum eveniet, ab eum neque veniam nostrum? Earum fugit cum distinctio corrupti nostrum accusamus aspernatur nam dolorum sunt, dolore obcaecati. Ex, a laborum perferendis neque incidunt quaerat ipsam expedita quas deserunt aperiam repellendus iure, consectetur nobis asperiores odit? Minus ea ducimus porro sequi dignissimos vitae nihil officia explicabo repellat pariatur amet obcaecati ex omnis voluptates qui reiciendis voluptate aliquid, ab quae? Perspiciatis aut atque quis quibusdam recusandae eaque eos quia quod necessitatibus et, fugiat iste natus iure, nihil, consequuntur repudiandae. Cum praesentium velit ipsam odio adipisci minima nulla accusamus expedita, obcaecati laudantium reprehenderit optio perferendis vel!",
                likes: 4321
            },
            {
                id: 2,
                username: "Question Mark",
                img: img,
                date: "13:54 01.12.2021",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, voluptatum facilis doloribus mollitia minus laudantium consequatur deserunt facere nihil et veritatis sequi qui perferendis ratione natus error. Earum voluptatibus natus amet ut unde? At obcaecati, labore reprehenderit vitae nulla pariatur, deserunt asperiores et voluptatibus rerum eveniet, ab eum neque veniam nostrum? Earum fugit cum distinctio corrupti nostrum accusamus aspernatur nam dolorum sunt, dolore obcaecati. Ex, a laborum perferendis neque incidunt quaerat ipsam expedita quas deserunt aperiam repellendus iure, consectetur nobis asperiores odit? Minus ea ducimus porro sequi dignissimos vitae nihil officia explicabo repellat pariatur amet obcaecati ex omnis voluptates qui reiciendis voluptate aliquid, ab quae? Perspiciatis aut atque quis quibusdam recusandae eaque eos quia quod necessitatibus et, fugiat iste natus iure, nihil, consequuntur repudiandae. Cum praesentium velit ipsam odio adipisci minima nulla accusamus expedita, obcaecati laudantium reprehenderit optio perferendis vel!",
                likes: 41
            },
            {
                id: 3,
                username: "Question Mark",
                img: img,
                date: "13:54 01.12.2021",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, voluptatum facilis doloribus mollitia minus laudantium consequatur deserunt facere nihil et veritatis sequi qui perferendis ratione natus error. Earum voluptatibus natus amet ut unde? At obcaecati, labore reprehenderit vitae nulla pariatur, deserunt asperiores et voluptatibus rerum eveniet, ab eum neque veniam nostrum? Earum fugit cum distinctio corrupti nostrum accusamus aspernatur nam dolorum sunt, dolore obcaecati. Ex, a laborum perferendis neque incidunt quaerat ipsam expedita quas deserunt aperiam repellendus iure, consectetur nobis asperiores odit? Minus ea ducimus porro sequi dignissimos vitae nihil officia explicabo repellat pariatur amet obcaecati ex omnis voluptates qui reiciendis voluptate aliquid, ab quae? Perspiciatis aut atque quis quibusdam recusandae eaque eos quia quod necessitatibus et, fugiat iste natus iure, nihil, consequuntur repudiandae. Cum praesentium velit ipsam odio adipisci minima nulla accusamus expedita, obcaecati laudantium reprehenderit optio perferendis vel!",
                likes: 1343
            }
        ]
    });
    const [isFavoriteType, setIsFavoriteType] = useState(true);

    const handleMouseEnter = (e) => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
        icons.forEach(i => {
            i.style.opacity = 1;
        })
    }

    const handleMouseLeave = () => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style = '';
        icons.forEach(i => {
            i.style = '';
        })
    }

    const seasonsList = animeData.seasons.map((s, i) => <SingleSeason key={i} title={s.title} background={s.background} link={s.link}/>);

    const typesList = animeData.types.map(t => <Link to={t.link} key={t.id} className="page__type">{t.name}</Link>);

    const imageGalery = animeData.images.map(i => (
        <Link to={i.img} key={i.id} className="page__imageLink">
            <div className="page__galeryImgWrapper">
                <img src={i.img} alt={i.fromAnime} className="img" srl_gallery_image="true"/>
            </div>
        </Link>
    ));

    return ( 
        <main className="main" style={{backgroundImage: `url(${animeData.background})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            <div className="page main__content scrollNav" data-id="1">
                <h2 className="page__title largeTitle">{animeData.title}</h2>
                <div className="page__content">
                    <div className="page__left">
                        <div className="page__imgWrapper">
                            <img src={animeData.miniImg} alt="asdasd" className="img" />
                        </div>
                        <div className="page__info">
                            <div className="page__rate">
                                <StarRateRoundedIcon className="page__infoRateIcon" />
                                <p className="page__rateValue">{animeData.rate}</p>
                            </div>
                            <div className="page__properties">
                                <p className="page__scenario page__inf">{animeData.scenario}</p>
                                <p className="page__productionDate page__inf">{animeData.productionDate}</p>
                                <p className="page__duration page__inf">{animeData.duration}</p>
                                <div className="page__favoriteAnime">
                                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                                    <p className="page__favoriteAnimeText">{animeData.likes} Adoratorów!</p>
                                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                                </div>
                            </div>
                            {isAuthorized ? <UserRate /> : null}
                        </div>
                        <div className="page__galery">
                            <h3 className="page__galeryTitle mediumTitle">Galeria</h3>
                            <SRLWrapper>
                                {imageGalery}
                            </SRLWrapper>
                        </div>
                    </div>
                    <div className="page__right">
                        <div className="page__baner" style={{backgroundImage: `url(${animeData.background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                            <div className="page__effect">
                                <a href={animeData.watchLink} target="_blank" rel="noreferrer" className="page__banerIcon watchLink"><PlayCircleOutlineRoundedIcon className="watchIcon"/></a>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner1Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner2Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner3Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner4Icon"/>
                                <PlayArrowRoundedIcon className="page__banerIcon playIcon"/>
                                <VolumeUpRoundedIcon className="page__banerIcon volumeIcon"/>
                                <div className="page__banerIcon lineIcon"></div>
                                <div className="page__banerIcon dotIcon"></div>
                                <FullscreenRoundedIcon className="page__banerIcon fullScreenIcon"/>
                            </div>
                            {isFavoriteType ? <p className="page__banerRecommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
                            <h3 className="page__banerTitle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{animeData.title}</h3>
                            <p className="page__banerInfo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <span className="page__banerInf">{animeData.scenario}</span>
                                <span className="page__banerInf">{animeData.productionDate}</span>
                                <span className="page__banerInf">{animeData.duration}</span>
                            </p>
                            <div className="page__banerRate" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <StarRateRoundedIcon className="page__banerRateIcon" />
                                <p className="page__banerRateValue">{animeData.rate}</p>
                            </div>
                        </div>
                        <div className="page__types scrollNav" data-id="2">
                            <h3 className="page__typesTitle mediumTitle">Gatunek</h3>
                            <div className="page__typesList">
                                {typesList}
                            </div>
                        </div>
                        <p className="page__description scrollNav" data-id="3">{animeData.description.text}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati asperiores possimus sint voluptatibus facilis repellendus laborum hic error, illum animi veritatis, nulla consequatur consectetur. Fuga amet ducimus veniam sint molestias! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta iusto, repellendus velit qui amet, magni accusantium odio quaerat repellat cum hic nostrum sunt labore harum sed cumque ratione autem dolorum fugiat. Culpa ad, ratione architecto totam exercitationem laboriosam fugiat est omnis, nostrum similique perferendis asperiores. Animi ea tempore voluptate ad, repellat eum pariatur, maiores totam voluptas dicta quas odio reiciendis eveniet a quo vel autem ipsum obcaecati beatae voluptates delectus minima dolore? Velit incidunt quaerat similique assumenda numquam deleniti temporibus, quas ratione quos, reiciendis itaque architecto expedita repudiandae culpa amet. Iusto numquam reprehenderit beatae magnam officia dolore eligendi officiis explicabo, ipsum, facilis distinctio dolores ad corrupti impedit odit voluptas esse sed quaerat dolor magni illo sint harum. Perferendis atque vel deserunt eos voluptas saepe ad. Nihil facilis magni totam quibusdam. Et nostrum libero laborum esse, vel cupiditate officia perferendis sequi quibusdam, quam accusamus dolorum reiciendis praesentium omnis hic aliquam fugiat repellat minus exercitationem, fugit reprehenderit? Modi delectus inventore ullam, iste eum eveniet porro corrupti, reiciendis vel eos numquam commodi sapiente laboriosam itaque ipsam molestiae in, voluptas ratione. Mollitia quas recusandae laudantium temporibus ratione exercitationem asperiores est optio esse facilis ducimus, reiciendis, architecto nisi! Deleniti eveniet exercitationem reiciendis odio vitae officia expedita provident illum soluta minus harum fugit earum quae ex, repellat aperiam odit recusandae cupiditate impedit rem ipsa. Ipsam ipsa unde ipsum quisquam sint optio aut, similique voluptatibus sed deleniti voluptate, quas non nostrum! Error iusto dolorum doloribus quia tempore, beatae dolor dignissimos adipisci. Maxime non veritatis excepturi dolorem nostrum nam sint dolores rem iusto nesciunt quas eveniet nihil fugiat mollitia reprehenderit quibusdam, ullam ab ipsam sequi dolor. Nesciunt cumque, voluptatum, quisquam minima quasi sunt voluptatem asperiores recusandae delectus nostrum fugit, sit itaque! Pariatur possimus saepe illum necessitatibus assumenda consequuntur, eos, ex cupiditate qui vero corporis maxime animi labore est! <span className="page__author">{animeData.description.author}</span></p>
                        <div className="page__audioInterface scrollNav" data-id="4">
                            <h3 className="page__soundtrackTitle mediumTitle">Posłuchaj Soundtracku!</h3>
                            <div className="page__soundtrack">
                                <Audio mp3={animeData.soundtrack.mp3}/>
                                <p className="page__soundtrackInfo">{animeData.soundtrack.composer}&nbsp;&nbsp;-&nbsp;&nbsp;"{animeData.soundtrack.title}"</p>
                            </div>
                        </div>
                        {animeData.seasons.length > 0 ? <div className="page__seasons"><h3 className="page__seasonsTitle mediumTitle">Powiązane Anime</h3>{seasonsList}</div> : null}
                    </div>
                </div>
                <Comments comments={animeData.comments}/>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Page;