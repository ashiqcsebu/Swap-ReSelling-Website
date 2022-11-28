import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { myContext } from '../../../contextApi/Authcontext';


const Allseller = () => {
  const { user } = useContext(myContext)
  const { data: sellers = [], isLoading, refetch } = useQuery({
    queryKey: ['seller', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://resale-server-woad.vercel.app/seller?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('icmToken')}`
        }
      });
      const data = await res.json()
      return data
    }
  })


  const handleVerify = (id) => {
    fetch(`https://resale-server-woad.vercel.app/users?userid=${id}&email=${user?.email}`, {
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
  }


  const deleteseller = (id) => {
    fetch(`https://resale-server-woad.vercel.app/deleteuser?id=${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => { refetch() })
  }

  if (isLoading) {
    return <p>Loadding ...</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>serial</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers && sellers.map((seller, index) => (
            <tr key={seller._id}>
              <th>{index + 1}</th>
              <th> {seller.name} </th>
              <th>{seller.email}</th>
              <th><button onClick={() => handleVerify(seller._id)} className={`btn btn-sm btn-primary ${seller.verified === true ? 'btn-primary' : 'btn-warning'}`} >
                {seller.verified === true ? 'verifyed' : 'verify Now'}
              </button></th>
              <th><button onClick={() => deleteseller(seller._id)} className='btn btn-sm btn-warning'>Delete</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allseller;