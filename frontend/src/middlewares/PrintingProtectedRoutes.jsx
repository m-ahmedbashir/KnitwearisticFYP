import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrintingProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='printing' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default PrintingProtectedRoutes;