import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';

function SideDetachedBar() {
  const { user } = useSelector((state) => state.auth);
  const token = user.token
  const [sam, setSam] = React.useState([]);
  const [order, setOrder] = React.useState({});
  const [activity, setActivity] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const [bom, setBom] = React.useState([]);
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
      setLoading(false);
    }
    )
  }

  const getSAM = async () => {
    try {
      const response = await axios.get("/showorder", {
        headers: {
          'authorization': token
        }
      });
      setSam(response.data.data);

      setLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  const getBOM = async () => {
    try {
      const response = await axios.get("/api/bom/show", {
        headers: {
          "authorization": token
        }
      });
      setBom(response.data);
      console.log(response.data);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  // pick on cutomer name from activity array

  useEffect(() => {
    if (user) {
      getBOM();
      getSAM();
      getActivity();
    }

  }
    , [user, token]);

  return (

    <div class="sidebar-detached-content mt-3 mt-lg-0">

      <div class="row">
        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Totall Orders On-Hold   </h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">
                    {
                      activity.filter(item => item.orderStatus === 'On Hold').length
                    }

                  </h2>
                </div>


                <div class="col-6">



                </div>

              </div>


              <span class="badge bg-soft-success text-success">
                <i class="fa-solid fa-chart-column"></i> {
                  ((activity.filter(item => item.orderStatus === 'On Hold').length) / activity.length * 100).toFixed(2)
                }%
              </span>
              <span class="text-body fs-6 ms-1">from {
                activity.length
              }</span>
            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Average Order Quantity</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">
                    {
                      // take average of oder quantity
                      activity.reduce((acc, item) => acc + item.quantity, 0) / activity.length
                    }
                  </h2>
                </div>


                <div class="col-6">



                </div>

              </div>


              <span class="badge bg-soft-success text-success">
                <i class="fa-solid fa-chart-pie"></i>
                {
                  // take percentage of oder quantity
                  ((activity.reduce((acc, item) => acc + item.quantity, 0) / activity.length) / activity.length * 100).toFixed(2)

                } %
              </span>

            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark">Totall On-going Orders</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">
                    {
                      activity.filter(item => item.orderStatus === 'On-going').length

                    }
                  </h2>
                </div>


                <div class="col-6">





                </div>

              </div>


              <span class="badge bg-soft-danger text-danger">
                <i class="fa-solid fa-calendar-days"></i> {((activity.filter(item => item.orderStatus === 'On-going').length) / activity.length * 100).toFixed(2)}%
              </span>
              <span class="text-body fs-6 ms-1">
                from {activity.length}
              </span>
            </div>
          </a>

        </div>

        <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

          <a class="card card-hover-shadow h-100" href="#">
            <div class="card-body">
              <h6 class="card-subtitle text-dark"> Latest Generated Orders Status</h6>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6">
                  <h2 class="card-title text-inherit">{

                    activity.length > 0 ?
                      activity[activity.length - 1].updatedAt.split('T')[0]
                      :
                      'No Orders'
                  }
                  </h2>
                </div>
                {
                  //show last activity sheet
                  activity.length > 0 ?
                    <div class="col-6">
                      <h6 class="card-subtitle text-inherit">{activity[activity.length - 1].orderStatus}</h6>
                    </div>
                    :
                    null
                }

                <div class="col-6">

                  ago
                </div>

              </div>


              <span class="badge bg-soft-secondary text-body">Last Updated At</span>
              <span class="text-body fs-6 ms-1">{

                activity.length > 0 ?
                  activity[activity.length - 1].updatedAt.split('T')[0]
                  :
                  'No Orders'
              }</span>
            </div>
          </a>

        </div>

      </div>


      {/* payment profile cards */}
      <div class="row">
        <div class="col-xl-4 mb-3 mb-xl-5">

          <div class="card h-100">

            <div class="card-header card-header-content-between">
              <h4 class="card-header-title">Bill of Materials (BOM)</h4>




            </div>

            <div class="card-body">
              <p>You can easily Make Bill of Material with our software. As Every garment industry make BOM with their own style it will allow you to make your BOM as by your choice.</p>

              <ul class="list-group list-group-flush list-group-no-gutters">
                <li class="list-group-item">
                  <h5 class="card-title">Last Generated BOMS:</h5>
                </li>


                {
                  //map only the last 5 generated SAM Sheets
                  bom.slice(0, 3).map((SAMSheet, index) => {
                    return (
                      <li class="list-group-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0">
                            <img class="avatar avatar-xs avatar-4x3" src={SAMSheet.UID ? SAMSheet.UID : "capsule-icon.svg"} alt="Image Description" />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <div class="row align-items-center">
                              <div class="col">
                                <h5 class="mb-0">{
                                  SAMSheet.CustomerName
                                }</h5>
                                <span class="d-block fs-6 text-body">{
                                  SAMSheet.
                                    style
                                }</span>
                              </div>


                              <div class="col-auto">
                                <Link to={`/bom/${SAMSheet._id}`} class="btn btn-primary">
                                  use this  Template
                                </Link>
                              </div>

                            </div>

                          </div>
                        </div>
                      </li>
                    )
                  }
                  )

                }




              </ul>
            </div>

          </div>

        </div>


        <div class="col-xl-4 mb-3 mb-xl-5">

          <div class="card h-100">

            <div class="card-header card-header-content-between">
              <h4 class="card-header-title">Operation Bulliten</h4>




            </div>

            <div class="card-body">
              <p>The inputs will be product type, sewing operations, SAM of operations and machine type. The output will be a list of operations in sequence with total SAM of product, number of machines required, type of machines required etc.</p>

              <ul class="list-group list-group-flush list-group-no-gutters">
                <li class="list-group-item">
                  <h5 class="card-title">Last Generated SAM Sheets:</h5>
                </li>



                {
                  //map only the last 5 generated SAM Sheets
                  sam.slice(0, 3).map((SAMSheet, index) => {
                    return (
                      <li class="list-group-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0">

                          </div>
                          <div class="flex-grow-1 ms-3">
                            <div class="row align-items-center">
                              <div class="col">
                                <h5 class="mb-0">
                                  {SAMSheet.CustomerName}
                                </h5>
                                <span class="d-block fs-6 text-body">
                                  {SAMSheet.garmentStyle
                                  }
                                </span>
                              </div>


                              <div class="col-auto">
                                <Link to={`/dashboardSam/${SAMSheet._id}`} className="btn btn-primary">SAM</Link>
                              </div>

                            </div>

                          </div>
                        </div>
                      </li>
                    )
                  }
                  )

                }






              </ul>
            </div>

          </div>

        </div>
        <div class="col-xl-4 mb-3 mb-xl-5">
          <div class="card">
            <div className="card-img-top" style={{ marginTop: "90px", marginLeft: "90px" }}>
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
                    <span className="badge bg-primary mx-4">
                      {
                        user && user.TrialEnded.slice(0, 16)
                      }

                    </span>

                  </div>
                </li>


              </ul>
            </div>

          </div>

        </div>

      </div>

      {
        loading ? <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> :
          error ? <div className="text-center">
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div> :
            sam.length > 0 ?


              <div class="card mb-3 mb-lg-5">

                <div class="card-header">
                  <div class="row justify-content-between align-items-center flex-grow-1">
                    <div class="col-md">
                      <div class="d-flex justify-content-between align-items-center">
                        <h4 class="card-header-title">SAM SHEETS FOR ORDERS</h4>
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
                          Work Order Number
                        </th>
                        <th class="table-column-ps-0">Customer</th>
                        <th>Quantity</th>
                        <th>Garment Type</th>

                        <th>Action</th>

                      </tr>
                    </thead>

                    <tbody >
                      {
                        sam.map((item, index) => {
                          return (
                            <tr className='px-5' key={
                              index
                            }>


                              <td>
                                {
                                  item.workOrderNumber
                                }
                                <span class="legend-indicator bg-success"></span>

                              </td>
                              <td>
                                <h5 class="text-inherit mb-0">
                                  {
                                    item.CustomerName
                                  }
                                  <i class="fa-solid fa-circle-check text-success" data-bs-toggle="tooltip" data-bs-placement="top" title="Top Client"></i></h5></td>
                              <td>
                                {
                                  item.quantity
                                }
                              </td>
                              <td>
                                <span class="badge badge-success bg-primary">
                                  {
                                    item.garmentStyle

                                  }
                                </span>
                              </td>
                              <td>

                                <div className="d-flex justifty-cotent-between">
                                  <Link to={`/showSam/${item._id}`} className="btn btn-success mx-2">Manage Operations</Link>

                                </div>

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

                  <div class="row justify-content-center justify-content-sm-between align-items-sm-center">
                    <div class="col-sm mb-2 mb-sm-0">
                      <div class="d-flex justify-content-center justify-content-sm-start align-items-center">
                        <span class="me-2">Showing:</span>


                        <div class="tom-select-custom">
                          3
                        </div>


                        <span class="text-secondary me-2"> of</span>


                        <span id="datatableWithPaginationInfoTotalQty">20</span>
                      </div>
                    </div>


                    <div class="col-sm-auto">
                      <div class="d-flex justify-content-center justify-content-sm-end">

                        <nav id="datatablePagination" aria-label="Activity pagination"></nav>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              :
              <div class="card sidebar-detached-content mt-3 mt-lg-0">
                <div class="card-header">
                  <h3 class="card-title">No Data Found</h3>
                </div>
              </div>
      }


      <div class="row">



        <div class="col-xl-6 mb-3 mb-xl-5">

          <div class="card h-100">

            <div class="card-header card-header-content-between">
              <h4 class="card-header-title">Actvity Booking</h4>




            </div>

            <div class="card-body">
              <p>This will let you to add daily bases load in Every department.</p>

              <ul class="list-group list-group-flush list-group-no-gutters">
                <li class="list-group-item">
                  <h5 class="card-title">Last added activity:</h5>
                </li>
                {
                  activity.slice(0, 5).map((activity, index) => {
                    return (
                      <li class="list-group-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0">
                            <img class="avatar rounded  avatar-4x3" src={activity.garmentPicture ? activity.garmentPicture : "img3.jpg"} alt="Image Description" />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <div class="row align-items-center">
                              <div class="col">
                                <h5 class="mb-0">{activity.merchandizer}</h5>
                                <span class="d-block fs-6 text-body">{activity.customer}</span>
                              </div>
                              <div class="col-auto">
                                <Link to={`/editActivity/${activity._id}`} className='btn btn-success'>
                                  Update
                                </Link>

                              </div>

                            </div>

                          </div>
                        </div>
                      </li>
                    )
                  }
                  )
                }







              </ul>
            </div>

          </div>

        </div>

      </div>




    </div>

  )
}

export default SideDetachedBar