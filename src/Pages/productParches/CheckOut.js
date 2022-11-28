import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../contextApi/Authcontext";
import UseTitle from "../../CustomeHOOk/useTitle/useTitle";

const CheckOut = ({ bookedprodut }) => {
  const { user } = useContext(myContext)
  const stripe = useStripe();
  const elements = useElements();
  const [carderror, setcarderror] = useState("");
  const [success, setsuccess] = useState("");
  const [trangaction, settrangaction] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loadding, setloadding] = useState(false);
  const { product_price, name, email, sellerEmail, product_name } = bookedprodut;


  useEffect(() => {
    UseTitle('Swap-CheckOut')
    // Create PaymentIntent as soon as the page loads
    fetch("https://resale-server-woad.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem("icmToken")}`,
      },
      body: JSON.stringify({ product_price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

  }, [product_price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setcarderror("");
    setloadding(true)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setcarderror(error.message);
    } else {
      setcarderror("");
    }
    setsuccess("")
    const { paymentIntent, error: confirerrors } = await stripe.confirmCardPayment(clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email
          },
        },
      },
    );

    if (confirerrors) {
      setcarderror(confirerrors.message);
      return;
    }
    console.log(paymentIntent)
    if (paymentIntent.status === "succeeded") {
      setsuccess('payment complete')
      settrangaction(paymentIntent.id)
      // update product status post feth
      paymentAdd()

      // update bookedcolledction
      paymentAddinfoinbookedCollection()
    }
    setloadding(false)
  };


  const paymentAdd = () => {
    fetch(`https://resale-server-woad.vercel.app/addpayment?sellerEmail=${sellerEmail}&product_name=${product_name}&email=${user?.email}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("icmToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

      })
  }
  const paymentAddinfoinbookedCollection = () => {
    fetch(`https://resale-server-woad.vercel.app/addpaymentinbooked?sellerEmail=${sellerEmail}&product_name=${product_name}&email=${user?.email}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("icmToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

      })
  }


  return (
    <>
      <form className="w-96" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success text-lime-50 my-3"
          type="submit"
          disabled={!stripe || !clientSecret || loadding}
        >
          Pay Now
        </button>
      </form>
      {
        success && <div>
          <p className="text-green-500"> {success} payent id {trangaction} </p>
        </div>
      }
      {carderror && <p className="text-red-600"> {carderror} </p>}
    </>
  );
};

export default CheckOut;
