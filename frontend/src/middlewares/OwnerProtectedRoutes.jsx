import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const OwnerProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        user && user.userRole === 'owner' ?
            <Outlet /> :
            <Navigate to='/login' />

    );
}

export default OwnerProtectedRoutes;