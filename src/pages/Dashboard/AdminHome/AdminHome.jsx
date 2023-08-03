import useTitle from "../../../hooks/useTitle";
import BarChart from "./BarChart/BarChart";
import PieChart from "./PieChart/PieChart";
import Stat from "./Stat/Stat";


const AdminHome = () => {
    useTitle('Dashboard');


    return (
        <div>
            <Stat />

            <div className="lg:flex justify-between mt-5">
                <BarChart />
                <div>
                    <p>A = Completed</p>
                    <p>B = Incompleted</p>
                    <p>C = In Progess</p>
                </div>
                <PieChart />
            </div>
        </div>
    );
};

export default AdminHome;