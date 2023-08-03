import useTitle from "../../../hooks/useTitle";


const Home = () => {
    useTitle('Home');


    return (
        <div className='text-center mt-20'>
            <div>
                <h1 className='text-3xl font-bold mt-4'>Welcome to</h1>
                <h2 className='text-xl font-bold'>Task Management System</h2>
            </div>
        </div>
    );
};

export default Home;