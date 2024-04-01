import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { GetUsers } from '../../features/auth/authSlice';
import swal from "sweetalert";
import UserCard from '../ShareUI/UserCard';
import { useState } from 'react';
function AdminSideDetached() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [totall, settotall] = useState([]);
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

  const getUsers = () => {
    try {
      axios.get("/api/users/getallusers", {
        headers: {
          "authorization": user.token,
        }
      }).then((res) => {
        settotall(res.data.user)
        setData(res.data.user.filter((list) => list.userRole === "Admin"));

      });

    } catch (error) {

    }

  }

  useEffect(() => {
    getUsers();
  }, [])

  return (

    <div class="sidebar-detached-content mt-3 mt-lg-0">
      {
        isError && <div className="alert alert-danger">{message}</div>
      }

      <div class="row">
        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Premium Users</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">
                    {
                      data.filter((list) => list.upgraded === true).length
                    }
                  </h2>
                </div>


                <div class="col-6">



                </div>

              </div>


              <span class="badge bg-soft-success text-success">
                <i class="fa-solid fa-user" style={{ fontSize: "25px" }}></i>
              </span>

            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal14">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Payment</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">${
                    data.reduce((a, b) => a + b.payment, 0)}</h2>
                </div>


                <div class="col-6">



                </div>

              </div>


              <span class="badge bg-soft-success text-success">
                <i class="fa-solid fa-dollar" style={{ fontSize: "25px" }}></i>
              </span>

            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Totall Users</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">{totall.length}</h2>
                </div>
                <div class="col-6">





                </div>

              </div>


              <span class="badge bg-soft-danger text-danger">
                <i class="fa-solid fa-envelopes-bulk" style={{ fontSize: "25px" }}></i>
              </span>

            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Free Trial Users</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">{
                    data.filter((list) => list.upgraded === false).length
                  } </h2>
                </div>


                <div class="col-6">


                </div>

              </div>


              <span class="badge bg-soft-secondary text-success">
                <i class="fa-solid fa-user-group" style={{ fontSize: "25px" }}></i>
              </span>

            </div>
          </a>

        </div>
      </div>


      <div class="row">
        <div className="col-xl-12">
          <h2 className='text-center text-white'>Companies Admin Manager Profiles</h2>
        </div>

        {
          isLoading ? <>loading</> :
            data && data.map((list) => {
              return (
                <div class="col-xl-6 mb-3 mb-lg-5 my-5">

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
                        <span>Company Name </span>
                      </div>

                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <a class="badge bg-primary text-white p-2" href="#">{list.companyName}</a></li>

                      </ul>

                    </div>


                    <div class="card-footer">
                      <div class="row justify-content-between align-items-center">
                        <div class="col-auto py-1">
                          <a class="fs-6 text-body" href="#">Account type <div className="badge bg-success">{list.plan}</div></a>
                        </div>
                        <div class="col-auto py-1">
                          <a class="fs-6 text-body" href="#">Plan Renew Data <div className="badge bg-success">{list.TrialEnded.slice(0, 16)}</div></a>
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

  )
}

export default AdminSideDetached