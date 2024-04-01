import React, { useEffect, useState } from 'react'
import { Brands } from './Brands';
import { LineBar } from './LineBar';
import axios from 'axios';
import CompanyEmployeeRegister from '../Auth/CompanyEmployeeRegister';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Card, Grid } from '@mui/material';
import ShowUsers from './Users/ShowUsers';
import UserCard from '../ShareUI/UserCard';
function OnwerSideDetached() {
  const { user } = useSelector((state) => state.auth);
  const token = user.token;
  const [activity, setActivity] = React.useState([]);
  const [sam, setSam] = React.useState([]);
  const [order, setOrder] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const getActivity = () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    axios.get('/showAcitvity', {
      headers: {
        "authorization": token
      }
    }).then(res => {
      setActivity(res.data);

    }).catch(err => {
      setError(true);
      setErrorMessage(err.response.data.message);
    }
    ).finally(() => {
      setLoading(false)
    }
    )
  }

  useEffect(() => {
    if (user !== null) {
      getActivity();
    }

  }, [user, token])

  //copy customer name from activity array 
  var total = activity.reduce((a, b) => a + b.quantity, 0);
  var capacity = user.capacity - total;
  const data = {
    labels: ['Company Capacity', 'Used Capacity'],
    datasets: [
      {

        data: [capacity, total],
        backgroundColor: [
          'rgb(40,190,184)',
          'rgb(8,112,231)',
          'rgb(255,149,0)',
          'rgb(251,15,90)',

        ],

      },
    ],
  };

  const labels = activity.map(item => item.customer);
  const data1 = {
    labels,
    datasets: [
      {
        label: 'Brands Order Quantity',
        data: activity.map(item => item.quantity),
        backgroundColor: 'rgb(255,149,0) ',
      },

    ],
  };
  return (

    <div class="sidebar-detached-content mt-3 mt-lg-0">
      {
        loading ?
          <>
            <Grid container my={3} spacing={5}>
              <Grid item>
                <Card >
                  <Skeleton variant="rounded" width={210} sx={2} height={210} />
                </Card>
              </Grid>
              <Grid item>
                <Card >
                  <Skeleton variant="rounded" width={210} sx={2} height={210} />
                </Card>

              </Grid>

              <Grid item>

                <Card >
                  <Skeleton variant="rounded" width={210} sx={2} height={210} />
                </Card>
              </Grid>
              <Grid item>
                <Card >
                  <Skeleton variant="rounded" width={210} sx={2} height={210} />
                </Card>
              </Grid>
            </Grid>
          </>
          :
          <div class="row">
            <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

              <a class="card card-hover-shadow bg-primary border-0" href="#" style={{ height: "210px" }}>
                <div class="card-body text-center">
                  <h6 class="card-subtitle text-white">Total Order Shipped</h6>
                  <i class="fa-solid fa-boxes-stacked my-4 " style={{ fontSize: "48px" }}></i>
                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-6">



                      <h2 class="card-title text-white">
                        {

                          activity.reduce((acc, curr) => {
                            return acc + curr.packingLoad
                          }
                            , 0)

                        }
                      </h2>
                    </div>


                    <div class="col-6">

                      Pieces

                    </div>

                  </div>




                </div>
              </a>

            </div>

            <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

              <a class="card card-hover-shadow border-0 gradient-1 " href="#" style={{ height: "210px" }}>
                <div class="card-body text-center ">

                  <h6 class="card-subtitle text-white">Load in Cutting</h6>
                  <i class="fa-solid fa-scissors my-4" style={{ fontSize: "48px" }}></i>
                  <div class="row align-items-center gx-2 mb-2">
                    <div class="col-6">
                      <h2 class="card-title text-white">
                        {
                          //sum of all order shipped
                          activity.reduce((acc, curr) => {
                            return acc + curr.cuttingLoad
                          }
                            , 0)

                        }
                      </h2>
                    </div>


                    <div class="col-6">

                      Pieces

                    </div>

                  </div>




                </div>
              </a>

            </div>

            <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

              <a class="card card-hover-shadow border-0 gradient-2 " href="#" style={{ height: "210px" }}>
                <div class="card-body text-center">

                  <h6 class="card-subtitle text-white">Load in Stiching</h6>
                  <i class="fa-solid fa-shirt my-4" style={{ fontSize: "48px" }}></i>
                  <div class="row align-items-center gx-2 mb-1">
                    <div class="col-6">
                      <h2 class="card-title text-white">
                        {
                          //sum of all order shipped
                          activity.reduce((acc, curr) => {
                            return acc + curr.stichLoad
                          }
                            , 0)

                        }
                      </h2>
                    </div>
                    <div class="col-6">

                      Pieces



                    </div>

                  </div>




                </div>
              </a>

            </div>

            <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

              <a class="card card-hover-shadow gradient-15 border-0 " href="#" style={{ height: "210px" }}>
                <div class="card-body text-center  ">
                  <h6 class="card-subtitle text-white">Load in Finishg</h6>
                  <i class="bi bi-bar-chart-fill text-white my-5" style={{ fontSize: "50px" }}></i>
                  <div class="row align-items-center gx-2 mb-1 mt-4">
                    <div class="col-6">
                      <h2 class="card-title text-white">
                        {
                          //sum of all order shipped
                          activity.reduce((acc, curr) => {
                            return acc + curr.finishingLoad
                          }
                            , 0)

                        }

                      </h2>
                    </div>


                    <div class="col-6 text-white">

                      Pieces
                    </div>

                  </div>




                </div>
              </a>

            </div>
          </div>

      }


      <div className="row mb-4">
        <div className="col-sm-8">
          <div className="card shadow py-4">
            <div className="card-header">
              <h2>Statistics of Brands</h2>
            </div>
            <LineBar data={data1} />
          </div>
        </div>

        <div className="col-sm-4">

          <div className="card py-5">
            <div className="card-header">
              <h2>Capacity Holding</h2>
            </div>
            <Brands data={data} />
          </div>
        </div>

      </div>
      <div class="row my-4">
        <div class="col-xl-6 mb-3 mb-xl-5">

          <div class="card px-3 h-100" id="adduser">

            <div class="card-header card-header-content-between">
              <h4 class="card-header-title">Add User</h4>


            </div>

            <div class="card-body">

              <CompanyEmployeeRegister />

              <ul class="list-group list-group-flush list-group-no-gutters">


              </ul>
            </div>

          </div>

        </div>

        <div class="col-xl-6 mb-3 mb-xl-5">

          <div class="card">
            <div className="card-img-top" style={{ marginTop: "90px", marginLeft: "190px" }}>
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


      </div>

      <div className="card my-3">
        <h3 className='py-5 px-5 '>
          Users
        </h3>
      </div>
      <ShowUsers />
      <div class="card mb-3 mb-lg-5">
        <div class="card-header">
          <div class="row justify-content-between align-items-center flex-grow-1">
            <div class="col-md">
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="card-header-title">First 10 Orders</h4>
                <div id="datatableCounterInfo" style={{ display: "none" }}>

                </div>

              </div>
            </div>


            <div class="col-auto">


            </div>

          </div>

        </div>

        <div class="table-responsive datatable-custom">
          <table id="datatable" class="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table" >
            <thead class="thead-light">
              <tr>
                <th scope="col" class="table-column-pe-0">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="datatableCheckAll" />
                    <label class="form-check-label" for="datatableCheckAll"></label>
                  </div>
                </th>
                <th class="table-column-ps-0">Customer/Brand Name</th>
                <th>Leading Person</th>

                <th>Merchandizer</th>

                <th>Product Style</th>
                <th>Order QTY</th>
                <th>Order Overall Status</th>

              </tr>
            </thead>

            <tbody>
              {
                activity.slice(0, 10).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="datatableCheckAll" />
                          <label class="form-check-label" for="datatableCheckAll"></label>
                        </div>
                      </td>
                      <td>{item.customer}</td>
                      <td>{item.leadingPerson}</td>
                      <td>{item.merchandizer}</td>
                      <td>{item.productStyle}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {
                          item.orderStatus === "On Hold" ?
                            <span class="badge  text-white bg-success">Pending</span>
                            : item.orderStatus === "On-going" ?
                              <span class="badge bg-primary text-info">In Progress</span>

                              : null
                        }
                      </td>
                    </tr>
                  )
                }
                )
              }



            </tbody>
          </table>
        </div>

        <div class="card-footer">



        </div>

      </div>







    </div>
  )
}

export default OnwerSideDetached