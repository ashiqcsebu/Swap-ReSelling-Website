import React from 'react';
import Banner from '../Banner/Banner';
import Campain from '../Campain/Campain';
import Categorie from '../Categori/Categorie';
import Reviews from '../Reviews/Reviews';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <Categorie></Categorie>
            <Campain></Campain>
            <Reviews></Reviews>
        </div>
    );
};

export default Homepage;