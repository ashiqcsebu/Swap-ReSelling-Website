
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { myContext } from '../../../contextApi/Authcontext';
import CampainCard from './CampainCard';

const Campain = () => {
const {user} = useContext(myContext)

const {data:campain =[] , isLoading} = useQuery({
queryKey : ['campain'],
queryFn : async ()=>{
    const res = await fetch(`http://localhost:5000/campain`);
    const data = res.json()
    return data
}
})
console.log(campain)

if(isLoading){
    return <p>loadding....</p>
}
    return (
       <>
       
       {
        campain.length &&
        
        <>
         <div>
         <h1 className='text-center text-purple-600 font-bold text-4xl my-10'>Campaign Ongoing</h1>
        {/* <div className='grid md:grid-cols-4 lg:gird-cols-4 w-11/12 md:w-[1240px] lg:w-[1240px] mx-auto gap-6'> */}
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
        {
             campain.map((campcard)=> <CampainCard key={campcard._id} campcard ={campcard}></CampainCard>)
         }
        </div>
     </div>
        </>
       }
       </>
    );
};

export default Campain;