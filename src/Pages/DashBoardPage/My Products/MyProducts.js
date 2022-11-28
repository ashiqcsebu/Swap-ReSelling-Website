import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { myContext } from "../../../contextApi/Authcontext";

const MyProducts = () => {
  const { user } = useContext(myContext);
  const { data: myproducts = [], isLoading, refetch } = useQuery({
    queryKey: ["myproduct", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://resale-server-woad.vercel.app/myproduct?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("icmToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <progress className="progress w-56"></progress>
  }

  const handlecampain = (id) => {
    fetch(`https://resale-server-woad.vercel.app/campain?productId=${id}&email=${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("icmToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch()
      })

  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>product Name</th>
              <th>Price </th>
              <th> Status </th>
              <th> Advertise </th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>
            {myproducts.length > 0 ? (
              <>
                {myproducts.map((product) => (
                  <tr key={product._id}>
                    <th></th>
                    <th> {product.product_name} </th>
                    <th> {product.product_price} </th>
                    <th>
                      {" "}
                      <button className={`btn btn-sm ${product.sold === true ? 'btn-warning' : 'btn-success'}`}>
                        {product.sold === true ? "Not Available" : "Availble"}
                      </button>{" "}
                    </th>
                    <th>
                      {" "}
                      <button
                        disabled={product.sold === true}
                        onClick={() => handlecampain(product._id)}
                        className={`btn btn-sm  ${product.campain === true ? 'btn-success' : 'btn-primary'}`}
                      >
                        {product.campain === true ? 'add is running' : 'start campain'}
                      </button>{" "}
                    </th>
                    <th>
                      {" "}
                      <button className="btn btn-sm btn-warning">
                        Delete
                      </button>{" "}
                    </th>
                  </tr>
                ))}
              </>
            ) : (
              <h3 className="text-4xl text-center text-success">
                No Product Abailable For Sells Add More{" "}
              </h3>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
