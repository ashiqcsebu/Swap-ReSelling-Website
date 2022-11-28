import React, { useContext } from "react";
import './productCard.css'
import { FiPhoneCall } from 'react-icons/fi';
import { ImLocation2 } from 'react-icons/im';
import { GoVerified } from 'react-icons/go';
import { useQuery } from "@tanstack/react-query";
import { MdOutlineWarning } from 'react-icons/md';
import { myContext } from "../../contextApi/Authcontext";
import toast from "react-hot-toast";
const ProductCard = ({ prod, setmodalinfo }) => {
  const { user: bayer } = useContext(myContext)
  const {
    product_name,
    image,
    product_price,
    Market_Price,
    mobile,
    purchase_year,
    condition_type,
    brand_name,
    productDetails,
    location,
    time,
    sellerName,
    _id
  } = prod;

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', sellerName],
    queryFn: async () => {
      const res = await fetch(`https://resale-server-woad.vercel.app/user?sellerName=${sellerName}`)
      const data = await res.json()
      return data
    }
  })

  const reportAdmin = (id) => {
    fetch(`https://resale-server-woad.vercel.app/report?id=${id}&email=${bayer?.email}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("icmToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('report send successFull')
        }
      })
  }

  if (isLoading) {
    return <progress className="progress w-56"></progress>
  }


  return (
    <div className="containerdiv border pl-5 my-5 flex flex-col justify-start w-11/12 mx-auto md:justify-evently md:flex-row gap-10 ">
      <div className="left_side lg:w-[30%] md:w-[30%] m-5 md:m-0 lg:m-0">
        <div className="img_div mt-5">
          {" "}
          <img className="w-full rounded-md shadow-md" src={image} alt="" />{" "}
        </div>
        <div className="flex items-center justify-between py-2">
          <h2 className="text-3xl text-orange-300 font-bold"> $ {product_price}</h2>
          <span className="text-xl text-orange-300">{brand_name}</span>
        </div>
      </div>
      <div className="right_side p-5 lg:w-[-60%] md:w-[60%]">
        <h2 className="text-4xl mb-3 text-lime-800 font-bold"> {product_name} </h2>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center"> <span className="text-2xl font-semi-bold mr-2">Post by - {sellerName}</span>
            {user?.verified === true && <span className="text-xl text-blue-500"><GoVerified /></span>}
          </div>
          <small className="text-orange-300">{time} </small>
        </div>
        <p className="description"> {productDetails.slice(0, 300)} </p>
        <div className=" flex flex-wrap my-2 rounded-md">
          <span className="flex mx-1 p-1 bg-[#edeeed] my-1 rounded-md items-center"> <div className="mr-2"><FiPhoneCall /></div> {mobile} </span>
          <span className="flex mx-1 p-1 bg-[#edeeed] my-1 rounded-md items-center"> Market price {Market_Price}, </span>
          <span className="flex mx-1 p-1 bg-[#edeeed] my-1 rounded-md items-center"> purchase year {purchase_year}, </span>
          <span className="flex mx-1 p-1 bg-[#edeeed] my-1 rounded-md items-center">  condition {condition_type}, </span>
          <span className="flex mx-1 p-1 bg-[#edeeed] my-1 rounded-md items-center"> <ImLocation2 /> {location} </span>
        </div>
        <div> {<label onClick={() => setmodalinfo(prod)} htmlFor="openmodal" className="btn btn-success">Book Now</label>}
          <button onClick={() => reportAdmin(_id)} className="btn btn-warning mx-2"> report to admin <MdOutlineWarning /> </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
