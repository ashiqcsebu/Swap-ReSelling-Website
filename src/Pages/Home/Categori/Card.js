import React from "react";
import { Link } from "react-router-dom";


const Card = ({ categories }) => {

  const { thumbnail, category_name, _id } = categories;

  return (


    <div className="card card-compact w-96 bg-base-100 shadow-xl ">
      <figure>
        <img src={thumbnail} className="h-full w-11/12 rounded-xl" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold mx-auto text-fuchsia-700">{category_name}</h2>
        <div className="card-actions justify-end">
          <Link to={`/categori/${_id}`}><button className="btn btn-primary"> View All </button></Link>
        </div>
      </div>
    </div>

  );
};

export default Card;
