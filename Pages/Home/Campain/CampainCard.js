import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GoVerified } from "react-icons/go";



const CampainCard = ({ campcard }) => {
  
 
  const {
    image,
    product_name,
    product_price,
    sellerName,
    time,
    Market_Price,
    
  } = campcard;

  const {data : user, } = useQuery({
    queryKey : ['user',sellerName],
    queryFn : async ()=>{
      const res = await fetch(`http://localhost:5000/user?sellerName=${sellerName}`)
      const data = await res.json()
      return data
    }
  })


  return (

    <div className="card card-compact w-96 bg-base-100 shadow-xl ">
    <figure>
      <img src={image} className="h-full w-11/12 rounded-xl" alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-3xl font-bold mx-auto text-fuchsia-700">{product_name}</h2>
      <h2 className="font-bold text-green-400"> $ {product_price} </h2>
      <h2 className="font-bold text-red-500"> <del> $ {Market_Price}</del> </h2>

      <div className="flex items-center"> <span className="text-2xl font-semi-bold mr-2">Post by - {sellerName}</span>
           { user?.verified === true && <span className="text-xl text-blue-500"><GoVerified/></span>}
          </div>
      {/* <h5 className="text-xl font-semibold">Post by {sellerName} </h5> */}
      <h5 className=""> {time} </h5>
      <div className="card-actions justify-end">
  
       
      </div>
    </div>
  </div>











  );
};

export default CampainCard;
