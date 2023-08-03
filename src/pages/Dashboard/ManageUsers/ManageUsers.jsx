
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch(`https://task-management-system-server-dun.vercel.app/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [users]);

    // handle making admin
    const handleMakeAdmin = user => {
        fetch(`https://task-management-system-server-dun.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ isAdmin: true })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const remaining = users.filter(u => u._id !== user._id);
                    setUsers(remaining);
                }
            })
    }

    return (
        <div className='w-full px-8 lg:px-16'>

            <h3 className="text-3xl  text-center font-semibold mt-20 lg:mt-2 my-4">Total Users: {users.length}</h3>

            <div className="hidden lg:block overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold text-lg'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Image</th>
                            <th className=''>Name</th>
                            <th className=''>Email</th>
                            <th>Role</th>
                            <th className='text-center'> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr className='divide-dashed '
                                key={user._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <img className='w-12 h-12 rounded-xl' src={user.photo} alt="" />
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role ? user.role : 'User'}
                                </td>
                                <td className="text-center">
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm rounded-md btn-ghost bg-error  text-white">Make Admin</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            {/* for mobile devices */}
            <div className='lg:hidden'>
                {
                    users.map((user, index) => <div className='border-b-4 py-3'
                        key={user._id}
                    >
                        <div className='flex items-center text-2xl'>
                            {index + 1}. 
                            <span className=' font-medium ml-3'> {user.name}</span>
                            <img className='w-8 h-8 rounded-full ml-6' src={user.photo} alt="" />
                        </div>

                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Email:</span> {user.email}
                        </div>
                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Role:</span>  {user.role ? user.role : 'User'}
                        </div>
                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Action:</span>
                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs rounded-md btn-ghost bg-error  text-white">Make Admin</button>
                        </div>

                    </div>)
                }
            </div >
        </div>
    );
};

export default ManageUsers;