import React from 'react';
import people1 from '../../../../src/asset/images/review/people1.jpg'
import people2 from  '../../../../src/asset/images/review/people2.jpg'
import people3 from  '../../../../src/asset/images/review/people3.jpg'
import Review from './Review';

const Reviews = () => {
    
    const reviews = [

        {
            _id: 1, 
            name: 'Sayla Setu',
            img: people2,
            review: "I did not expect to get such a service in a pandemic situation. Very good initiative. If the situation gets better, more services will come. Thanks to you!",
            location: 'Gulsan,Dhaka'
        },
        {
            _id: 2, 
            name: 'Kamruzzaman Shuvo',
            img: people1,
            review: "There was no such service like SWAP in our area before. It's great to be able to sell so beautifully online. I did not expect to get such service in Chuadanga. We will get many benefits if we get such service in future.",
            location: 'Mirpur, Dhaka'
        },
      
        {
            _id: 3, 
            name: 'Israt Jahan',
            img: people3,
            review:"Their behaviour is just great. We had a good deal with them . thank you for keeping up your words as you said ,may you have a wonderful progressive future ahead 🥰definitely recommended👍🏻 Inshallah we will use their service more in future.",
            location: 'Banani,Dhaka'
        },
    ]

    return (
        <section className='my-16 mx-auto w-11/12  md:w-[1240px] lg:w-[1240] text-black'>
           <h1 className='text-center text-purple-600 font-bold text-4xl my-10'>Customer's Review</h1>
      
            <div className='grid w-full mx-auto gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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

export default Reviews;