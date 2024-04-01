import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const CuttingProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='cutting' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default CuttingProtectedRoutes;