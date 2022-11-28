import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { myContext } from "../../../contextApi/Authcontext";

const Reports = () => {
  const { user: adminemail } = useContext(myContext)
  const { data: reposts } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await fetch(`https://resale-server-woad.vercel.app/report?email=${adminemail?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('icmToken')}`
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>serial</th>
            <th>sellerName</th>
            <th>Product Name</th>
            <th> Brand Name </th>
          </tr>
        </thead>
        <tbody>
          {reposts &&
            reposts.map((report, index) => (
              <tr>
                <th> {index + 1} </th>
                <th> {report.sellerName} </th>
                <th> {report.product_name} </th>
                <th> {report.brand_name} </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
