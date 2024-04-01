import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const StichingProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='stiching' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default StichingProtectedRoutes;