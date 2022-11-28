import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { myContext } from '../../contextApi/Authcontext';
import img from '../../asset/images/login/login.svg';
import UseTitle from '../../CustomeHOOk/useTitle/useTitle';

const Login = () => {
    UseTitle('Swap-LogIN')
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loginError, setLoginError] = useState('');
    const { logIn, googleSignin } = useContext(myContext)
    const negivet = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const handlLogin = data => {
        console.log(data);
        setLoginError('');
        logIn(data.email, data.password)
            .then(result => {

                // fetch jwt
                fetch(`https://resale-server-woad.vercel.app/jwt?email=${data.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.jwtToken) {
                            localStorage.setItem('icmToken', data.jwtToken);
                            negivet(from, { replace: true });
                        }
                    });


            })
            .catch(error => {
                setLoginError(error.message);
            });
    }

    const handleGoogleSignin = () => {
        googleSignin()
            .then(result => {
                const user = result.user;
                const name = user.displayName;
                const email = user.email;
                const role = "bayer";
                storeGoogleUserInfo(name, email, role)
                fetch(`https://resale-server-woad.vercel.app/jwt?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.jwtToken) {
                            localStorage.setItem('icmToken', data.jwtToken);
                            negivet(from, { replace: true });
                        }
                    });
            })
            .catch(error => {
                setLoginError(error.message)
            })
    }




    const storeGoogleUserInfo = (name, email, role) => {
        const deta = { name, email, role };
        fetch(`https://resale-server-woad.vercel.app/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(deta)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // negivet(from, { replace: true });
            })
    }



    return (

        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-96' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Login</h1>
                    <form onSubmit={handleSubmit(handlLogin)}>
                        <div className="form-control w-full max-w-xs mx-auto ">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mx-auto ">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label"> <span className="label-text">Forget Password?</span></label>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-primary w-full' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-green-900'>{loginError}</p>}
                        </div>
                    </form>
                    <p className='mx-auto'>New to Swap ? <Link className='font-bold text-black ' to="/signup">Create new Account</Link></p>
                    <div className="flex justify-center ">
                        <p className="text-2xl font-semibold my-2">Log in With  </p>
                    </div>
                    <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>

                </div>
            </div>
        </div>









        //     <div className='h-[800px] flex justify-center items-center'>
        //     <div className='w-96 p-7'>
        //         <h2 className='text-xl text-center'>Login</h2>
        //         <form onSubmit={handleSubmit(handlLogin)}>
        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Email</span></label>
        //                 <input type="text"
        //                     {...register("email", {
        //                         required: "Email Address is required"
        //                     })}
        //                     className="input input-bordered w-full max-w-xs" />
        //                 {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
        //             </div>
        //             <div className="form-control w-full max-w-xs">
        //                 <label className="label"> <span className="label-text">Password</span></label>
        //                 <input type="password"
        //                     {...register("password", {
        //                         required: "Password is required",
        //                         minLength: { value: 6, message: 'Password must be 6 characters or longer' }
        //                     })}
        //                     className="input input-bordered w-full max-w-xs" />
        //                 <label className="label"> <span className="label-text">Forget Password?</span></label>
        //                 {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
        //             </div>
        //             <input className='btn btn-info w-full' value="Login" type="submit" />
        //             <div>
        //                 {loginError && <p className='text-red-600'>{loginError}</p>}
        //             </div>
        //         </form>
        //         <p>New to ICM ? <Link className='text-secondary' to="/signup">Create new Account</Link></p>
        //         <div className="divider">OR</div>
        //         <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        //     </div>
        // </div>
    );
};

export default Login;