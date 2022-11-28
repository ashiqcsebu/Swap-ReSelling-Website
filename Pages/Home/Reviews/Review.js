

import React from 'react';
const Review = ({ review }) => {
    const { name, img, review: userReview, location } = review;
    return (
        <div className="card w-96 md:w-full lg:w-full shadow-xl text-black">
           
            <div className="card-body">
                <p className=" text-black">{userReview}</p>
                <div className="flex items-center mt-6">
                <div className="avatar mr-6">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt="" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-xl ">{name}</h5>
                        <p>{location}</p>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Review;