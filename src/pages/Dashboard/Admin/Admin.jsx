import React, { useContext, useState } from 'react';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaClipboardList, FaHome, FaUsers } from 'react-icons/fa';

const Admin = () => {
    const { user, logOut } = useContext(Authcontext);

    // handle LogOUt
    const handleLogOUt = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">

                    {/* navbar */}

                    <div className="absolute left-0 md:static w-full navbar-start md:navbar bg-base-200 px-16">
                        <div className="flex-1">
                            <Link className="hidden lg:block btn btn-ghost normal-case text-xl">Dashboard</Link>
                        </div>
                        <div className="flex-none gap-2">

                            <div className="dropdown dropdown-end flex items-center gap-3">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className=" ">
                                        <img className='rounded-full w-8 h-8 mr-3' src={user?.photoURL} alt="User image" />

                                    </div>
                                </label>
                                <div className='md:mr-24'>
                                    <p className='text-black text-sm md:text-base'>{user?.displayName}</p>
                                    <p className='text-black text-xs md:text-base'>{user?.email}</p>

                                    <p className='text-input-group-xs'> Admin </p>
                                </div>
                                <button onClick={handleLogOUt} className='btn btn-neutral btn-xs md:btn-sm absolute -right-14 md:mr-16'>Logout</button>
                            </div>
                        </div>
                    </div>

                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-xs md:btn-sm drawer-button lg:hidden absolute top-4 md:top-6 left-0 md:left-5 text-xl">
                        <FaBars />
                    </label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 h-full bg-error text-base-content">
                        {/* Sidebar content here */}
                        <li className='my-4'>
                            <div>
                                <Link to='/admin/' className="btn btn-ghost ">Tasks Management System
                                </Link>
                            </div>
                        </li>

                        <li>
                            <NavLink
                                to='/admin/'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaHome /> Admin Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin/manage-tasks'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaClipboardList></FaClipboardList> Manage Tasks
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/admin/manage-users'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaUsers></FaUsers> Manage Users
                            </NavLink>
                        </li>

                        <hr className="border border-white my-10" />

                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) => isActive ? "font-bold text-white" : ""}
                            ><FaHome />  Home
                            </NavLink>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
};

export default Admin;