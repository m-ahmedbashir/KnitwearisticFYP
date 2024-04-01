import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../ShareUI/Header';


function SubUserUpdate() {

    const { user } = useSelector((state) => state.auth);
    const token = user.token;
    const params = useParams();

    const [merchandizer, setMerchandizer] = useState('');
    const [customer, setCustomer] = useState('');
    const [leadingPerson, setLeadingPerson] = useState('');
    const [CustomerProductOrder, setCustomerProductOrder] = useState('');
    const [category, setCategory] = useState('');
    const [productStyle, setProductStyle] = useState('');
    const [Emblishment, setEmblishment] = useState('');
    const [garmentPicture, setGarmentPicture] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [bulkTesting, setBulkTesting] = useState(false);
    const [ApprovalDate, setApprovalDate] = useState('');
    const [ApprovalStatus, setApprovalStatus] = useState('');
    const [cuttingStatus, setCuttingStatus] = useState('');
    const [cuttingQuantity, setCuttingQuantity] = useState(0);
    const [cuttingLoad, setCuttingLoad] = useState(0);
    const [cuttingDate, setCuttingDate] = useState('');
    const [stichQuantity, setStichQuantity] = useState(0);
    const [stichLoad, setStichLoad] = useState(0);
    const [StichStatus, setStichStatus] = useState('');
    const [StichDate, setStichDate] = useState('');
    const [printQuantity, setPrintQuantity] = useState(0);
    const [printLoad, setPrintLoad] = useState(0);
    const [printStatus, setPrintStatus] = useState('');
    const [printDate, setPrintDate] = useState('');
    const [emblimentQuantity, setEmblimentQuantity] = useState(0);
    const [emblimentLoad, setEmblimentLoad] = useState(0);
    const [emblimentStatus, setEmblimentStatus] = useState('');
    const [emblimentDate, setEmblimentDate] = useState('');
    const [washingQuantity, setWashingQuantity] = useState(0);
    const [washingLoad, setWashingLoad] = useState(0);
    const [washingStatus, setWashingStatus] = useState('');
    const [washingDate, setWashingDate] = useState('');
    const [packingQuantity, setPackingQuantity] = useState(0);
    const [packingLoad, setPackingLoad] = useState(0);
    const [packingStatus, setPackingStatus] = useState('');
    const [packingDate, setPackingDate] = useState('');
    const [finishingQuantity, setFinishingQuantity] = useState(0);
    const [finishingLoad, setFinishingLoad] = useState(0);
    const [finishingStatus, setFinishingStatus] = useState('');
    const [finishingDate, setFinishingDate] = useState('');

    const getActivity = () => {
        try {
            axios.get(`/showAcitvity/${params.id}`, {
                headers: {
                    'authorization': token
                }

            }).then(res => {
                setMerchandizer(res.data.merchandizer);
                setCustomer(res.data.customer);
                setLeadingPerson(res.data.leadingPerson);
                setCustomerProductOrder(res.data.customerProductOrder);
                setCategory(res.data.category);
                setProductStyle(res.data.productStyle);
                setEmblishment(res.data.emblishment);
                setGarmentPicture(res.data.garmentPicture);
                setPrice(res.data.price);
                setQuantity(res.data.quantity);
                setBulkTesting(res.data.bulkTesting);
                setApprovalDate(res.data.approvalDate);
                setApprovalStatus(res.data.approvalStatus);
                setCuttingStatus(res.data.cuttingStatus);
                setCuttingQuantity(res.data.cuttingQuantity);
                setCuttingLoad(res.data.cuttingLoad);
                setCuttingDate(res.data.cuttingDate);
                setStichQuantity(res.data.stichQuantity);
                setStichLoad(res.data.stichLoad);
                setStichStatus(res.data.stichStatus);
                setStichDate(res.data.stichDate);
                setPrintQuantity(res.data.printQuantity);
                setPrintLoad(res.data.printLoad);
                setPrintStatus(res.data.printStatus);
                setPrintDate(res.data.printDate);
                setEmblimentQuantity(res.data.emblimentQuantity);
                setEmblimentLoad(res.data.emblimentLoad);
                setEmblimentStatus(res.data.emblimentStatus);
                setEmblimentDate(res.data.emblimentDate);
                setWashingQuantity(res.data.washingQuantity);
                setWashingLoad(res.data.washingLoad);
                setWashingStatus(res.data.washingStatus);
                setWashingDate(res.data.washingDate);
                setPackingQuantity(res.data.packingQuantity);
                setPackingLoad(res.data.packingLoad);
                setPackingStatus(res.data.packingStatus);
                setPackingDate(res.data.packingDate);
                setFinishingQuantity(res.data.finishingQuantity);
                setFinishingLoad(res.data.finishingLoad);
                setFinishingStatus(res.data.finishingStatus);
                setFinishingDate(res.data.finishingDate);
            }).catch(err => {
                console.log(err);
            }
            )


        } catch (error) {
            console.log(error)
        }
    }
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    //handlechange
    const handleChange = (e) => {

        const { name, value } = e.target;
        switch (name) {
            case 'merchandizer':
                setMerchandizer(value);
                break;
            case 'customer':
                setCustomer(value);
                break;
            case 'leadingPerson':
                setLeadingPerson(value);
                break;
            case 'customerProductOrder':
                setCustomerProductOrder(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'productStyle':
                setProductStyle(value);
                break;
            case 'emblishment':
                setEmblishment(value);
                break;
            case 'garmentPicture':
                setGarmentPicture(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'bulkTesting':
                setBulkTesting(value);
                break;
            case 'approvalDate':
                setApprovalDate(value);
                break;
            case 'approvalStatus':
                setApprovalStatus(value);
                break;
            case 'cuttingStatus':
                setCuttingStatus(value);
                break;
            case 'cuttingQuantity':
                setCuttingQuantity(value);
                break;
            case 'cuttingLoad':
                setCuttingLoad(value);
                break;
            case 'cuttingDate':
                setCuttingDate(value);
                break;
            case 'stichQuantity':
                setStichQuantity(value);
                break;
            case 'stichLoad':
                setStichLoad(value);
                break;
            case 'stichStatus':

                setStichStatus(value);
                break;
            case 'stichDate':
                setStichDate(value);
                break;
            case 'printQuantity':
                setPrintQuantity(value);
                break;
            case 'printLoad':
                setPrintLoad(value);
                break;
            case 'printStatus':
                setPrintStatus(value);
                break;
            case 'printDate':
                setPrintDate(value);
                break;
            case 'emblimentQuantity':
                setEmblimentQuantity(value);
                break;
            case 'emblimentLoad':
                setEmblimentLoad(value);
                break;
            case 'emblimentStatus':
                setEmblimentStatus(value);
                break;
            case 'emblimentDate':
                setEmblimentDate(value);
                break;
            case 'washingQuantity':
                setWashingQuantity(value);
                break;
            case 'washingLoad':
                setWashingLoad(value);
                break;
            case 'washingStatus':
                setWashingStatus(value);
                break;
            case 'washingDate':
                setWashingDate(value);
                break;
            case 'packingQuantity':
                setPackingQuantity(value);
                break;
            case 'packingLoad':
                setPackingLoad(value);
                break;
            case 'packingStatus':
                setPackingStatus(value);
                break;
            case 'packingDate':
                setPackingDate(value);
                break;
            case 'finishingQuantity':
                setFinishingQuantity(value);
                break;
            case 'finishingLoad':
                setFinishingLoad(value);
                break;
            case 'finishingStatus':
                setFinishingStatus(value);
                break;
            case 'finishingDate':
                setFinishingDate(value);
                break;
            default:
                break;
        }
    }
    //cutting status
    const cuttingStatusChange = (e) => {
        setCuttingStatus(e.target.value);
    }



    const updateRecord = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/updateAcitvity', {
                merchandizer,
                customer,
                leadingPerson,
                CustomerProductOrder,
                category,
                productStyle,
                Emblishment,
                garmentPicture,
                price,
                quantity,
                bulkTesting,
                ApprovalDate,
                ApprovalStatus,
                cuttingStatus,
                cuttingQuantity,
                cuttingLoad,
                cuttingDate,
                stichQuantity,
                stichLoad,
                stichQuantity,
                StichDate,
                printQuantity,
                printLoad,
                printStatus,
                printDate,
                emblimentQuantity,
                emblimentLoad,
                emblimentStatus,
                emblimentDate,
                washingQuantity,
                washingLoad,
                washingStatus,
                washingDate,
                packingQuantity,
                packingLoad,
                packingStatus,
                packingDate,
                finishingQuantity,
                finishingLoad,
                finishingStatus,
                finishingDate,


            }, {
                headers: {
                    'id': params.id,
                    "authorization": token
                }
            });
            if (response.status === 200) {
                setSuccess('Activity Updated Successfully');
                setLoading(false);
            }

            setLoading(false);
        }
        catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }

    }

    useEffect(() => {


        getActivity();




    }, []);

    return (
        <>


            <main id="content" role="main" class="main bg-light">
                <div className="pt-5">
                    <Header title={'Activities Page'} />
                </div>

                <div className="content container" style={{ marginTop: "-20rem" }}>
                    <div className="row">
                        <div className="col-xl-4">
                            <div class="card">
                                <div className="card-img-top" style={{ marginTop: "90px", marginLeft: "130px" }}>
                                    <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar" for="editAvatarUploaderModal">
                                        <img id="editAvatarImgModal" class="avatar-img text-center" src={user.url ? user.url : "https://firebasestorage.googleapis.com/v0/b/images-107c9.appspot.com/o/dummy.png?alt=media&token=4ab4c4bf-616d-4133-b36d-c82d4c023125"} alt="Image Description" />
                                        <span class="avatar-uploader-trigger">
                                            <i class="bi-diamond-fill avatar-uploader-icon shadow-sm"></i>
                                        </span>
                                    </label>
                                </div>
                                <div class="card-header ">
                                    <div class="text-center ">

                                        <h1 class="page-header-title ">{user.name} <i class="bi-patch-check-fill fs-2 text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></h1>
                                        <ul class="list-inline px-5">
                                            <li class="list-inline-item">
                                                <i class="bi-building me-1"></i>
                                                <span>{user.companyName}</span>
                                            </li>



                                            <li class="list-inline-item">
                                                <i class="bi-calendar-week me-1"></i>
                                                <span>{user.createdAt.slice(0, 10)}</span>
                                            </li>
                                        </ul>

                                    </div>





                                </div>

                                <div class="card-body">
                                    <p>
                                        You are currently logged in as <strong>{user && user.userRole}</strong>.


                                    </p>

                                    <ul class="list-group list-group-flush list-group-no-gutters">
                                        <li class="list-group-item">
                                            <h5 class="card-title">Your Current Subscription</h5>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-flex">

                                                <div class="flex-grow-1 ms-3">
                                                    <div class="row align-items-center">
                                                        <div class="col">
                                                            <h5 class="mb-0">
                                                                <span class="d-block fs-6 text-body">Company Name</span>
                                                            </h5>

                                                        </div>
                                                        <div className="col">
                                                            <span className="badge bg-primary">
                                                                {
                                                                    user && user.companyName
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-flex">

                                                <div class="flex-grow-1 ms-3">
                                                    <div class="row align-items-center">
                                                        <div class="col">
                                                            <h5 class="mb-0">
                                                                <span class="d-block fs-6 text-body">Sub Users</span>
                                                            </h5>

                                                        </div>
                                                        <div className="col">
                                                            <span className="badge bg-primary">
                                                                {
                                                                    user && user.numberOfSubUsers
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-flex">

                                                <div class="flex-grow-1 ms-3">
                                                    <div class="row align-items-center">
                                                        <div class="col">
                                                            <h5 class="mb-0">
                                                                <span class="d-block fs-6 text-body">Company Capacity</span>
                                                            </h5>

                                                        </div>
                                                        <div className="col">
                                                            <span className="badge bg-primary">
                                                                {
                                                                    user && user.capacity
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item">
                                            <div class="d-flex">

                                                <div class="flex-grow-1 ms-3">
                                                    <div class="row align-items-center">
                                                        <div class="col">
                                                            <h5 class="mb-0">
                                                                <span class="d-block fs-6 text-body">Subscription Plan</span>
                                                            </h5>

                                                        </div>
                                                        <div className="col">
                                                            <span className="badge bg-primary">
                                                                {
                                                                    user && user.plan
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="d-flex">

                                                <div class="flex-grow-1 ms-3">
                                                    <div class="row align-items-center">
                                                        <div class="col">
                                                            <h5 class="mb-0">
                                                                <span class="d-block fs-6 text-body">Subscription Plan ending on</span>
                                                            </h5>

                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col">
                                                <span className="badge bg-primary">
                                                    {
                                                        user && user.TrialEnded.split(0, 30)
                                                    }

                                                </span>

                                            </div>
                                        </li>


                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card  px-5  py-5  mt-3 mt-lg-0">

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
                                        Add Order Activity
                                    </h1>
                                </div>


                                < >
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="merchandizer" name="merchandizer" onChange={handleChange} placeholder={merchandizer} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="customer" name="customer" onChange={handleChange} placeholder={customer} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="leadingPerson" name="leadingPerson" onChange={handleChange} placeholder={leadingPerson} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="CustomerProductOrder">Customer Product Order</label>
                                        <input type="text" className="form-control" id="CustomerProductOrder" name="CustomerProductOrder" onChange={handleChange} placeholder={CustomerProductOrder} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input type="text" className="form-control" id="category" name="category" onChange={handleChange} placeholder={category} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="productStyle">Product Style</label>
                                        <input type="text" className="form-control" id="productStyle" name="productStyle" onChange={handleChange} placeholder={productStyle} disabled />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="Emblishment" name="Emblishment" onChange={handleChange} placeholder={Emblishment} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="garmentPicture" name="garmentPicture" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="price" name="price" onChange={handleChange} placeholder={price} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="quantity" name="quantity" onChange={handleChange} placeholder={quantity} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="bulkTesting" name="bulkTesting" onChange={handleChange} placeholder={bulkTesting} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="ApprovalDate" name="ApprovalDate" onChange={handleChange} placeholder={ApprovalDate} />
                                    </div>
                                    <div className="form-group">

                                        <input type="hidden" className="form-control" id="ApprovalStatus" name="ApprovalStatus" onChange={handleChange} placeholder={ApprovalStatus} />
                                    </div>
                                    {
                                        user && user.userRole === 'cutting' ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="cuttingStatus">Cutting Status</label>
                                                    <input type="text" className="form-control" id="cuttingStatus" name="cuttingStatus" onChange={handleChange} placeholder={cuttingStatus} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cuttingDate">Cutting Date</label>
                                                    <input type="date" className="form-control" id="cuttingDate" name="cuttingDate" onChange={handleChange} placeholder={cuttingDate} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cuttingQuantity">Cutting Quantity</label>
                                                    <input type="number" className="form-control" id="cuttingQuantity" name="cuttingQuantity" onChange={handleChange} placeholder={cuttingQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="cuttingLoad">Cutting Load</label>
                                                    <input type="number" className="form-control" id="cuttingLoad" name="cuttingLoad" onChange={handleChange} placeholder={cuttingLoad} />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        user && user.userRole === "stitch" ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="stichQuantity">Stitch Quantity</label>
                                                    <input type="number" className="form-control" id="stichQuantity" name="stichQuantity" onChange={handleChange} placeholder={stichQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="stichLoad">Stitch Load</label>
                                                    <input type="number" className="form-control" id="stichLoad" name="stichLoad" onChange={handleChange} placeholder={stichLoad} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="stichDate">Stitch Date</label>
                                                    <input type="date" className="form-control" id="stichDate" name="stichDate" onChange={handleChange} placeholder={StichDate} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="stichStatus">Stitch Status</label>
                                                    <input type="text" className="form-control" id="stichStatus" name="stichStatus" onChange={handleChange} placeholder={StichStatus} />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        user && user.userRole === 'printing' ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="printQuantity">Print Quantity</label>
                                                    <input type="number" className="form-control" id="printQuantity" name="printQuantity" onChange={handleChange} placeholder={printQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="printLoad">Print Load</label>
                                                    <input type="number" className="form-control" id="printLoad" name="printLoad" onChange={handleChange} placeholder={printLoad} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="printDate">Print Date</label>
                                                    <input type="date" className="form-control" id="printDate" name="printDate" onChange={handleChange} placeholder={printDate} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="printStatus">Print Status</label>
                                                    <input type="text" className="form-control" id="printStatus" name="printStatus" onChange={handleChange} placeholder={printStatus} />
                                                </div>
                                            </>
                                            :
                                            null
                                    }

                                    {
                                        user && user.userRole === 'packing' ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="packingQuantity">Packing Quantity</label>
                                                    <input type="number" className="form-control" id="packingQuantity" name="packingQuantity" onChange={handleChange} placeholder={packingQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="packingLoad">Packing Load</label>
                                                    <input type="number" className="form-control" id="packingLoad" name="packingLoad" onChange={handleChange} placeholder={packingLoad} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="packingDate">Packing Date</label>
                                                    <input type="date" className="form-control" id="packingDate" name="packingDate" onChange={handleChange} placeholder={packingDate} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="packingStatus">Packing Status</label>
                                                    <input type="text" className="form-control" id="packingStatus" name="packingStatus" onChange={handleChange} placeholder={packingStatus} />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        user && user.userRole === 'finishing' ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="finishingQuantity">Finishing Quantity</label>
                                                    <input type="number" className="form-control" id="finishingQuantity" name="finishingQuantity" onChange={handleChange} placeholder={finishingQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingLoad">Finishing Load</label>
                                                    <input type="number" className="form-control" id="finishingLoad" name="finishingLoad" onChange={handleChange} placeholder={finishingLoad} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingDate">Finishing Date</label>
                                                    <input type="date" className="form-control" id="finishingDate" name="finishingDate" onChange={handleChange} placeholder={finishingDate} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingStatus">Finishing Status</label>
                                                    <input type="text" className="form-control" id="finishingStatus" name="finishingStatus" onChange={handleChange} placeholder={finishingStatus} />
                                                </div>
                                            </>
                                            : null
                                    }
                                    {
                                        user && user.userRole === "washing" ?
                                            <>
                                                <div className="form-group">
                                                    <label htmlFor="finishingStatus">Washing Status</label>
                                                    <input type="text" className="form-control" id="finishingStatus" name="washingStatus" onChange={handleChange} placeholder={washingStatus} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingStatus">Washing Quantity</label>
                                                    <input type="number" className="form-control" id="finishingStatus" name="washingQuantity" onChange={handleChange} placeholder={washingQuantity} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingStatus">Washing load</label>
                                                    <input type="number" className="form-control" id="finishingStatus" name="washingLoad" onChange={handleChange} placeholder={washingLoad} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="finishingStatus">Washing Date</label>
                                                    <input type="date" className="form-control" id="finishingStatus" name="washingDate" onChange={handleChange} placeholder={washingDate} />
                                                </div>
                                            </>
                                            : null
                                    }
                                    <div className="d-grid my-4" >
                                        <button className='btn btn-primary' onClick={updateRecord}>
                                            Save
                                        </button>

                                    </div>

                                </>

                            </div>
                        </div>
                    </div>

                </div>
            </main>




        </>
    )
}

export default SubUserUpdate