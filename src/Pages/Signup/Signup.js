import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../contextApi/Authcontext';
import img from '../../asset/images/login/signup.svg';
import UseTitle from '../../CustomeHOOk/useTitle/useTitle';

const Signup = () => {
    UseTitle('Swap-Sign Up')
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [signUpError, setSignUPError] = useState('')
    const { signuP, updateUser } = useContext(myContext)
    const naviget = useNavigate()
    const handleSignup = (data) => {
        setSignUPError('');
        signuP(data.email, data.password)

            .then(result => {
                const user = result.user;
                console.log(user);

                const userInfo = {
                    displayName: data.name

                }
                updateUser(userInfo)
                    .then(() => {
                        storeUserInDB(data.name, data.email, data.role)
                        toast.success('Signup Complete')
                        naviget('/')
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }


    const storeUserInDB = (name, email, role) => {
        const user = { name, email, role };
        fetch(`https://resale-server-woad.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                fetch(`https://resale-server-woad.vercel.app/jwt?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.jwtToken) {
                            localStorage.setItem('icmToken', data.jwtToken);
                            naviget('/')
                        }
                    });

            })
    }




    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-96' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text">Name</span></label>
                            <input type="text" {...register("name", {
                                required: "Name is Required"
                            })} className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="email" {...register("email", {
                                required: true
                            })} className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="input input-bordered w-full max-w-xs" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text">Select Type Of Account</span></label>
                            <select name="role" {...register("role", { required: true })} className="select select-bordered w-full">
                                <option value='bayer'> Buyer Account</option>
                                <option value='seller'> Sellect Account </option>
                            </select>
                        </div>



                        <input className='btn btn-primary w-full mt-4' value="Sign Up" type="submit" />
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </form>
                    <p className='text-center'>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                </div>
            </div>
        </div>















        //     <div className='h-[800px] flex justify-center items-center'>
        //     <div className='w-96 p-7'>
        //         <h2 className='text-xl text-center'>Sign Up</h2>
        //         <form onSubmit={handleSubmit(handleSignup)}>
        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Name</span></label>
        //                 <input type="text" {...register("name", {
        //                     required: "Name is Required"
        //                 })} className="input input-bordered w-full max-w-xs" />
        //                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        //             </div>
        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Email</span></label>
        //                 <input type="email" {...register("email", {
        //                     required: true
        //                 })} className="input input-bordered w-full max-w-xs" />
        //                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        //             </div>

        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Password</span></label>
        //                 <input type="password" {...register("password", {
        //                     required: "Password is required",
        //                     minLength: { value: 6, message: "Password must be 6 characters long" },
        //                     pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
        //                 })} className="input input-bordered w-full max-w-xs" />
        //                 {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        //             </div>
        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Select Type Of Account</span></label>
        //                 <select name="role" {...register("role", { required: true})} className="select select-bordered w-full">
        //                  <option value= 'bayer'> bayer </option>
        //                  <option value= 'seller'> seller </option>
        //               </select>
        //             </div>



        //             <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
        //             {signUpError && <p className='text-red-600'>{signUpError}</p>}
        //         </form>
        //         <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
        //         <div className="divider">OR</div>
        //         <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>

        //     </div>
        // </div>
    );
};

export default Signup;