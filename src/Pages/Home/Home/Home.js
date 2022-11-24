import React from 'react';
import Banner from '../Banner/Banner';
 import CustomerReview from '../CustomerReview/CustomerReview';

const Home = () => {
    return (
        <div className='mx-12'>
            <Banner></Banner>
            <h1>this is home</h1>
           <CustomerReview></CustomerReview> 
        </div>
    );
};

export default Home;