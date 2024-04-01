import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const WashingProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth)
    
    return (
                 user && user.userRole==='washing' ? 
                 <Outlet/> :
                <Navigate to='/login'/>  
        
    );
}

export default WashingProtectedRoutes;