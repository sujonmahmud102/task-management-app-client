
import Swal from "sweetalert2";
import useTitle from '../../../hooks/useTitle';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from "react";


const UpdateTask = () => {
    useTitle('Update Task');
    const task = useLoaderData();
    const [users, setUsers] = useState([]);

    const { _id, title, dueDate, status, assignedUser, description } = task;


    useEffect(() => {
        fetch('https://task-management-system-server-dun.vercel.app/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleUpdateTask = event => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const dueDate = form.dueDate.value;
        const status = form.status.value;
        const assignedUser = form.assignedUser.value;
        const description = form.description.value;


        const updatedTask = { title, dueDate, status, assignedUser, description };


        fetch(`https://task-management-system-server-dun.vercel.app/updateTask/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    form.reset();
                    Swal.fire({
                        title: 'Success',
                        text: 'Task updated successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }

            })
    }
    return (
        <div className="m-4 lg:m-24 bg-[#edeaed] rounded-lg p-8 items-center justify-center">
            <h3 className='text-3xl font-bold text-center mb-4'>Update Task</h3>
            <form onSubmit={handleUpdateTask}>

                {/* form first row */}
                <div className="w-3/4 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <label className="input-group input-group-vertical">
                            <input type="text" required defaultValue={title} name="title" placeholder="Enter task title" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <label className="input-group input-group-vertical">
                            <input type="text" required defaultValue={dueDate} name="dueDate" placeholder="Enter due date" className="input input-bordered" />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select name='status' required defaultValue={status} className="select select-bordered w-full">
                            <option value="" disabled selected>Select One</option>
                            <option value="Completed">Completed</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="In Progess">In Progess</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Assigned User</span>
                        </label>
                        <select name='assignedUser' required defaultValue={assignedUser} className="select select-bordered w-full">
                            <option value="" disabled selected>Select One</option>
                            {
                                users.map((user, i) => <option
                                    key={i}
                                    value={user.name}
                                    >
                                    {user.name}
                                </option>)
                            }
                        </select>
                    </div>
                </div>


                {/* form last row */}
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Task Description</span>
                    </label>
                    <label className="input-group input-group-vertical">
                        <textarea name="description" required defaultValue={description} placeholder="Enter task description" className="textarea textarea-bordered textarea-sm w-full" ></textarea>

                    </label>
                </div>
                {/* submit button */}
                <div className="text-center mt-4">
                    <input type="submit" name="" id="" value='Update Task' className="btn w-1/2 bg-blue-500 border-none" />
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;