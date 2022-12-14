import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../../contextApi/Authcontext";
import UseTitle from "../../../CustomeHOOk/useTitle/useTitle";
const Myorders = () => {
  UseTitle('Swap-Dashboard')
  const { user } = useContext(myContext);
  const { data: bookedproduct = [], isLoading } = useQuery({
    queryKey: ["bookingproduct", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://resale-server-woad.vercel.app/bookingproduct?email=${user?.email}`,
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
    return <progress className="progress w-56"></progress>;
  }
  return (
    <>
      {
        bookedproduct &&

        <div>
          <h2 className="text-center my-4 text-2xl">
            My Orders {bookedproduct.length}{" "}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>serial</th>
                  <th>product name</th>
                  <th> brand_name </th>
                  <th> Product Price </th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {bookedproduct.length > 0 && bookedproduct.map((booked, index) => (
                  <tr key={booked._id}>
                    <th>{index + 1}</th>
                    <th> {booked.product_name} </th>
                    <th> {booked.brand_name} </th>
                    <th> {booked.product_price} </th>
                    <th>
                      {
                        booked.sold === true ?
                          <button className="btn btn-success">
                            Paid
                          </button>
                          :
                          <>
                            <Link to={`/dashbord/parches/${booked._id}`} className="btn btn-sm"> Pay Now </Link>
                          </>


                      }

                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
};

export default Myorders;