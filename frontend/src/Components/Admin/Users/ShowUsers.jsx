import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { GetUsers } from '../../../features/auth/authSlice';
import swal from "sweetalert";
function ShowUsers() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { users, isLoading, isError, message } = useSelector((state) => state.auth);
    const deleteUser = async (id) => {
        const response = await axios.delete("/api/users/deleteuser", {
            headers: {
                "authorization": user.token,
                "id": id
            }
        });
        if (response.status === 200) {
            toast.success("User Deleted Successfully");
        }
    }
    const deleteModel = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteUser(id);
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    dispatch(GetUsers(user.token))
                } else {
                    swal("User Not Deleted");
                }
            });
    }
    useEffect(() => {
        if (user) {
            dispatch(GetUsers(user.token));
        }
    }, [user, dispatch])
    return (
        <>
            {
                isError && <div className="alert alert-danger">{message}</div>
            }

            <div class="tab-content" id="connectionsTabContent">
                <div class="tab-pane fade show active" id="grid" role="tabpanel" aria-labelledby="grid-tab">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3">
                        {
                            isLoading ? <>loading</> :
                                users && users.map((list) => {
                                    return (
                                        <div class="col mb-3 mb-lg-5 my-5">

                                            <div class="card h-100 ">

                                                <div className="card-img-top d-flex justify-cotent-center" style={{ marginTop: "-30px" }}>
                                                    <div class="avatar avatar-xl bg-primary avatar-circle avatar-centered mb-3">
                                                        <span class="avatar-initials">{list.name.slice(0, 1)}</span>
                                                        <span class="avatar-status avatar-sm-status avatar-status-warning"></span>
                                                    </div>



                                                </div>

                                                <div class="card-body text-center">

                                                    <h3 class="mb-1">
                                                        <a class="text-dark" href="#">{list.name}</a>
                                                    </h3>

                                                    <div class="mb-3">
                                                        <i class="bi-building me-1"></i>
                                                        <span>Department  </span>
                                                    </div>

                                                    <ul class="list-inline mb-0">
                                                        <li class="list-inline-item">
                                                            <a class="badge bg-primary text-white p-2" href="#">{list.userRole}</a></li>

                                                    </ul>

                                                </div>


                                                <div class="card-footer">
                                                    <div class="row justify-content-between align-items-center">
                                                        <div class="col-auto py-1">
                                                            <a class="fs-6 text-body" href="#">Update</a>
                                                        </div>

                                                        <div class="col-auto py-1">
                                                            <button className="btn btn-danger" onClick={() => deleteModel(list._id)} >
                                                                Delete
                                                            </button>


                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    )
                                })

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowUsers