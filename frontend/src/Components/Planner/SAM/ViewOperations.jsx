import React from 'react'
import { Link } from "react-router-dom"
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import RightSideBarNav from '../RightSideBarNav'
import VerticalNavbar from '../VerticalNavbar'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
function ViewOperations() {
    const [sam, setSam] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [opration, setOperation] = React.useState({
        Sequence_No: 0,
        Operation: '',
        Machine_type: '',
        Rate: '',
        Smv: '',
    })

    const { id } = useParams();

    const getSAM = async () => {

        try {
            const response = await axios.get(`/showorder/${id}`, {
                headers: {
                    'authorization': user.token
                }
            });
            setSam(response.data.data);

            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    const DeleteOperation = async (id) => {

        try {
            setLoading(true);
            const response = await axios.delete("/deleteOperation", {
                headers: {
                    'Content-Type': 'application/json',
                    'id': id,
                    'authorization': user.token
                }
            });
            setSuccess(response.data.message);

            setLoading(false);
            getSAM();
        } catch (error) {
            setError(true);
            console.log(error);
            setErrorMessage(error);
            setLoading(false);
        }
    }

    const onChange = (e) => {
        setOperation({ ...opration, [e.target.name]: e.target.value })
    }

    const addOperation = (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            axios.post('/addsuboperation', opration, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': user.token
                }
            }).then(res => {
                setSuccess(res.data.message);
            }).catch(err => {
                console.log(err)
            }
            )
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
        getSAM();
    }

    React.useEffect(() => {

        getSAM();
    }
        , [id]);
    return (
        <div>
            <div id="exampleModalTopCover" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalTopCoverTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">

                        <div class="modal-top-cover bg-primary text-center">
                            <figure class="position-absolute end-0 bottom-0 start-0">
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 100.1">
                                    <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
                                </svg>
                            </figure>

                            <div class="modal-close">
                                <button type="button" class="btn-close btn-close-light" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>


                        <div class="modal-top-cover-icon">
                            <span class="icon icon-lg icon-light icon-circle icon-centered shadow-sm">
                                <i class="fa fa-folder-plus fs-2"></i>
                            </span>
                        </div>

                        <div class="modal-body">
                            <form >
                                <div className="card-header">
                                    <h3 className="mb-0">Add Operation</h3>
                                    {
                                        success ?
                                            <div className="alert alert-success">
                                                {success}
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label">Sequence No</label>
                                        <input type="text" className="form-control" name="Sequence_No" value={opration.Sequence_No} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Operation</label>
                                        <input type="text" className="form-control" name="Operation" value={opration.Operation} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Machine Type</label>
                                        <input type="text" className="form-control" name="Machine_type" value={opration.Machine_type} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Rate</label>
                                        <input type="text" className="form-control" name="Rate" value={opration.Rate} onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Smv</label>
                                        <input type="text" className="form-control" name="Smv" value={opration.Smv} onChange={onChange} />
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary" onClick={addOperation}>Submit</button>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            <main id="content" role="main" class="main">
                <div className='pt-5'>

                    <Header title={'Order Detail with SAM'} />
                </div>
                <div class="content container-fluid" style={{ marginTop: "-20rem" }}>

                    <VerticalNavbar active={'showSam'} />

                    <div className="row">
                        <div className="col-md-12">
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
                                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalTopCover">
                                                                    ADD
                                                                </button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div class="table-responsive datatable-custom">
                                                        <table id="datatable" class="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table" >
                                                            <thead class="thead-light">
                                                                <tr>
                                                                    <th>Order ID</th>
                                                                    <th scope="col" class="table-column-pe-0">
                                                                        Operation
                                                                    </th>
                                                                    <th class="table-column-ps-0">Machine Type</th>
                                                                    <th>Rate</th>
                                                                    <th>S.M.V</th>


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
                                                                                        item.Sequence_No
                                                                                    }


                                                                                </td>
                                                                                <td class="table-column-ps-0 ">

                                                                                    <div className="d-flex px-5">

                                                                                        <div class="box bg-primary" >
                                                                                            <i className="fa fa-industry"></i>
                                                                                        </div>
                                                                                        <div className="p-2">
                                                                                            {
                                                                                                item.Operation
                                                                                            }
                                                                                        </div>
                                                                                    </div>


                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        item.Machine_type
                                                                                    }


                                                                                </td>
                                                                                <td>
                                                                                    <div className="badge bg-success">
                                                                                        {
                                                                                            item.Rate
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <span class="badge badge-success bg-primary">
                                                                                        {
                                                                                            item.Smv

                                                                                        }
                                                                                    </span>
                                                                                </td>

                                                                                <td>
                                                                                    <div className="d-flex">
                                                                                        <div className="p-2">
                                                                                            <Link to={`/subOp/${item._id}`} className="btn btn-primary">
                                                                                                Edit
                                                                                            </Link>
                                                                                        </div>
                                                                                        <div className="p-2">
                                                                                            <button class="btn btn-danger " onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                                DeleteOperation(item._id)
                                                                                            }} >
                                                                                                Delete
                                                                                            </button>
                                                                                        </div>

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
                    </div>

                </div>
            </main>

            <RightSideBarNav />


        </div>
    )
}

export default ViewOperations