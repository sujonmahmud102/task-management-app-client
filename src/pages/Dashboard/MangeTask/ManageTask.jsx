
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AiOutlineSearch } from 'react-icons/ai';


const ManageTask = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = event => {
        setSearchQuery(event.target.value)
    }

    const filteredItems = tasks.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetch('https://task-management-system-server-dun.vercel.app/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, []);

    // delete task
    const handleDeleteItem = _id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! & give feedback before deleting",
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

    // handle show description
    const handleFeedback = task => {
        Swal.fire({
            title: `${task.title}`,
            text: `${task.description}`,
        })
    }
    return (
        <div className='px-4 '>
            <h3 className="text-3xl text-center font-semibold mt-20 lg:mt-2 my-4">Total Tasks: {tasks.length}
            </h3>

            <div className='flex justify-center mb-8'>
                <div className="relative w-[90%] md:w-2/5">
                    <input onChange={handleSearch} value={searchQuery} type="text" placeholder="Search by task name" className="input input-bordered input-secondary w-full pl-8" />
                    <div className='absolute top-[14px] left-2 text-2xl text-gray-400'>
                        <AiOutlineSearch></AiOutlineSearch>
                    </div>
                </div>
            </div>


            <div className=" hidden lg:block lg:w-full mt-4">
                <div className="h-96 w-full overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="sticky top-0 bg-error font-bold w-full">
                            <tr className=''>
                                <th>#</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>User Email</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Assigned User</th>
                                <th>Feedback</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredItems.map((task, index) => (
                                    <tr className="divide-dashed" key={task._id}>
                                        <td>{index + 1}</td>

                                        <td>{task.title}</td>
                                        <td>
                                            <button
                                                onClick={() => handleFeedback(task)}
                                                className="btn btn-xs"
                                            >
                                                Click to see
                                            </button>
                                        </td>
                                        <td>{task.userEmail}</td>
                                        <td className="text-center">{task.dueDate} Days</td>
                                        <td>{task.status}</td>
                                        <td>{task.assignedUser}</td>
                                        <td>
                                            <button>Click to send</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteItem(task._id)}
                                                className="btn btn-xs btn-ghost text-white bg-red-500"
                                            >
                                                Delete Task
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* for mobile devices */}
            <div className='lg:hidden'>
                {
                    filteredItems.map(((task, index) =>
                        <div className="border-b-4 p-4" key={task._id}>
                            <div className='mt-3 flex gap-3'>{index + 1}. <span className='font-bold'>{task.title}</span>
                            </div>

                            <div className='flex gap-3 my-2'>
                                <p className='font-semibold'>Description:</p>
                                <button
                                    onClick={() => handleFeedback(task)}
                                    className="btn btn-xs"
                                >
                                    Click to see
                                </button>
                            </div>

                            <div className='my-2 '><span className='font-semibold'>Email:</span> {task.userEmail}</div>
                            <div className='my-2'><span className="font-semibold">Due Date:</span> {task.dueDate} Days</div>
                            <div className='my-2'><span className="font-semibold">Status:</span> {task.status}</div>
                            <div className='my-2'><span className="font-semibold">Assigned User:</span> {task.assignedUser}</div>

                            <div><span className="font-semibold">Feedback:</span> <button className='btn btn-xs'>Click to send </button>
                            </div>

                            <div className='my-2 '>
                                <span className="font-semibold">Delete: </span> <button
                                    onClick={() => handleDeleteItem(task._id)}
                                    className="btn btn-xs btn-ghost text-white bg-red-500"
                                >
                                    Click here
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ManageTask;