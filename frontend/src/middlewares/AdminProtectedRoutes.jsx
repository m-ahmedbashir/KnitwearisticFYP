import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        user && user.userRole === 'Admin' ?
            <Outlet /> :
            <Navigate to='/login' />

    );
}

export default AdminProtectedRoutes;