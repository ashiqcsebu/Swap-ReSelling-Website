import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CampainCard from './CampainCard';
const Campain = () => {
  

    const { data: campain = [], isLoading } = useQuery({
        queryKey: ['campain'],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-woad.vercel.app/campain`);
            const data = res.json()
            return data
        }
    })
    console.log(campain)

    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }
    return (
        <>

            {
                campain.length &&

                <>
                    <div>
                        <h1 className='text-center text-purple-600 font-bold text-4xl my-10'>Campaign Ongoing</h1>
                    
                        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                            {
                                campain?.map((campcard) => <CampainCard key={campcard._id} campcard={campcard}></CampainCard>)
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Campain;