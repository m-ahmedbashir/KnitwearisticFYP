import React from 'react'
import { Link } from "react-router-dom"
import Header from '../../ShareUI/Header'
import RightSideBarNav from '../RightSideBarNav'
import VerticalNavbar from '../VerticalNavbar'
import axios from "axios";
import { useSelector } from "react-redux";
import AdminVerticalNabar from '../../Admin/AdminVerticalNavbar'
function ShowSAM() {
    const { user } = useSelector((state) => state.auth);
    const [sam, setSam] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const getSAM = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/showorder", {
                headers: {
                    'authorization': user.token,
                }
            });
            setSam(response.data.data);
            setSuccess('Sam Order loaded');
            setLoading(false);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (user) {
            getSAM();
        }

    }, [user]);
    return (
        <div>
            <main id="content" role="main" class="main">
                <div className='pt-5'>

                    <Header title={'Orders'} />
                </div>
                <div class="content container" style={{ marginTop: "-20rem" }}>
                    {
                        user && user.userRole === "Admin" ?
                            <>
                                <AdminVerticalNabar />
                            </>
                            : <VerticalNavbar active={'showSam'} />
                    }

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
                                    <div className='sidebar-detached-content mt-3 mt-lg-0'>
                                        {
                                            success && <div className="alert alert-success">
                                                {
                                                    success
                                                }
                                            </div>

                                        }
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
                                                                                {
                                                                                    user && user.userRole === "Admin" ?
                                                                                        null
                                                                                        :
                                                                                        <Link to={`/showSam/${item._id}`} className="btn btn-success mx-2">Edit Operations</Link>
                                                                                }
                                                                                {
                                                                                    user && user.userRole === "Admin" ?
                                                                                        <Link to={`/samAdmin/${item._id}`} className="btn btn-primary">Generate SAM</Link>
                                                                                        :
                                                                                        <Link to={`/dashboardSam/${item._id}`} className="btn btn-primary">Generate SAM</Link>
                                                                                }
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
                                    </div>
                                    :
                                    <div class="card sidebar-detached-content mt-3 mt-lg-0">
                                        <div class="card-header">
                                            <h3 class="card-title">No Data Found</h3>
                                        </div>
                                    </div>
                    }

                </div>
            </main>

            <RightSideBarNav />


        </div>
    )
}

export default ShowSAM