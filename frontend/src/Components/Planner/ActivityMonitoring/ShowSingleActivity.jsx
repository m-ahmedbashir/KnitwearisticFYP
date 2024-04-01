import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { useSelector } from 'react-redux';
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import AdminVerticalNabar from '../../Admin/AdminVerticalNavbar';
function ShowSingleActivity() {

    const { user } = useSelector((state) => state.auth);
    const token = user.token;
    const params = useParams();
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [activity, setActivity] = useState({

        merchandizer: '',
        customer: '',
        leadingPerson: '',
        CustomerProductOrder: '',
        category: '',
        productStyle: '',
        Emblishment: '',
        garmentPicture: '',
        price: 0,
        quantity: 0,
        bulkTesting: false,
        ApprovalDate: '',
        ApprovalStatus: '',
        cuttingStatus: '',
        cuttingQuantity: 0,
        cuttingLoad: 0,
        cuttingDate: '',
        stichQuantity: 0,
        stichLoad: 0,
        StichStatus: '',
        StichDate: '',
        printQuantity: 0,
        printLoad: 0,
        printStatus: '',
        printDate: '',
        emblimentQuantity: 0,
        emblimentLoad: 0,
        emblimentStatus: '',
        emblimentDate: '',
        washingQuantity: 0,
        washingLoad: 0,
        washingStatus: '',
        washingDate: '',
        packingQuantity: 0,
        packingLoad: 0,
        packingStatus: '',
        packingDate: '',

        finishingQuantity: 0,
        finishingLoad: 0,
        finishingStatus: '',
        finishingDate: '',

    });




    const getActivity = () => {
        try {
            setLoading(true);
            axios.get(`http://localhost:5000/showAcitvity/${params.id}`, {
                headers: {
                    'authorization': token
                }

            }).then((res) => {

                if (res) {
                    setActivity(res.data);
                    setLoading(false);
                    setSuccess("Order loaded successfully")
                }
            }).catch((err) => {
                setError(err.message)
            })

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }

    const generatePDF = (e) => {
        e.preventDefault();

        const doc = new jsPDF()
        autoTable(doc, { html: '#myid1content' })

        doc.save('OderStatus.pdf')
    }
    useEffect(() => {

        if (user) {
            getActivity();
        }



    }, [user]);

    return (
        <>


            <main id="content" role="main" class="main bg-light">
                <div className="pt-5">
                    <Header title={'Activities Page'} />
                </div>

                <div className="content container" style={{ marginTop: "-20rem" }}>
                    {
                        user && user.userRole === "Admin" ?
                            <AdminVerticalNabar />
                            :
                            <VerticalNavbar active={'showSam'} />
                    }
                    <div className="row card  px-5  py-5 sidebar-detached-content mt-3 mt-lg-0">

                        {
                            success && <div className="alert alert-success">{success}</div>
                        }
                        {
                            error && <div className="alert alert-danger">{error}</div>
                        }
                        {
                            loading && <div className="alert alert-info">Loading...</div>
                        }
                        <div className="d-flex justify-content-between">
                            <h1 className='py-5'>
                                Order Detail
                            </h1>
                            <button className='btn btn-primary' onClick={generatePDF}>
                                Generate PDF
                            </button>
                        </div>

                        <table className='table table-hover' id="myid1content">
                            <thead>
                                <tr>
                                    <td>
                                        <h4> Order Properties</h4>
                                    </td>
                                    <td>
                                        <h4>  Detail</h4>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Garment Picture
                                    </td>
                                    <td>
                                        <img src={
                                            activity.garmentPicture ?
                                                activity.garmentPicture :
                                                "https://firebasestorage.googleapis.com/v0/b/images-107c9.appspot.com/o/t-1.jpg?alt=media&token=9b3d89c6-03dd-4196-91ac-a048bc8cb6da"
                                        } alt="" className="avatar avatar-xxl avatar-circle" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Merchandizer
                                    </td>
                                    <td>
                                        {
                                            activity.merchandizer
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Leading Person
                                    </td>
                                    <td>
                                        {
                                            activity.leadingPerson
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Customer
                                    </td>
                                    <td>
                                        {
                                            activity.customer
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.quantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Garment Category
                                    </td>
                                    <td>
                                        {
                                            activity.category
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Garment Style
                                    </td>
                                    <td>
                                        {
                                            activity.productStyle
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emblishment
                                    </td>
                                    <td>
                                        {
                                            activity.Emblishment
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emblishment Date
                                    </td>
                                    <td>
                                        {
                                            activity.emblimentDate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emblishment Load
                                    </td>
                                    <td>
                                        {
                                            activity.emblimentLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emblishment Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.emblimentQuantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Emblishment Status
                                    </td>
                                    <td>
                                        {
                                            activity.emblimentStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Bulk Testing
                                    </td>
                                    <td>
                                        {
                                            activity.bulkTesting
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Approval Status
                                    </td>
                                    <td>
                                        {
                                            activity.ApprovalStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Approval Date
                                    </td>
                                    <td>
                                        {
                                            activity.ApprovalDate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cutting Status
                                    </td>
                                    <td>
                                        {
                                            activity.cuttingStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cutting Date
                                    </td>
                                    <td>
                                        {
                                            activity.cuttingDate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cutting Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.cuttingQuantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cutting Load
                                    </td>
                                    <td>
                                        {
                                            activity.cuttingLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cutting Status
                                    </td>
                                    <td>
                                        {
                                            activity.cuttingStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Stiching Status
                                    </td>
                                    <td>
                                        {
                                            activity.StichStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Stiching Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.stichQuantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Stiching Load
                                    </td>
                                    <td>
                                        {
                                            activity.stichLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Stiching date
                                    </td>
                                    <td>
                                        {
                                            activity.StichDate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Printing Date
                                    </td>
                                    <td>
                                        {
                                            activity.printDate
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Finishing  Status
                                    </td>
                                    <td>
                                        {
                                            activity.printStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Printing Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.quantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Printing Load
                                    </td>
                                    <td>
                                        {
                                            activity.stichLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Finishing Status
                                    </td>
                                    <td>
                                        {
                                            activity.finishingStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Finishing load
                                    </td>
                                    <td>
                                        {
                                            activity.finishingLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Finishing Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.finishingQuantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Packing load
                                    </td>
                                    <td>
                                        {
                                            activity.packingLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Packing Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.packingQuantity
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Packing load
                                    </td>
                                    <td>
                                        {
                                            activity.packingLoad
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Packing status
                                    </td>
                                    <td>
                                        {
                                            activity.packingStatus
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Remainig Quantity
                                    </td>
                                    <td>
                                        {
                                            activity.remainingQuantity

                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                    </div>
                </div>
            </main>




        </>
    )
}

export default ShowSingleActivity