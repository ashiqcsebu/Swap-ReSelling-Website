import React from 'react';
import people1 from '../../../asset/images/review/people1.png';
import people2 from '../../../asset/images/review/people2.png';
import people3 from '../../../asset/images/review/people3.png';
import Review from './Review';

const CustomerReview = () => {
    const reviews = [
        {
            _id: 1, 
            name: 'Saifuzzaman Shuvo',
            img: people1,
            review: "There was no such service like SWAP in our area before. It's great to be able to sell so beautifully online. I did not expect to get such service in Chuadanga. We will get many benefits if we get such service in future.",
            location: 'Mirpur, Dhaka'
        },
        {
            _id: 2, 
            name: 'Jesmin Akhter',
            img: people2,
            review: "I did not expect to get such a service in a pandemic situation. Very good initiative. If the situation gets better, more services will come. Thanks to you!",
            location: 'Gulsan,Dhaka'
        },
        {
            _id: 3, 
            name: 'Nasrin Jahan',
            img: people3,
            review:"Their behaviour is just great. We had a good deal with them . thank you for keeping up your words as you said ,may you have a wonderful progressive future ahead 🥰definitely recommended👍🏻 Inshallah we will use their service more in future.",
            location: 'Banani,Dhaka'
        },
    ]

    return (
        <section className='my-16  text-black'>
           
             <h1 className='text-3xl font-semibold mb-2'>Customer's Review</h1>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map(review =><Review
                        key={review._id}
                        review={review}
                    >
                    </Review>)
                }
            </div>
        </section>
    );
};

export default CustomerReview;