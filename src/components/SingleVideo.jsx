import React from 'react';

const SingleVideo = ({video}) => {

    const { id, src } = video;

    return ( 
        <iframe className="news-page__iframe" src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="true"></iframe>
     );
}
 
export default SingleVideo;