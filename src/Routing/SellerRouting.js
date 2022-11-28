
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { myContext } from '../contextApi/Authcontext';
import useAdminHook from '../CustomeHOOk/MakeAdmin/useAdminHook';
import useSellerHook from '../CustomeHOOk/MakeSellerHook/useSellerHook';

const SellerRouting = ({children}) => {
    const {user, loading} = useContext(myContext);
    const location = useLocation();
    const [admin, adminLoading] = useAdminHook(user?.email)
    const [seller, setsellerloadding] = useSellerHook(user?.email)

    if(loading || adminLoading || setsellerloadding){
        return <progress className="progress w-56"></progress>
    }

    if ( admin  || seller ){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default SellerRouting;