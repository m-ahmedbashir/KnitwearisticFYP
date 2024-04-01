import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

const EmbroderyProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        user && user.userRole === 'Embrodery' ?
            <Outlet /> :
            <Navigate to='/login' />

    );
}

export default EmbroderyProtectedRoutes;