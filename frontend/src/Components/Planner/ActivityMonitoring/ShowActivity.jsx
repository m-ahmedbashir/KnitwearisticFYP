import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../ShareUI/Header';
import VerticalNavbar from '../VerticalNavbar';
import { DeleteAcitvity, getActivity } from '../../../app/Services/Activity';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AdminVerticalNabar from '../../Admin/AdminVerticalNavbar';
function ShowActivity() {
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
                    {
                        user && user.userRole === "Admin" ?
                            <AdminVerticalNabar />
                            :
                            <VerticalNavbar active={'activities'} />
                    }

                    <div className="sidebar-detached-content mt-3 mt-lg-0 card  ">

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
                                                                {
                                                                    user && user.userRole === "Admin" ?
                                                                        null
                                                                        :
                                                                        <>
                                                                            <div class="col">
                                                                                <button className='btn btn-danger mx-2' onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    deleteActivity(item._id)
                                                                                }} >
                                                                                    Delete

                                                                                </button>
                                                                            </div>


                                                                            <div class="col">
                                                                                <Link to={`/editActivity/${item._id}`} className='btn btn-success'>
                                                                                    Edit
                                                                                </Link>
                                                                            </div>
                                                                        </>
                                                                }


                                                                {
                                                                    user && user.userRole === "Admin" ?
                                                                        <div class="col">
                                                                            <Link to={`/viewActivityAdmin/${item._id}`} className='btn btn-primary'>
                                                                                view
                                                                            </Link>
                                                                        </div>
                                                                        :
                                                                        <div class="col">
                                                                            <Link to={`/viewActivity/${item._id}`} className='btn btn-primary'>
                                                                                view
                                                                            </Link>
                                                                        </div>
                                                                }

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
            </main>
        </>
    )
}

export default ShowActivity