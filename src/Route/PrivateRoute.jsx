import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Authcontext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(Authcontext);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>
                    <progress className="progress w-56"></progress>
                </div>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
