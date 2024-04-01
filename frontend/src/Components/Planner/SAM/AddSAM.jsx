import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Header from '../../ShareUI/Header';
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar';
import RightSideBarNav from '../RightSideBarNav';
import VerticalNavbar from '../VerticalNavbar';
import axios from 'axios';
function AddSAM() {
    const { user } = useSelector((state) => state.auth);
    const [workOrderNumber, setWorkOrderNumber] = useState('');
    const [garmentStyle, setGarmentStyle] = useState('');
    const [garmentQTY, setGamrentQTY] = useState(0);
    const [CustomerName, setCustomerName] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const AddSAM = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        axios.post('/addorder', {
            workOrderNumber: workOrderNumber,
            garmentStyle: garmentStyle,
            garmentQTY: garmentQTY,
            CustomerName: CustomerName,

        }, {
            headers: {

                'authorization': user.token
            }
        }
        ).then(res => {
            setLoading(false);
            setSuccess(res.data.message);
            setGamrentQTY(0);
            setGarmentStyle('');
            setCustomerName('');
            setWorkOrderNumber('');

        }).catch(err => {
            setLoading(false);
            setError(err.response.data.message);
        }).finally(() => {
            setLoading(false);
        }
        )
    }




    return (
        <div>

            <ProtectedNavBar />
            <main id="content" role="main" class="main">
                <div className='pt-5'>

                    <Header title={'Production SAM Generation Page'} />
                </div>
                <div class="content container" style={{ marginTop: "-20rem" }}>

                    <VerticalNavbar active={'addSam'} />
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
                                <h5 className="card-title">Add SAM Order</h5>
                            </div>
                            {
                                loading ?
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="card-body">
                                        <div className="row">
                                            <form onSubmit={AddSAM}>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="workOrderNumber">Work Order Number</label>
                                                        <input type="text" className="form-control" required id="workOrderNumber" placeholder="Work Order Number" value={workOrderNumber} onChange={(e) => setWorkOrderNumber(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="garmentStyle">Garment Style</label>
                                                        <select className="form-control" id="garmentStyle" required placeholder="Garment Style" value={garmentStyle} onChange={(e) => setGarmentStyle(e.target.value)}>
                                                            <option value="">Select Garment Style</option>
                                                            <option value="Sweat Shirt">Sweat Shirt</option>
                                                            <option value="Pull Over Hood">Pull Over Hood</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="garmentQTY">Garment QTY</label>
                                                        <input type="number" required className="form-control" id="garmentQTY" placeholder="Garment QTY" value={garmentQTY} onChange={(e) => setGamrentQTY(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="CustomerName">Customer Name</label>
                                                        <input type="text" required className="form-control" id="CustomerName" placeholder="Customer Name" value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} />
                                                    </div>

                                                </div>
                                                <div className="col-md-12">

                                                    <button className="btn btn-primary my-4" type='submit' >
                                                        Add
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                            }

                        </div>
                    </div>

                </div>
            </main>

            <RightSideBarNav />
        </div>
    )
}

export default AddSAM