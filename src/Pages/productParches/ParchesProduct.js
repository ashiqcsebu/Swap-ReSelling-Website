import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOut from "./CheckOut";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
console.log(stripePromise);
const ParchesProduct = () => {
  const bookedprodut = useLoaderData();
  const {product_price,product_name} = bookedprodut
  console.log(bookedprodut);
  return (
    <div>
      <h1 className="text-4xl"> Details about {product_name} </h1>
      <div>
        <h2 className="text-xl text-success my-1">
          Price <strong>{product_price}</strong>{" "}
        </h2>
      </div>
      <div>
        <Elements stripe={stripePromise}> <CheckOut bookedprodut={bookedprodut}></CheckOut> </Elements>
      </div>
    </div>
  );
};

export default ParchesProduct;
