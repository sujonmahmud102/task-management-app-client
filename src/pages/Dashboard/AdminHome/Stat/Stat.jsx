import { useEffect, useState } from "react";


const Stat = () => {
  const [stats, setStats] = useState({})


  useEffect(() => {
    fetch('https://task-management-system-server-dun.vercel.app/admin-stats')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  return (
    <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:flex gap-5">


      <div className="shadow rounded-lg p-4">
        <div className="">Total Users</div>
        <div className="text-xl md:text-5xl font-bold ">{stats.users}</div>
      </div>

      <div className="shadow rounded-lg p-4">
        <div className="">Total Tasks</div>
        <div className="text-xl md:text-5xl font-bold ">{stats.tasks}</div>
      </div>

      <div className="shadow rounded-lg p-4">
        <div className=""> Completed</div>
        <div className="text-xl md:text-5xl font-bold ">{stats.completedTask} </div>
      </div>


      <div className="shadow rounded-lg p-4">
        <div className=""> Incompleted</div>
        <div className="text-xl md:text-5xl font-bold ">{stats.IncompletedTask} </div>
      </div>


      <div className="shadow rounded-lg p-4">
        <div className=""> In Progess</div>
        <div className="text-xl md:text-5xl font-bold ">{stats.InProgessTask} </div>
      </div>
    </div>
  );
};

export default Stat;