import React from 'react'

const SingleNews = ({date, text, title}) => {
    return ( 
        <div className="news__article">
            <h2 className="news__articleTitle">{title}</h2>
            <p className="news__text">{text}</p>
            <p className="news__date">{date}</p>
        </div>
     );
}
 
export default SingleNews;