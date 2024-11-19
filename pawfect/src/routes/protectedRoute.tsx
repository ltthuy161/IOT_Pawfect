import React from 'react'
import { UserAuth } from '../context/AuthContext';
import router  from '../routes/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = UserAuth();
    console.log(window.location.pathname)
    console.log(user);
    if (!user && window.location.pathname === router.basename) {
        router.navigate('/authentication/login');   
        return null;
    }

    return children;
};

export default ProtectedRoute;
