
import { useContext, useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle';
import { Authcontext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyAddedTasks = () => {
    useTitle('My Added Tasks');
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(Authcontext);



    useEffect(() => {
        fetch(`https://task-management-system-server-dun.vercel.app/tasks?userEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [user]);

    // delete task
    const handleDeleteItem = _id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://task-management-system-server-dun.vercel.app/task/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your task has been deleted.',
                                'success'
                            );
                            const remaining = tasks.filter(task => task._id !== _id);
                            setTasks(remaining);
                        }
                    })
            }
        })
    }

    return (
        <div className=''>

            {
                tasks.length === 0 && <h2 className='text-center text-3xl font-semibold italic mt-20'>Empty </h2>
            }

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-8'>
                {
                    tasks.map((task, index) => <div key={index}>

                        <div className={`card w-full h-96 bg-base-100 shadow-xl border border-error`}>

                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <div className='flex items-center justify-between text-sm'>
                                    <p>Due Date: {task.dueDate} Days</p>
                                    <p>Status: {task.status} </p>
                                </div>
                                <p>Assigned User: {task.assignedUser} </p>

                                <div>
                                    <p>Description:</p>
                                    <p className='text-justify overflow-y-auto sm:h-36 h-32 border rounded-md p-1'>{task.description} </p>
                                </div>



                                <div className="flex justify-center gap-3">
                                    <button className="btn btn-sm btn-ghost text-white bg-blue-500">
                                        <Link to={`/updateTask/${task._id}`}>Update Task</Link>
                                    </button>
                                    <button onClick={() => handleDeleteItem(task._id)} className="btn btn-sm btn-ghost text-white bg-red-500">
                                        Delete Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>


        </div>
    );
};

export default MyAddedTasks;