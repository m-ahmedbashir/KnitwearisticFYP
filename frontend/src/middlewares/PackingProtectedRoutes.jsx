import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PackingProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='packing' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default PackingProtectedRoutes;