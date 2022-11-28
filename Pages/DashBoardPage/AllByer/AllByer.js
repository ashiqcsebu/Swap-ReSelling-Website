import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import {myContext} from '../../../contextApi/Authcontext'

const AllByer = () => {
  const {user} = useContext(myContext)
  const { data: bayers = [], isLoading,refetch } = useQuery({
    queryKey: ["bayer",user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/bayer?email=${user?.email}`,{
        headers: {
          authorization: `bearer ${localStorage.getItem('icmToken')}`
      }
      });
      const data = await res.json();
      return data;
    },
  });

  const deletebayer = (id) =>{
    fetch(`http://localhost:5000/deleteuser?id=${id}`,{
      method : 'DELETE',
    })
    .then(res => res.json())
    .then(data => {refetch()})
  }

  if(isLoading){
    return <p>Loadding..</p>
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>serial</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { bayers && bayers.map((bayer, index) => (
            <tr key={bayer._id}>
              <th>{index + 1}</th>
              <th> {bayer.name} </th>
              <th>{bayer.email}</th>
              <th><button onClick={()=>deletebayer(bayer._id)} className="btn btn-sm btn-warning">Delete</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllByer;
