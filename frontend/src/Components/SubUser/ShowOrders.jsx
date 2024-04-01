import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../ShareUI/Header';

import { DeleteAcitvity, getActivity } from '../../app/Services/Activity';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function ShowOrder() {
    const { user } = useSelector((state) => state.auth);
    const token = user.token;
    const dispatch = useDispatch();
    const { activity, loading, error, success } = useSelector((state) => state.activity);
    const deleteActivity = async (id) => {
        try {
            const userData = {
                id,
                token,
                toast
            }
            dispatch(DeleteAcitvity(userData));
            dispatch(getActivity(token))

        } catch (error) {
            console.log(error)
        }



    }

    useEffect(() => {
        if (user) {
            dispatch(getActivity(user.token))
        }


    }, [user, dispatch]);

    return (
        <>

            <main id="content" role="main" class="main">
                <div className="pt-5">
                    <Header title={'Activities Page'} />
                </div>
                <div className="content container " style={{ marginTop: "-20rem" }}>
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
                            <div className="mt-3 mt-lg-0 card  ">

                                {
                                    loading && <div className="text-center">
                                        <div className="spinner-border" role='status' style={{ width: "200px", height: "200px" }}>
                                            <span className="visually-hidden">
                                                loading...
                                            </span>
                                        </div>
                                    </div>

                                }

                                {
                                    error && <div className="alert alert-danger">
                                        {
                                            error
                                        }
                                    </div>
                                }

                                <div class="row row-cols-1 row-cols-md-2">
                                    <>
                                        {
                                            activity.map(item => {
                                                return (
                                                    <>
                                                        <div class="col mb-3 mb-lg-5" key={item._id}>

                                                            <div class="card card-hover-shadow text-center h-100">
                                                                <div class="card-progress-wrap">

                                                                    <div class="progress card-progress">
                                                                        <div class="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>

                                                                </div>


                                                                <div class="card-body">
                                                                    <div class="row align-items-center text-start mb-4">
                                                                        <div class="col">
                                                                            <span class="badge bg-soft-secondary text-secondary p-2">{item.productStyle}</span>
                                                                        </div>




                                                                    </div>

                                                                    <div class="d-flex justify-content-center mb-2">

                                                                        <img class="avatar avatar-lg" src={item.garmentPicture ? item.garmentPicture : "https://firebasestorage.googleapis.com/v0/b/images-107c9.appspot.com/o/t-1.jpg?alt=media&token=9b3d89c6-03dd-4196-91ac-a048bc8cb6da"} alt="Image Description" />
                                                                    </div>

                                                                    <div class="mb-4">
                                                                        <h2 class="mb-1"> Quantity {item.quantity}</h2>

                                                                        <span class="fs-5">Price {item.price}</span>
                                                                    </div>

                                                                    <small class="card-subtitle">Members</small>

                                                                    <div class="d-flex justify-content-center">


                                                                        <div class="row col-divider">
                                                                            <div class="col">
                                                                                <span class="h4">Merchandizer </span>
                                                                                <span class="d-block fs-5">{item.merchandizer}</span>
                                                                            </div>


                                                                            <div class="col">
                                                                                <span class="h4">Customer</span>
                                                                                <span class="d-block fs-5">{item.customer}</span>
                                                                            </div>


                                                                            <div class="col">
                                                                                <span class="h4">Leading Person</span>
                                                                                <span class="d-block fs-5">
                                                                                    {item.leadingPerson}
                                                                                </span>
                                                                            </div>



                                                                        </div>

                                                                    </div>


                                                                </div>

                                                                <div class="card-footer">

                                                                    <div class="row col-divider">



                                                                        <div class="col">
                                                                            <Link to={`/updateOrders/${item._id}`} className='btn btn-success'>
                                                                                Add Load
                                                                            </Link>
                                                                        </div>




                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>







                                                    </>
                                                )
                                            }
                                            )

                                        }
                                    </>

                                </div>









                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </>
    )
}

export default ShowOrder