import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { useSelector } from 'react-redux';
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'

function UpdateActivity() {

  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const params = useParams();
  const [activity, setActivity] = useState({

    merchandizer: '',
    customer: '',
    leadingPerson: '',
    CustomerProductOrder: '',
    category: '',
    productStyle: '',
    Emblishment: '',
    garmentPicture: '',
    price: 0,
    quantity: 0,
    bulkTesting: false,
    ApprovalDate: '',
    ApprovalStatus: '',
    cuttingStatus: '',
    cuttingQuantity: 0,
    cuttingLoad: 0,
    cuttingDate: '',
    stichQuantity: 0,
    stichLoad: 0,
    StichStatus: '',
    StichDate: '',
    printQuantity: 0,
    printLoad: 0,
    printStatus: '',
    printDate: '',
    emblimentQuantity: 0,
    emblimentLoad: 0,
    emblimentStatus: '',
    emblimentDate: '',
    washingQuantity: 0,
    washingLoad: 0,
    washingStatus: '',
    washingDate: '',
    packingQuantity: 0,
    packingLoad: 0,
    packingStatus: '',
    packingDate: '',

    finishingQuantity: 0,
    finishingLoad: 0,
    finishingStatus: '',
    finishingDate: '',

  });
  const getActivity = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/showAcitvity/${params.id}`, {
        headers: {
          'authorization': token
        }

      })
      setActivity(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  //handlechange
  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  }

  const updateRecord = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/updateAcitvity', activity, {
        headers: {
          'id': params.id,
          "authorization": token
        }
      });
      setSuccess(response.data.message);

      setLoading(false);
    }
    catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }

  }

  useEffect(() => {

    if (user) {
      getActivity();
    }



  }, [user]);

  return (
    <>

      <ProtectedNavBar />
      <main id="content" role="main" class="main bg-light">
        <div className="pt-5">
          <Header title={'Activities Page'} />
        </div>

        <div className="content container" style={{ marginTop: "-20rem" }}>
          <VerticalNavbar active={'showSam'} />
          <div className="row card  px-5  py-5 sidebar-detached-content mt-3 mt-lg-0">

            {
              success && <div className="alert alert-success">{success}</div>
            }
            {
              error && <div className="alert alert-danger">{error}</div>
            }
            {
              loading && <div className="alert alert-info">Loading...</div>
            }
            <div className="tex-center">
              <h1 className='py-5'>
                Update Activity
              </h1>
            </div>

            <div className="form-group">
              <label htmlFor="merchandizer">Merchandizer</label>
              <input type="text" className="form-control" id="merchandizer" name="merchandizer" onChange={handleChange} placeholder={activity.merchandizer} />
            </div>
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <input type="text" className="form-control" id="customer" name="customer" onChange={handleChange} placeholder={activity.customer} />
            </div>
            <div className="form-group">
              <label htmlFor="leadingPerson">Leading Person</label>
              <input type="text" className="form-control" id="leadingPerson" name="leadingPerson" onChange={handleChange} placeholder={activity.leadingPerson} />
            </div>
            <div className="form-group">
              <label htmlFor="CustomerProductOrder">Customer Product Order</label>
              <input type="text" className="form-control" id="CustomerProductOrder" name="CustomerProductOrder" onChange={handleChange} placeholder={activity.CustomerProductOrder} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type="text" className="form-control" id="category" name="category" onChange={handleChange} placeholder={activity.category} />
            </div>
            <div className="form-group">
              <label htmlFor="productStyle">Product Style</label>
              <input type="text" className="form-control" id="productStyle" name="productStyle" onChange={handleChange} placeholder={activity.productStyle} />
            </div>
            <div className="form-group">
              <label htmlFor="Emblishment">Emblishment</label>
              <input type="text" className="form-control" id="Emblishment" name="Emblishment" onChange={handleChange} placeholder={activity.Emblishment} />
            </div>
            <div className="form-group">
              <label htmlFor="garmentPicture">Garment Picture</label>
              <input type="text" className="form-control" id="garmentPicture" name="garmentPicture" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" name="price" onChange={handleChange} placeholder={activity.price} />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input type="text" className="form-control" id="quantity" name="quantity" onChange={handleChange} placeholder={activity.quantity} />
            </div>
            <div className="form-group">
              <label htmlFor="bulkTesting">Bulk Testing</label>
              <input type="text" className="form-control" id="bulkTesting" name="bulkTesting" onChange={handleChange} placeholder={activity.bulkTesting} />
            </div>
            <div className="form-group">
              <label htmlFor="ApprovalDate">Approval Date</label>
              <input type="text" className="form-control" id="ApprovalDate" name="ApprovalDate" onChange={handleChange} placeholder={activity.ApprovalDate} />
            </div>
            <div className="form-group">
              <label htmlFor="ApprovalStatus">Approval Status</label>
              <input type="text" className="form-control" id="ApprovalStatus" name="ApprovalStatus" onChange={handleChange} placeholder={activity.ApprovalStatus} />
            </div>
            <div className="form-group">
              <label htmlFor="cuttingStatus">Cutting Status</label>
              <input type="text" className="form-control" id="cuttingStatus" name="cuttingStatus" onChange={handleChange} placeholder={activity.cuttingStatus} />
            </div>
            <div className="form-group">
              <label htmlFor="cuttingDate">Cutting Date</label>
              <input type="text" className="form-control" id="cuttingDate" name="cuttingDate" onChange={handleChange} placeholder={activity.cuttingDate} />
            </div>
            <div className="form-group">
              <label htmlFor="cuttingQuantity">Cutting Quantity</label>
              <input type="text" className="form-control" id="cuttingQuantity" name="cuttingQuantity" onChange={handleChange} placeholder={activity.cuttingQuantity} />
            </div>
            <div className="form-group">
              <label htmlFor="cuttingLoad">Cutting Load</label>
              <input type="text" className="form-control" id="cuttingLoad" name="cuttingLoad" onChange={handleChange} placeholder={activity.cuttingLoad} />
            </div>
            <div className="form-group">
              <label htmlFor="stichQuantity">stichQuantity</label>
              <input type="text" className="form-control" id="stichQuantity" name="stichQuantity" onChange={handleChange} placeholder={activity.stichQuantity} />
            </div>
            <div className="form-group">
              <label htmlFor="stichLoad">stichLoad</label>
              <input type="text" className="form-control" id="stichLoad" name="stichLoad" onChange={handleChange} placeholder={activity.stichLoad} />
            </div>
            <div className="form-group">
              <label htmlFor="stichDate">stichDate</label>
              <input type="text" className="form-control" id="stichDate" name="stichDate" onChange={handleChange} placeholder={activity.StichDate} />
            </div>
            <div className="form-group">
              <label htmlFor="stichStatus">stichStatus</label>
              <input type="text" className="form-control" id="stichStatus" name="stichStatus" onChange={handleChange} placeholder={activity.StichStatus} />
            </div>
            <div className="form-group">
              <label htmlFor="printQuantity">printQuantity</label>
              <input type="text" className="form-control" id="printQuantity" name="printQuantity" onChange={handleChange} placeholder={activity.printQuantity} />
            </div>
            <div className="form-group">
              <label htmlFor="printLoad">printLoad</label>
              <input type="text" className="form-control" id="printLoad" name="printLoad" onChange={handleChange} placeholder={activity.printLoad} />
            </div>
            <div className="form-group">
              <label htmlFor="printDate">printDate</label>
              <input type="text" className="form-control" id="printDate" name="printDate" onChange={handleChange} placeholder={activity.printDate} />
            </div>
            <div className="form-group">
              <label htmlFor="printStatus">printStatus</label>
              <input type="text" className="form-control" id="printStatus" name="printStatus" onChange={handleChange} placeholder={activity.printStatus} />
            </div>
            <div className="form-group">
              <label htmlFor="packingQuantity">packingQuantity</label>
              <input type="text" className="form-control" id="packingQuantity" name="packingQuantity" onChange={handleChange} placeholder={activity.packingQuantity} />
            </div>
            <div className="form-group">
              <label htmlFor="packingLoad">packingLoad</label>
              <input type="text" className="form-control" id="packingLoad" name="packingLoad" onChange={handleChange} placeholder={activity.packingLoad} />
            </div>
            <div className="form-group">
              <label htmlFor="packingDate">packingDate</label>
              <input type="text" className="form-control" id="packingDate" name="packingDate" onChange={handleChange} placeholder={activity.packingDate} />
            </div>
            <div className="form-group">
              <label htmlFor="packingStatus">packingStatus</label>
              <input type="text" className="form-control" id="packingStatus" name="packingStatus" onChange={handleChange} placeholder={activity.packingStatus} />
            </div>
            <div className="form-group">
              <label htmlFor="finishingQuantity">finishingQuantity</label>
              <input type="text" className="form-control" id="finishingQuantity" name="finishingQuantity" onChange={handleChange} placeholder={activity.finishingQuantity} />
            </div>
            <div className="form-group">
              <label htmlFor="finishingLoad">finishingLoad</label>
              <input type="text" className="form-control" id="finishingLoad" name="finishingLoad" onChange={handleChange} placeholder={activity.finishingLoad} />
            </div>
            <div className="form-group">
              <label htmlFor="finishingDate">finishingDate</label>
              <input type="text" className="form-control" id="finishingDate" name="finishingDate" onChange={handleChange} placeholder={activity.finishingDate} />
            </div>
            <div className="form-group">
              <label htmlFor="finishingStatus">finishingStatus</label>
              <input type="text" className="form-control" id="finishingStatus" name="finishingStatus" onChange={handleChange} placeholder={activity.finishingStatus} />
            </div>
            <div className="d-grid my-4" >
              <button className='btn btn-primary' onClick={updateRecord}>
                Save
              </button>

            </div>



          </div>
        </div>
      </main>




    </>
  )
}

export default UpdateActivity