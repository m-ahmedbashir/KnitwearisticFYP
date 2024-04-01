import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'
const BillOfMaterial = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [bomOrder, setBomOrder] = useState({
    fItemCode: "",
    fitemDesc: "",
    fUom: "",
    stMin: "",
    cusName: "",
    style: "",
    bomDate: "",
    exRate: "",
    dExrate: "",
    cust: "",
    uid: ""
  })

  const [bom, setBom] = useState({
    iSeq: "",
    opSeq: "",
    iCode: "",
    iDes: "",
    uom: "",
    iQuan: "",
    size: "",
    sup: "",
    gCost: "",
    rate: "",
    comments: ""
  })




  const [formFields, setFormFields] = useState([
    { label: '', property: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  const addFields = () => {
    let object = {
      label: '',
      property: ''
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  const handleBom = e => {
    setBom({
      ...bom, [e.target.name]: e.target.value
    })
  }

  const handleBomOrder = e => {
    setBomOrder({
      ...bomOrder, [e.target.name]: e.target.value
    })
  }




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

    setBomOrder({
      ...bomOrder,
      fItemCode: res.data.finishItemCode,
      fitemDesc: res.data.finishItemDescription,
      fUom: res.data.finishUOM,
      stMin: res.data.StandardMinutes,
      cusName: res.data.CustomerName,
      style: res.data.style,
      bomDate: res.data.BomDate,
      exRate: res.data.ExchangeRate,
      dExrate: res.data.DateExchangeRate,
      cust: res.data.Customization,
      uid: res.data.UID
    })
    // 
    //set form fields with Extras array
    setFormFields(res.data.Extras)
    setData(res.data);
  }




  const formData = {
    bom,
    bomOrder,
    formFields
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.put(`/api/bom/update/${id}`, formData);
    console.log(res.data);


  }


  useEffect(() => {
    getBom();
  }, []);










  return (
    <div>
      <>
        <ProtectedNavBar />
        <main id="content" role="main" class="main" >
          <div className="pt-5">
            <Header title={'Add BOM'} />

          </div>
          <div className=" content container" style={{ marginTop: "-20rem" }}>


            <VerticalNavbar active={'addbom'} />
            <div class="sidebar-detached-content mt-3 mt-lg-0 card px-4">
              <div className='row py-5'>
                <h1>BOM</h1>
                <div className="col-md-6 mb-4">

                  <h5>Item Sequence</h5>
                  <input type="text" className='form-control' placeholder='Item Sequence' value={bom.iSeq} name="iSeq" onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Operation Sequence</h5>
                  <input type="text" className='form-control' value={bom.opSeq} placeholder='Operation Sequence' name="opSeq" onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Item Code</h5>
                  <input type="text" className='form-control' placeholder='Item Code' name="iCode" value={bom.iCode} onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Item Description</h5>
                  <input type="text" className='form-control' placeholder='Item Description' value={bom.iDes} name="iDes" onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>UOM</h5>
                  <input type="text" className='form-control' placeholder='UOM' name="uom" value={bom.uom} onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Item Quantity</h5>
                  <input type="text" className='form-control' placeholder='Item Quantity' value={bom.iQuan} name="iQuan" onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Size</h5>
                  <input type="text" className='form-control' placeholder='Size' name="size" value={bom.size} onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Supplier</h5>
                  <input type="text" className='form-control' placeholder='Supplier' name="sup" value={bom.sup} onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Garment Cost</h5>
                  <input type="text" className='form-control' placeholder='Garment Cost' value={bom.gCost} name="gCost" onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Rate</h5>
                  <input type="text" className='form-control' placeholder='Rate' name="rate" value={bom.rate} onChange={handleBom} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Comments</h5>
                  <input type="text" className='form-control' placeholder='Comments' name="comments" value={bom.comments} onChange={handleBom} />

                </div>
              </div>
              <div className='row'>
                <h1>BOM ORDER</h1>
                <div className="col-md-6 mb-4">

                  <h5>Finish Item Code</h5>
                  <input type="text" className='form-control' placeholder='Finish Item Code' value={bomOrder.fItemCode} name="fItemCode" onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Finish Item Description</h5>
                  <input type="text" className='form-control' value={bomOrder.fitemDesc} placeholder='Finish Item Description' name="fitemDesc" onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Finish UOM</h5>
                  <input type="text" className='form-control' value={bomOrder.fUom} placeholder='Finish UOM' name="fUom" onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Standard Minutes</h5>
                  <input type="text" className='form-control' placeholder='Standard Minutes' name="stMin" value={bomOrder.stMin} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Customer Name</h5>
                  <input type="text" className='form-control' placeholder='Customer Name' name="cusName" value={bomOrder.cusName} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Style</h5>
                  <input type="text" className='form-control' placeholder='Style' name="style" value={bomOrder.style} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>BOM Date</h5>
                  <input type="date" className='form-control' placeholder='Bom Date' name="bomDate" value={bomOrder.bomDate} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Exchange Rate</h5>
                  <input type="text" className='form-control' placeholder='Exchange Rate' name="exRate" value={bomOrder.exRate} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Date Exchange Rate</h5>
                  <input type="date" className='form-control' placeholder='Date Exchange Rate' name="dExrate" value={bomOrder.dExrate} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>Customization</h5>
                  <input type="text" className='form-control' placeholder='Customization' name="cust" value={bomOrder.cust} onChange={handleBomOrder} />

                </div>
                <div className="col-md-6 mb-4">

                  <h5>UID</h5>
                  <input type="text" className='form-control' placeholder='UID' name="uid" value={bomOrder.uid} onChange={handleBomOrder} />

                </div>
              </div>


              {formFields.map((form, index) => {
                return (
                  <div key={index} class="row">
                    <div className="form-group col-sm-5">
                      <label htmlFor="">
                        <h5>{form.label}</h5>
                      </label>
                      <input
                        name='label'
                        placeholder='label name'
                        className='form-control'
                        onChange={event => handleFormChange(event, index)}
                        value={form.label}
                      />
                    </div>
                    <div className="form-group col-sm-5">
                      <label htmlFor="">
                        <h5>{form.value}</h5>
                      </label>
                      <input
                        name='property'
                        className='form-control mt-2'
                        placeholder='Property name'
                        onChange={event => handleFormChange(event, index)}
                        value={form.property}
                      />
                    </div>

                    <div className="col-sm-2 mt-4">
                      <button onClick={() => removeFields(index)} className="btn btn-danger " >Remove</button>
                    </div>
                  </div>
                )
              })}

              <button onClick={addFields} className="my-4 btn btn-primary">Add More..</button>


              <button onClick={handleSubmit} style={{ marginBottom: '100px' }} className="btn btn-primary" >Submit</button>
            </div>
          </div>

        </main>
      </>
    </div>
  );
};

export default BillOfMaterial;
