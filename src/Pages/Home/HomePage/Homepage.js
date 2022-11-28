import React from 'react';
import UseTitle from '../../../CustomeHOOk/useTitle/useTitle';
import Banner from '../Banner/Banner';
import Campain from '../Campain/Campain';
import Categorie from '../Categori/Categorie';
import Reviews from '../Reviews/Reviews';

const Homepage = () => {
    UseTitle('Swap')
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