import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookModal from '../../component/BookModal';
import { myContext } from '../../contextApi/Authcontext';
import UseTitle from '../../CustomeHOOk/useTitle/useTitle';
import ProductCard from './ProductCard'
const AllProducts = () => {
    UseTitle('Swap-AllProuct')
    const { user } = useContext(myContext)
    const [modalinfo, setmodalinfo] = useState(null)
    const data = useLoaderData()
    const { category_name } = data
    const { data: product = [], isLoading } = useQuery({
        queryKey: ['allproducts', category_name],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-woad.vercel.app/allproducts?category_name=${category_name}&email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('icmToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }



    return (
        <div>
            <h2 className='text-center text-3xl text-purple-600'> {category_name} Brand products</h2>
            {
                product.length ? product.map(prod => <ProductCard setmodalinfo={setmodalinfo} key={prod._id} prod={prod}></ProductCard>)
                    :
                    <h2 className='text-center text-3xl text-orange-300'>Stock Out  </h2>
            }
            {modalinfo && <BookModal setmodalinfo={setmodalinfo} modalinfo={modalinfo}></BookModal>}

        </div>
    );
};

export default AllProducts;