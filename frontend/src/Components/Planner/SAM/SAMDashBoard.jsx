import React from 'react'
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import RightSideBarNav from '../RightSideBarNav'
import VerticalNavbar from '../VerticalNavbar'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Brands } from '../../Admin/Brands'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import AdminVerticalNabar from '../../Admin/AdminVerticalNavbar'
function SamDashboard() {
    const [sam, setSam] = React.useState([]);
    const [order, setOrder] = React.useState({});

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();




    const generatePDF = (e) => {
        e.preventDefault();

        const doc = new jsPDF()
        autoTable(doc, { html: '#order' })
        autoTable(doc, { html: '#myid1content' })
        autoTable(doc, { html: '#myid1' })
        autoTable(doc, { html: '#myidcontent' })
        doc.save('SamOutResultsOfCustomerOrder.pdf')
    }


    const getSAM = async () => {

        try {
            const response = await axios.get(`/showorder/${id}`, {
                headers: {
                    'authorization': user.token
                }
            });
            setSam(response.data.data);
            setOrder(response.data.order);

            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setErrorMessage(error.message);
            setLoading(false);
        }
    }



    var smv = sam.reduce((acc, curr) => {
        return acc + curr.Smv
    }
        , 0)
    var rate = sam.reduce((acc, curr) => {
        return acc + curr.Rate
    }, 0)
    var quantity = order.quantity;
    var garmentValue = order.garmentStyleMulitplier;

    var TotalTargetPerDay = (garmentValue * 480) / smv;
    const data = {
        labels: ['SMV', 'RATE', 'QUANTITY'],
        datasets: [
            {

                data: [smv, rate, quantity],
                backgroundColor: [
                    'rgb(40,190,184)',
                    'rgb(8,112,231)',
                    'rgb(255,149,0)',


                ],

            },
        ],
    };
    var MachineRequired = 0;
    var roundUp = 0;
    var GrandtotalRoundUp = 0;
    var date = new Date();
    var GrandTotalRate = 0;
    var GrandTotalMachineRequired = 0.0;
    React.useEffect(() => {

        getSAM();
    }
        , [id]);
    return (
        <div>




            <main id="content" role="main" class="main">
                <div className='pt-5'>

                    <Header title={'Order Detail with SAM'} />
                </div>
                <div class="content container-fluid" style={{ marginTop: "-20rem" }}>

                    {
                        user && user.userRole === "Admin" ?
                            <AdminVerticalNabar />
                            :
                            <VerticalNavbar active={'showSam'} />
                    }

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
                                                {
                                                    success && <div className="div alert alert-success">
                                                        {
                                                            success
                                                        }
                                                    </div>


                                                }

                                                <div class="row">
                                                    <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

                                                        <a class="card card-hover-shadow h-100 gradient-11 border-0" href="#">
                                                            <div class="card-body">
                                                                <h1 class="card-title text-white">Work Order Number </h1>

                                                                <div class="row align-items-center gx-2 mb-1">
                                                                    <div class="col-6">
                                                                        <h2 class="card-title text-inherit text-white">
                                                                            {
                                                                                order.workOrderNumber

                                                                            }
                                                                        </h2>
                                                                    </div>


                                                                    <div class="col-6">



                                                                    </div>

                                                                </div>


                                                                <span class="badge bg-soft-success text-white">
                                                                    <i class="fa-solid fa-calendar text-white"></i> {
                                                                        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                                                                    }
                                                                </span>

                                                            </div>
                                                        </a>

                                                    </div>

                                                    <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

                                                        <a class="card card-hover-shadow gradient-10 border-0 h-100" href="#">
                                                            <div class="card-body">
                                                                <h1 class="card-title text-white">Garment Style</h1>

                                                                <div class="row align-items-center gx-2 mb-1">
                                                                    <div class="col-6">
                                                                        <h2 class="card-title text-inherit text-white">

                                                                            {
                                                                                order.garmentStyle

                                                                            }
                                                                        </h2>
                                                                    </div>


                                                                    <div class="col-6">



                                                                    </div>

                                                                </div>


                                                                <span class="badge bg-soft-success text-white">
                                                                    <i class="fa-solid fa-chart-pie"></i> POID 56B25
                                                                </span>

                                                            </div>
                                                        </a>

                                                    </div>

                                                    <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

                                                        <a class="card card-hover-shadow gradient-9 border-0 h-100" href="#">
                                                            <div class="card-body">
                                                                <h1 class="card-title text-white">Quantity</h1>

                                                                <div class="row align-items-center gx-2 mb-1">
                                                                    <div class="col-6">
                                                                        <h2 class="card-title text-inherit text-white">
                                                                            {
                                                                                order.quantity
                                                                            }
                                                                        </h2>
                                                                    </div>


                                                                    <div class="col-6">





                                                                    </div>

                                                                </div>


                                                                <span class="badge bg-soft-danger text-white">
                                                                    <i class="fa-solid fa-calendar-days"></i> Today so far
                                                                </span>
                                                                <span class="fs-6 ms-1 text-white">{
                                                                    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                                                                }</span>
                                                            </div>
                                                        </a>

                                                    </div>

                                                    <div class="col-sm-6 col-xl-3 mb-3 mb-xl-5">

                                                        <a class="card card-hover-shadow gradient-8 border-0 h-100" href="#">
                                                            <div class="card-body">
                                                                <h1 class="card-title text-white">Customer Name</h1>

                                                                <div class="row align-items-center gx-2 mb-1">
                                                                    <div class="col-6">
                                                                        <h2 class="card-title text-inherit text-white">{
                                                                            order.CustomerName
                                                                        } </h2>
                                                                    </div>


                                                                    <div class="col-6 text-white">


                                                                    </div>

                                                                </div>


                                                                <span class="badge bg-primary text-white">Company Name</span>
                                                                <span class="text-white fs-6 ms-1">
                                                                    {
                                                                        order.companyName
                                                                    }
                                                                </span>
                                                            </div>
                                                        </a>

                                                    </div>

                                                </div>

                                                {/* Sub Operation BreakDown and Profile of Customer */}
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="card border-0 shadow py-5">
                                                            <div className="card-header h-100">
                                                                <h3 className="card-title">Graphical Analysis</h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <Brands data={data} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 ">
                                                        <div className="card border-0 shadow py-5 mb-4">
                                                            <div className="card-header h-100">
                                                                <h3 className="card-title">
                                                                    Operation BreakDown
                                                                </h3>
                                                            </div>
                                                            <div class="card-body">

                                                                <div class="mt-4 py-1">
                                                                    <h4>{
                                                                        TotalTargetPerDay.toFixed(2)
                                                                    }</h4>
                                                                    <div className="d-flex justify-content-between">
                                                                        <h6>100% Target Per Day</h6>
                                                                        <span class="badge bg-success text-white my-2">100%</span>
                                                                    </div>
                                                                    <div class="progress mb-3" style={{ height: "7px" }}>
                                                                        <div class="progress-bar bg-primary" style={{ width: "100%" }} role="progressbar"><span class="sr-only">% Order</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-4">
                                                                    <h4>{(TotalTargetPerDay * 0.8).toFixed(2)}</h4>
                                                                    <div className="d-flex justify-content-between">
                                                                        <h6>80% Target Per Day</h6>
                                                                        <span class="badge bg-secondary text-white my-2">80%</span>
                                                                    </div>
                                                                    <div class="progress mb-3" style={{ height: "7px" }}>
                                                                        <div class="progress-bar bg-success" style={{ width: "80%" }} role="progressbar"><span class="sr-only">50% Order</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="mt-4">
                                                                    <h4>
                                                                        {((TotalTargetPerDay * 0.8) / 8).toFixed(2)}
                                                                    </h4>
                                                                    <div className="d-flex justify-content-between">
                                                                        <h6>80% Target Per Hour</h6>
                                                                        <span class="badge bg-primary text-white my-2">80%</span>
                                                                    </div>
                                                                    <div class="progress mb-3" style={{ height: "7px" }}>
                                                                        <div class="progress-bar bg-warning" style={{ width: "80%" }} role="progressbar"><span class="sr-only">20% Order</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <table id='order' className='card'>
                                                            <tr>
                                                                <h3 className="card-title py-2 px-3">Generated Order</h3>

                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="">
                                                                        <div className="card-header h-100">
                                                                        </div>
                                                                        <div class="card-body">

                                                                            <div class="media align-items-center ">

                                                                                <img class="mr-3" src="https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/Capture-removebg-preview.png?alt=media&token=ab8e8638-16de-414c-8f6a-a7650ee3b00a" width="80" height="80" alt="" style={{ borderRadius: "50%" }} />

                                                                                <div class="media-body mb-2 ">
                                                                                    <h4 class="mb-0">{
                                                                                        order.CustomerName
                                                                                    }</h4>
                                                                                    <p class="text-muted mb-5">Cutomer Name</p>


                                                                                </div>

                                                                            </div>

                                                                            <h4 className="mb-4">Order Details</h4>
                                                                            <p class="text-muted ">Order Quantity: <span className=" bage gradient-9">{order.quantity}</span></p>
                                                                            <p className="text-muted">Work Order Number: <span className=" badge gradient-3">{order.workOrderNumber}</span> </p>
                                                                            <p className="text-muted">Garment Style: <span className=" badge gradient-1">{order.garmentStyle}</span> </p>


                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>

                                                <div class="card mb-3 mb-lg-5">

                                                    <div class="card-header">
                                                        <div class="row justify-content-between align-items-center flex-grow-1">
                                                            <div class="col-md">
                                                                <div class="d-flex justify-content-between align-items-center">
                                                                    <h4 class="card-header-title">SAM SHEETS FOR ORDERS</h4>
                                                                    <div id="datatableCounterInfo" style={{ display: "none" }}>

                                                                    </div>

                                                                </div>
                                                                <button onClick={generatePDF} className="btn btn-primary" id='gen'>
                                                                    Generate PDF
                                                                </button>
                                                            </div>




                                                        </div>

                                                    </div>

                                                    <div class="table-responsive t datatable-custom">
                                                        <table id="myid1content" class="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"  >
                                                            <thead class="thead-light">
                                                                <tr>
                                                                    <th>Order ID</th>
                                                                    <th scope="col" class="table-column-pe-0">
                                                                        Operation
                                                                    </th>
                                                                    <th class="table-column-ps-0">Machine Type</th>
                                                                    <th title='Rate of Worker to Prepare the Garment'>Rate</th>
                                                                    <th title='Standard Minute Value'>S.M.V</th>


                                                                    <th title='Target Per Hour'>TGT P/H</th>
                                                                    <th title='Machine Required'>Machine QTY</th>
                                                                    <th title='Round Up or Round Down Value for Machine Quantity'>
                                                                        Round Up
                                                                    </th>
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
                                                                                    <h6>
                                                                                        {
                                                                                            item.Sequence_No
                                                                                        }

                                                                                    </h6>

                                                                                </td>
                                                                                <td class="table-column-ps-0 ">


                                                                                    <h6>
                                                                                        {
                                                                                            item.Operation
                                                                                        }
                                                                                    </h6>




                                                                                </td>
                                                                                <td>
                                                                                    <h6>
                                                                                        {
                                                                                            item.Machine_type
                                                                                        }
                                                                                    </h6>


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
                                                                                    <span class="badge badge-success gradient-10">
                                                                                        {
                                                                                            (60 / (parseFloat(item.Smv))).toFixed(2)
                                                                                        }
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span class="badge  gradient-9">
                                                                                        {
                                                                                            MachineRequired = ((parseFloat(item.Smv) * TotalTargetPerDay) / 480).toFixed(2)
                                                                                        }
                                                                                    </span>
                                                                                </td>
                                                                                <td>

                                                                                    <span class="badge gradient-11">

                                                                                        {
                                                                                            (() => {
                                                                                                if ((MachineRequired - parseInt(MachineRequired)) < 0.15) {
                                                                                                    roundUp = Math.floor(MachineRequired);

                                                                                                    return roundUp
                                                                                                    GrandtotalRoundUp = roundUp + GrandtotalRoundUp;
                                                                                                }
                                                                                                else {
                                                                                                    roundUp = Math.ceil(MachineRequired);
                                                                                                    return roundUp;
                                                                                                    GrandtotalRoundUp = roundUp + GrandtotalRoundUp;
                                                                                                }


                                                                                            })()

                                                                                        }


                                                                                    </span>

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

                                                <div class="row">
                                                    <div class="col-lg-12  d-none d-sm-none d-md-block d-lg-block">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <div class="active-member">
                                                                    <div className="text-left">
                                                                        <h3>Order Total Sammary</h3>
                                                                    </div>



                                                                    <div class="table-responsive d-none d-sm-none d-md-block d-lg-block">
                                                                        <table class="table  mb-0" id='myid1'>
                                                                            <thead>

                                                                                <tr className="font-weight-bold">

                                                                                    <th>Grand Total of SMV</th>
                                                                                    <th>Total Rate</th>
                                                                                    <th>Grand Total Rate</th>
                                                                                    {/* <th>Total Machine Required</th> */}
                                                                                    <th>Grand Total Manuals</th>
                                                                                    <th>Total Press Operators</th>
                                                                                    <th>Total Machine Operators</th>

                                                                                    {/* <th>Total Round Up</th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>

                                                                                    <td>

                                                                                        <div class="mt-2 ml-3 label badge gradient-6 text-white">
                                                                                            {
                                                                                                smv.toFixed(2)
                                                                                            }
                                                                                        </div>


                                                                                    </td>
                                                                                    <td>
                                                                                        <span className="label badge gradient-7">
                                                                                            {
                                                                                                GrandTotalRate = (rate + garmentValue).toFixed(2)
                                                                                            }



                                                                                        </span>

                                                                                    </td>
                                                                                    <td>
                                                                                        <span className="label badge gradient-11 text-white">{
                                                                                            (GrandTotalRate / 12).toFixed(2)
                                                                                        }</span>
                                                                                    </td>
                                                                                    {/* <td>
                                                            <span className="label gradient-5 badge">
                                                                {
                                                                    // GrandTotalMachineRequired.toFixed(2)
                                                                } 
                                                                </span> 
                                                            </td> */}
                                                                                    <td>
                                                                                        <span className="label badge gradient-5">
                                                                                            {
                                                                                                sam.filter(item => item.Machine_type === 'Manual').length
                                                                                            }
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span className="label badge gradient-4">
                                                                                            {
                                                                                                sam.filter(item => item.Operation === 'Press').length
                                                                                            }
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="badge bg-primary">
                                                                                            {
                                                                                                sam.filter(item => item.Operation != 'Manual').length
                                                                                            }
                                                                                        </div>
                                                                                    </td>
                                                                                    {/* <td>
                                                                                        <span className=" badge gradient-11">
                                                                                            {
                                                                                                GrandtotalRoundUp
                                                                                            }
                                                                                        </span>
                                                                                    </td> */}
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>



                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>




                                                </div>

                                                <div class="row my-5">
                                                    <div class="col-lg-12">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <h3>Machine Information Summary</h3>
                                                                <div class="active-member">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-xs mb-0 header-border table-hover verticle-middle" id='#myidcontent'>
                                                                            <thead>

                                                                                <tr>

                                                                                    <th>Machine Name</th>
                                                                                    <th>Total Machine Quantity</th>
                                                                                    <th>SMV</th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;S.N.L.S</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "S.N.L.S").length + 1
                                                                                        }
                                                                                        </span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-7 badge">{sam.filter(list => list.Machine_type === "S.N.L.S").reduce((a, b) => a + b.Smv, 0).toFixed(2)}</span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-2"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;S.N.L.S .E.T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "S.N.L.S .E.T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-4 badge">{
                                                                                        sam.filter(list => list.Machine_type === "S.N.L.S .E.T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;D.N.L.S</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "D.N.L.S").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-2 badge">{
                                                                                        sam.filter(list => list.Machine_type === "D.N.L.S").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-4"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;S.N.C.S</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "S.N.C.S").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-5 badge">{
                                                                                        sam.filter(list => list.Machine_type === "S.N.C.S").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>

                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F.O.A</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F.O.A").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-7 badge">{
                                                                                        sam.filter(list => list.Machine_type === "F.O.A").reduce((a, b) => a + b.Smv, 0).toFixed(2)}

                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-2"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;O/L</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "O/L").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-4 badge">{
                                                                                        sam.filter(list => list.Machine_type === "O/L").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;3TH O/L</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "3TH O/L").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-2 badge">{
                                                                                        sam.filter(list => list.Machine_type === "3TH O/L").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-4"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;4TH O/L</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "4TH O/L").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-5 badge">{
                                                                                        sam.filter(list => list.Machine_type === "4TH O/L").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;B.T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "B.T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-7 badge">{
                                                                                        sam.filter(list => list.Machine_type === "B.T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-2"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;B.H</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "B.H").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-4 badge">{
                                                                                        sam.filter(list => list.Machine_type === "B.H").reduce((a, b) => a + b.Smv, 0).toFixed(2)}

                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;B.F</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "B.F").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-2 badge">{
                                                                                        sam.filter(list => list.Machine_type === "B.F").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-4"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;4.N.C.S</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "4.N.C.S").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-5 badge">{
                                                                                        sam.filter(list => list.Machine_type === "4.N.C.S").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;M/N</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "M/N").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-7 badge">{
                                                                                        sam.filter(list => list.Machine_type === "M/N").reduce((a, b) => a + b.Smv, 0).toFixed(2)}

                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-2"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F/L 2T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F/L 2T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-4 badge">{
                                                                                        sam.filter(list => list.Machine_type === "F/L 2T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F/L 3T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F/L 3T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-2 badge">{
                                                                                        sam.filter(list => list.Machine_type === "F/L 3T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-4"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F/L 4T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F/L 4T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-5 badge">{

                                                                                        sam.filter(list => list.Machine_type === "F/L 4T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F/L 5T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F/L 5T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-7 badge">{
                                                                                        sam.filter(list => list.Machine_type === "F/L 5T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-2"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;F/L 6T</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "F/L 6T").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-4 badge">{
                                                                                        sam.filter(list => list.Machine_type === "F/L 6T").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;B.S</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "B.S").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-2 badge">{
                                                                                        sam.filter(list => list.Machine_type === "B.S").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>
                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-4"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;Heat Seal</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "Heat Seal").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-5 badge">{
                                                                                        sam.filter(list => list.Machine_type === "Heat Seal").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>

                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-industry"></span></div>
                                                                                            <div class="mt-2">&nbsp;Roll Cutting Machine</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "Roll Cutting Machine").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-8 badge">{
                                                                                        sam.filter(list => list.Machine_type === "Roll Cutting Machine").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>

                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-calculator"></span></div>
                                                                                            <div class="mt-2">&nbsp;Total Machine Operators</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type !== "Manual").length - 1
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-8 badge">{
                                                                                        sam.filter(list => list.Machine_type !== "Manual").reduce((a, b) => a + b.Smv, 0).toFixed(2)}
                                                                                    </span></td>

                                                                                </tr>

                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-calculator"></span></div>
                                                                                            <div class="mt-2">&nbsp;Total Press Operators</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Operation === "Press").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-8 badge">{
                                                                                        sam.filter(list => list.Operation === "Press").reduce((a, b) => a + b.Smv, 0).toFixed(2)

                                                                                    }</span></td>

                                                                                </tr>

                                                                                <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-calculator"></span></div>
                                                                                            <div class="mt-2">&nbsp;Total Manual</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            sam.filter(list => list.Machine_type === "Manual").length
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-8 badge">{
                                                                                        sam.filter(list => list.Machine_type === "Manual").reduce((a, b) => a + b.Smv, 0).toFixed(2)
                                                                                    }</span></td>

                                                                                </tr>


                                                                                {/* <tr>

                                                                                    <td>
                                                                                        <div class="d-flex text-center">
                                                                                            <div class="box gradient-1"><span class="fa fa-calculator"></span></div>
                                                                                            <div class="mt-2">&nbsp;Grand Total</div>
                                                                                        </div>

                                                                                    </td>

                                                                                    <td>
                                                                                        <span>{
                                                                                            GrandtotalRoundUp
                                                                                        }</span>

                                                                                    </td>

                                                                                    <td><span class="label gradient-8 badge">{
                                                                                        smv
                                                                                    }</span></td>

                                                                                </tr> */}

                                                                                {/* <tr>
                                                        <td>
                                                        <div class="d-flex text-center">
                                                                <div class="box gradient-3"><span class="fa fa-industry"></span></div>
                                                                <div class="mt-2">&nbsp;
                                                                Extra Machine Names That <br/>
                                                                not included in default list</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            Machine Name =
                                                        {
                                                            //   extraMachine.toString()
                                                            
                                                        }<br/>
                                                        Qty =
                                                        {
                                                            // excounter
                                                        }
                                                        <br/>
                                                        SQ No# =
                                                        {
                                                            //  counterextra.toString()
                                                        }
                                                        </td>
                                                        <td>
                                                        <h4> Final Total Machine Operators =</h4>
                                                    
                                                        <span>
                                                            {
                                                        
                                                            
                                                                sam.filter(list=>list.Machine_type!=="Manual").length
                                                            
                                                            
                                                            }
                                                            </span>  
                                                        </td>
                                                    
                                                    </tr> */}


                                                                            </tbody>

                                                                        </table>
                                                                    </div>
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
                    </div>

                </div>
            </main>

            <RightSideBarNav />


        </div>
    )
}

export default SamDashboard