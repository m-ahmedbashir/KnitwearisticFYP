import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import Header from '../../ShareUI/Header';
import VerticalNavbar from '../VerticalNavbar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
function ShowSingleBom() {
    const { id } = useParams();


    const [bom, setBom] = useState({
    })




    const [formFields, setFormFields] = useState([
        { label: '', property: '' },
    ])




    const getBom = async () => {
        const res = await axios.get(`/api/bom/${id}`);
        setBom({
            ...bom,
            iSeq: res.data.BOM[0].itemSequence,
            opSeq: res.data.BOM[0].operationSequence,
            iCode: res.data.BOM[0].itemcode,
            iDes: res.data.BOM[0].itemDescription,
            uom: res.data.BOM[0].UOM,
            iQuan: res.data.BOM[0].itemQuantity,
            size: res.data.BOM[0].size,
            sup: res.data.BOM[0].Suplier,
            gCost: res.data.BOM[0].garmentCost,
            rate: res.data.BOM[0].Rate,
            comments: res.data.BOM[0].Comments

        });


        // 
        //set form fields with Extras array
        setFormFields(res.data.Extras)

    }



    const generatePDF = (e) => {
        e.preventDefault();

        const doc = new jsPDF()
        autoTable(doc, { html: '#myid1content' })

        doc.save('OderStatus.pdf')
    }




    useEffect(() => {
        getBom();
    }, []);
    return (
        <div>

            <main id="content" role="main" class="main" >
                <div className="pt-5">

                    <Header title={'Add BOM'} />

                </div>
                <div className=" content container" style={{ marginTop: "-20rem" }}>


                    <VerticalNavbar active={'addbom'} />
                    <div class="sidebar-detached-content mt-3 mt-lg-0 card px-4">
                        <div className="d-flex justify-content-between py-5">
                            <h4>
                                Bill Of Material Detail
                            </h4>
                            <button className='btn btn-primary' onClick={generatePDF}>
                                Download PDF
                            </button>
                        </div>
                        <table className='table table-hover py-5' id="myid1content">
                            <thead>
                                <tr>
                                    <td>
                                        <h4> Bill of Material Properties</h4>
                                    </td>
                                    <td>
                                        <h4>  Detail</h4>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        Item Squence
                                    </td>
                                    <td>
                                        <span className='badge bg-primary'>
                                            {
                                                bom.iSeq
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Operation Sequence
                                    </td>
                                    <td>
                                        <span className="badge bg-primary">
                                            {
                                                bom.opSeq
                                            }
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Item Code
                                    </td>
                                    <td>
                                        <span className='badge bg-secondary'>
                                            {
                                                bom.iCode
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Description
                                    </td>
                                    <td>
                                        <span className='badge bg-primary'>
                                            {
                                                bom.iDes
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Unit of Measure
                                    </td>
                                    <td>
                                        <span className='badge gradient-11'>
                                            {
                                                bom.uom
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Item Quantity
                                    </td>
                                    <td>
                                        <span className='badge bg-danger'>
                                            {
                                                bom.iQuan
                                            }
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        garment Cost
                                    </td>
                                    <td>
                                        <span className='badge bg-primary'>
                                            {
                                                bom.gCost
                                            }
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Suplier
                                    </td>
                                    <td>
                                        <span className='badge bg-success'>
                                            {
                                                bom.sup
                                            }
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Comments
                                    </td>
                                    <td>
                                        {
                                            bom.comments
                                        }
                                    </td>
                                </tr>
                                {formFields.map((form, index) => {
                                    return (
                                        <tr key={index} >
                                            <td className="form-group col-sm-5">
                                                {
                                                    form.label
                                                }
                                            </td>
                                            <td className="form-group col-sm-5">
                                                {
                                                    form.property
                                                }
                                            </td>


                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

        </div>

    )
}

export default ShowSingleBom