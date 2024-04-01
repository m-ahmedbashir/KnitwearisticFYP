import React,{useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar';
import Header from '../../ShareUI/Header';
import VerticalNavbar from '../VerticalNavbar';
import RightSideBarNav from '../RightSideBarNav';
import { Link } from 'react-router-dom';

function ShowCompanyCapcity() {
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [companyCapacity, setCompanyCapacity] = React.useState(0);
    const [companyCapacityThreshold, setCompanyCapacityThreshold] = React.useState('');
    const [companyEmployees, setCompanyEmployees] = React.useState(0);
    const [compnayDomain,setDomain] = React.useState('');
    const [companyName,setCompanyName] = React.useState('');
    const [companyEmail,setCompanyEmail] = React.useState('');
    const userData=useSelector((state)=>state.userData.value);
    console.log(userData);
    const GetCapacity=()=>{
        setLoading(true);
        setError('');
        setSuccess(false);
        axios.get('/showCapacity',{
            headers:{
                'email':userData.email
            }
        }).then(res=>{
            
            setLoading(false);
            setSuccess(res.data.capacity.message);
            setCompanyCapacity(res.data.capacity.companyCapacity);
            setCompanyCapacityThreshold(res.data.capacity.companyCapacityThreshold);
            setCompanyEmployees(res.data.capacity.companyEmployees);
            setDomain(res.data.capacity.companyDomain);
            setCompanyName(res.data.capacity.companyName);
            setCompanyEmail(res.data.capacity.companyEmail);

        }).catch(err=>{
            setLoading(false);
            setError(err.response.data.message);
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
      
       if(userData){
           GetCapacity();
       } 
    },[userData])
  return (
    <div>
         
          <ProtectedNavBar/>
            <main id="content" role="main" class="main">
             <div className='pt-5'>
            
             <Header title={'Show Company Capacity'} />
             </div>
              <div class="content container" style={{ marginTop: "-20rem" }}>
                  
                  <VerticalNavbar active={'capacityShow'} /> 
                    
                  <div className="card sidebar-detached-content mt-3 mt-lg-0">
                  <div className="card-header h-100">
                {
                    error && <div className="alert alert-danger">{error}</div>
                }
                {
                    loading?
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                     null

                }
                   <h4 className="card-header-title">
                   Company Capacity for Work Details
                   </h4>
                {
                    success?
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                    :
                    null
                }
            </div>
             {
                    companyCapacity?
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="companyCapacity">Company Capacity</label>
                                <input type="text" className="form-control" id="companyCapacity" value={companyCapacity} disabled/>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="companyCapacityThreshold">Company Capacity Threshold</label>
                                <input type="text" className="form-control" id="companyCapacityThreshold" value={companyCapacityThreshold} disabled/>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="companyEmployees">Company Employees</label>
                                <input type="text" className="form-control" id="companyEmployees" value={companyEmployees} disabled/>
                                </div>
    
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="companyDomain">Company Domain</label>
                                <input type="text" className="form-control" id="companyDomain" value={compnayDomain} disabled/>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" className="form-control" id="companyName" value={companyName} disabled/>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="companyEmail">Company Email</label>
                                <input type="text" className="form-control" id="companyEmail" value={companyEmail} disabled/>
                                </div>
                                </div>
                                </div>
    
                               
    
                </div>
                :
                <div className="text-center py-5 my-5">
                    <h4>No Data Found</h4>
                    <Link to='/app/addCapacaity' className='btn btn-primary '>
                        Add Company Details
                    </Link>
                </div>
             }
                 </div>
             
              </div>
          </main>
          
          <RightSideBarNav/>
        
    </div>
  )
}

export default ShowCompanyCapcity