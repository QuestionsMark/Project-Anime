import React from 'react';

import LeftNav from '../LeftNav';
import Add from '../Add';
import RightSide from '../RightSide';

const Home = () => {
    return ( 
        <main className="main">
            <div className="main__leftSide">
                <LeftNav />
                <Add />
            </div>
            <div className="home main__content">
                <section className="home__animest main__section">
                    <div className="home__topAnime">

                    </div>
                    <div className="home__more">
                        <p className="home__showMore">Zobacz więcej</p>
                    </div>
                </section>
            </div>
            <RightSide />
        </main>
     );
}
 
export default Home;