import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import UseTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';
import img from '../../asset/images/login/signup.svg'

const SignUp = () => {
    UseTitle('sign up')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }



    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-96' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100 py-8 bordered border-zinc-600">
                    <h1 className="text-5xl text-center font-bold text-success">Please Sign Up</h1>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text text-black">Name</span></label>
                            <input type="text" {...register("name", {
                                required: "Name is Required"
                            })} className="input input-bordered bg-slate-200 text-black w-full max-w-xs mx-auto" />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text text-black">Email</span></label>
                            <input type="email" {...register("email", {
                                required: true
                            })} className="input input-bordered bg-slate-200 text-black w-full max-w-xs mx-auto" />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto">
                            <label className="label"> <span className="label-text text-black">Password</span></label>
                            <input type="password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="input input-bordered bg-slate-200 text-black w-full max-w-xs mx-auto" />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto">

                
                        <select {...register("userRole",{
                                required: true
                            })} 
                                className="select select-bordered mt-4 text-black  bg-slate-200">
                           
                             <option value="seller" className='pt-4 text-black'>Seller</option>
                             <option value="buyer" className='pt-4 text-black'>Buyer</option>
                        </select>
                        </div>
                        <input className='btn btn-accent mt-5 mx-28 px-12' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600 '>{signUpError}</p>}
                    </form>
                    <p className='text-black mx-auto mt-4'>Already have an account?<Link className='text-secondary' to="/login">Please Login</Link></p>
                  
                    <button className='btn btn-accent mt-5 mx-auto'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;