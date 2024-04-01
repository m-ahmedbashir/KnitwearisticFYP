import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const InductionProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='induction' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default InductionProtectedRoutes;