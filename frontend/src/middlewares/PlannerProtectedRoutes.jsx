import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PlannerProtectedRoute = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        user && user.userRole === 'planner' ?
            <Outlet /> :
            <Navigate to='/login' />

    );
}

export default PlannerProtectedRoute;