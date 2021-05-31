import React from 'react'

const Home = () => {
    return ( 
        <main className="main">
            <div className="home main__content">
                <section className="home__animest main__section">
                    <ul className="home__animestList">
                        <li className="home__animestItem"></li>
                        <li className="home__animestItem"></li>
                        <li className="home__animestItem"></li>
                    </ul>
                    <div className="home__more">
                        <p className="home__showMore">Zobacz więcej</p>
                    </div>
                </section>
            </div>
        </main>
     );
}
 
export default Home;