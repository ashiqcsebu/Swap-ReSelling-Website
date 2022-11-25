import React from 'react';
import img from '../../asset/images/error/error.png'
const ErrorPage = () => {
    return (
        

        <div className='error_conteiner'>
      
                <img src={img} className="h-96 w-fit mx-auto" alt="" />
         
            <p className='font-semibold text-center text-5xl text-warning'>Page Not Found</p>
          
        </div>
    );
};

export default ErrorPage;

















