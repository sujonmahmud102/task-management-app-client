import React, { useContext, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/loginReg.jpg'
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';
import { Authcontext } from '../../AuthProvider/AuthProvider';




const Register = () => {
    const { createdByEmailPass, updateUserInfo, createdByGoogle } = useContext(Authcontext);
    const [passwordType, setPasswordType] = useState('password');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    useTitle('Register');
    const [imgName, setImgName] = useState('');
    const [image, setImage] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // set photo 
    const handleImageChange = (e) => {
        setBtnDisable(true);
        setImgName(e.target.files[0]);

        // image hosting imgbb

        const url = "https://api.imgbb.com/1/upload?key=ec77ad35f63ea60fb621c01bb7ceaa26"
        const formData = new FormData();
        formData.append("image", e.target.files[0])

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                setBtnDisable(false);
                // console.log(imgResponse);
                setImage(imgResponse.data.display_url)
            })


    }

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

    // handle submit
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = image;

        setLoading(true);

        createdByEmailPass(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // user creat to database
                const saveUser = { name, email, photo: image };

                // console.log(saveUser)
                fetch('https://task-management-system-server-dun.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                }).then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {

                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setLoading(false);
                            setPassError('');
                            setEmailError('');
                            form.reset();
                            navigate('/login');
                        }
                        console.log(data)
                    })

                // update profile
                updateUserInfo(name, photo)
                    .then()
                    .catch(error => {
                        console.log(error)
                    });
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setLoading(false);
                    setPassError('');
                    setEmailError('Please provide valid email format')
                }
                else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setLoading(false);
                    setPassError('');
                    setEmailError('Already account created for this email')
                }
                else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    setLoading(false);
                    setEmailError('');
                    setPassError('Password should be at least 6 characters')
                }
                else {
                    setPassError('');
                    setLoading(false);
                }

            })

        // console.log(name, email, password, photo)
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
                    title: 'User Login Successful.',
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
        <section className='p-4 md:py-12 md:px-16'>
            <div className=" mt-5">
                <div className="w-full mx-auto lg:w-3/4 lg:flex items-center justify-center bg-base-100">
                    <div>
                        <img className='w-[600px] hidden lg:block' src={img} alt="" />
                    </div>
                    <div className=" md:w-1/2 shadow-2xl">
                        <div>
                            <div className="card-body  border-solid border-2 rounded-lg">
                                <div>
                                    <h1 className="text-2xl lg:text-4xl font-bold mb-3">Register</h1>
                                    <p>Already have an account?  <Link className='text-secondary' to='/login'>Login</Link></p>
                                </div>
                                {/* form start */}
                                <form onSubmit={handleSubmit} >
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name='name' placeholder="Name" required className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="text" name='email' placeholder="Email" required className="input input-bordered" />
                                        <p className='text-red-500 text-sm'>
                                            <small>{emailError}</small>
                                        </p>
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type={passwordType} name='password' placeholder="Password" required className="input input-bordered pr-10" />
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

                                    {/* photo */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo</span>
                                        </label>
                                        <div className='flex items-center justify-between'>


                                            {
                                                imgName ?
                                                    <img className='w-10 h-10 lg:w-14 lg:h-14 rounded-full' src={URL.createObjectURL(imgName)} alt="" />
                                                    :
                                                    <FaImage className='w-10 h-10' />

                                            }

                                            <input onChange={handleImageChange} type="file" required className="ml-5" accept='image/*' />
                                        </div>

                                    </div>
                                    <div className="form-control mt-6">
                                        {btnDisable &&
                                            <span className="loading loading-spinner text-secondary mx-auto mb-4"></span>
                                        }
                                        <button className="py-2 btn bg-pink-500 text-white rounded-lg" disabled={btnDisable || loading} >Register</button>
                                        {loading &&
                                            <span className="loading loading-bars loading-xs lg:loading-lg mx-auto"></span>
                                        }
                                    </div>
                                </form>
                                {/* form end */}
                                <div>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;