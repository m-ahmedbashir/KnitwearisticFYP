import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar';
import Header from '../../ShareUI/Header';
import VerticalNavbar from '../VerticalNavbar';
import RightSideBarNav from '../RightSideBarNav';
function CapacityAdd() {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [companyCapacity, setCompanyCapacity] = React.useState(0);
  const [companyCapacityThreshold, setCompanyCapacityThreshold] = React.useState('');
  const [companyEmployees, setCompanyEmployees] = React.useState(0);
  const [compnayDomain, setDomain] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [companyEmail, setCompanyEmail] = React.useState('');
  const userData = useSelector((state) => state.userData.value);
  const AddCapacity = () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    axios.post('/addCapacity', {
      companyCapacity: companyCapacity,
      companyCapacityThreshold: companyCapacityThreshold,
      companyEmployees: companyEmployees,
      companyDomain: compnayDomain,
      companyName: companyName,
      companyEmail: companyEmail

    }).then(res => {
      setLoading(false);
      setSuccess(res.data.message);
    }).catch(err => {
      setLoading(false);
      setError(err.response.data.message);
    }).finally(() => {
      setLoading(false);

    }
    )
  }

  useEffect(() => {
    if (userData) {
      setDomain(userData.companyDomain);
      setCompanyName(userData.companyName);
      setCompanyEmail(userData.email);
    }
  }, [userData])


  return (
    <div>

      <ProtectedNavBar />

      <main id="content" role="main" class="main">
        <div className='pt-5'>
          <Header title={'Add Company Capacity Details'} />
        </div>
        <div class="content container" style={{ marginTop: "-20rem" }}>

          <VerticalNavbar active={'capacityAdd'} />
          {
            loading ?
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              :
              <div className='sidebar-detached-content mt-3 mt-lg-0'>
                <div className="card">
                  <div className="card-header">
                    {
                      success ?
                        <div className="alert alert-success">
                          {success}
                        </div>
                        :
                        null
                    }
                    {
                      error ?
                        <div className="alert alert-danger">
                          {error}
                        </div>
                        :
                        null
                    }
                    <h5 className="card-title">Add Capacity</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">

                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Capacity</label>
                          <input type="number" className="form-control" value={companyCapacity} onChange={(e) => setCompanyCapacity(e.target.value)} min={10} required />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Capacity Threshold</label>
                          <input type="number" className="form-control" value={companyCapacityThreshold} onChange={(e) => setCompanyCapacityThreshold(e.target.value)} min={10} required />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Employees</label>
                          <input type="number" className="form-control" value={companyEmployees} onChange={(e) => setCompanyEmployees(e.target.value)} min={10} required />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Domain</label>
                          <input type="text" className="form-control" value={compnayDomain} onChange={(e) => setDomain(e.target.value)} readOnly />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} readOnly />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Company Email</label>
                          <input type="text" className="form-control" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} readOnly />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group my-3">
                          <button className="btn btn-primary" onClick={AddCapacity}>Add Capacity</button>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
              </div>
          }




        </div>


      </main>

      <RightSideBarNav />
    </div>
  )
}

export default CapacityAdd