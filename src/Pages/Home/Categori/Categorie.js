import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Card from './Card';

const Categorie = () => {
    const { data: catetories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-woad.vercel.app/categories`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <div >
            <h1 className='text-center font-semibold text-2xl my-10 lg:text-5xl  md:text-5xl text-purple-600'> Select Your Favorite Brand </h1>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>

                {
                    catetories && catetories.map(categories => <Card categories={categories}></Card>)
                }
            </div>
        </div>

    );
};

export default Categorie;

