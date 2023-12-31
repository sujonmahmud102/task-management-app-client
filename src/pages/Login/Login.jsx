import React, { useContext, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';
import { Authcontext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const { signInByEmailPass, createdByGoogle } = useContext(Authcontext);
    const [passwordType, setPasswordType] = useState('password');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const navigate = useNavigate();
    useTitle('Login');
    const location = useLocation();


    const from = location.state?.from?.pathname || '/';


    // handle password type change
    const handlePassType = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }

    // handle login
    const handleSignIn = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // email password signIn
        signInByEmailPass(email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                Swal.fire(
                    'Good job!',
                    'Successfully login',
                    'success'
                );
                form.reset();
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.log(error.message);
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setPassError('');
                    setEmailError('Please provide valid email format')
                }
                else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setPassError('');
                    setEmailError('User not found for this email')
                }
                else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setEmailError('');
                    setPassError('Wrong password')
                }
                else {
                    setPassError('');
                }

            })
        // console.log(email, password)
    }

    // user create by google
    const registerByGoogle = () => {
        createdByGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL };

                fetch('https://task-management-system-server-dun.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                    })
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully login by Google.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section className="hero px-4 py-6 md:py-12 md:px-16">
            <div className="lg:w-3/4 flex items-center justify-center  bg-base-100">
                {/* <div>
                    <img className='w-[500px]' src={img} alt="" />
                </div> */}
                <div className="card md:w-1/2 shadow-2xl">
                    <div className="card-body">
                        <div>
                            <h1 className="text-2xl lg:text-4xl font-bold mb-3">Login</h1>
                            <p>Don`t have an account? <Link className='text-secondary' to='/register'>Register Now</Link></p>
                        </div>
                        {/* form start */}
                        <form onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" required className="input input-bordered" />
                                <p className='text-red-500 text-sm'>
                                    <small>{emailError}</small>
                                </p>
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={passwordType} name='password' placeholder="password" required className="input input-bordered pr-10" />
                                <p className='text-red-500 text-sm'>
                                    <small>{passError}</small>
                                </p>
                                <div className="absolute right-1 top-11 p-2 rounded-md" onClick={handlePassType}>
                                    {
                                        passwordType === 'password' ?
                                            <span>  < FaEye ></FaEye></span>
                                            :
                                            <span> <FaEyeSlash></FaEyeSlash></span>
                                    }
                                </div>

                            </div>
                            <div className="form-control mt-6">
                                <button className="py-2 btn-secondary rounded-lg">Login</button>
                            </div>
                        </form>
                        {/* form end */}
                        <div className="divider">OR</div>
                        <div onClick={registerByGoogle} className='flex justify-center items-center btn btn-outline btn-light'>
                            <div>
                                <FaGoogle></FaGoogle>
                            </div>
                            <button className='ml-4'>
                                Continue With Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;