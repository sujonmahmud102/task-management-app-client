import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Authcontext } from '../../../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(Authcontext);
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch(`https://task-management-system-server-dun.vercel.app/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    const filterUser = users.find(u => u.email === user?.email);

    // handle LogOUt
    const handleLogOUt = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }
    const navItems = <>
        <li>
            <Link className="btn btn-ghost normal-case text-md md:hidden" to='/'>
                Tasks Management System
            </Link>
        </li>

        <li>
            <NavLink
                to='/my-added-tasks'
                className={({ isActive }) => isActive ? "font-bold text-secondary" : ""}>
                My Added Tasks
            </NavLink>
        </li>
        <li>
            <NavLink
                to='/add-task'
                className={({ isActive }) => isActive ? "font-bold text-secondary" : ""}>
                Add A Task
            </NavLink>
        </li>

        {
            filterUser?.role === 'Admin' &&
            <li>
                <NavLink
                    to='/admin/'
                    className={({ isActive }) => isActive ? "font-bold text-secondary" : ""}>
                    Admin Dashboard
                </NavLink>
            </li>
        }

        {!user && <li>
            <NavLink
                to='/'
                className={({ isActive }) => isActive ? "font-bold text-secondary" : ""}>
                Login
            </NavLink>
        </li>}

    </>

    return (
        <nav className="sticky top-0 z-50 navbar bg-base-200 px-4 md:px-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl hidden md:block pt-2" to='/'>
                    <p>Tasks Management System</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="tooltip tooltip-left" data-tip={user?.displayName}>
                            <img className='rounded-full w-6 h-6 md:w-10 md:h-10 mr-3' src={user?.photoURL} alt="User image" />
                        </div>
                        <button onClick={handleLogOUt} className='md:btn btn btn-neutral btn-sm'>Logout</button>
                    </> :
                        <Link to='/'>
                            <button className='md:btn md:btn-secondary btn-secondary py-1 px-2 rounded-md'>Login</button>
                        </Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;