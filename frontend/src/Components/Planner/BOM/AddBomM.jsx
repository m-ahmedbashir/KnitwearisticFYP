import React, { useState } from 'react'
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'
import { db, storage } from "../../../Config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';

const ADD_BOM = () => {
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = user.token;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [percentage, setPercentage] = useState(0);
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


  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  const uploadImage = (e) => {
    e.preventDefault();
    setLoading(true);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(progress);
        switch (snapshot.state) {
          case 'paused':
            setSuccess('Upload is paused');
            break;
          case 'running':
            setSuccess('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setBomOrder({ ...bomOrder, uid: downloadURL });
          setLoading(false);
        });
      }
    );
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



  const formData = {
    bom,
    bomOrder,
    formFields
  }

  const handleSubmit = async e => {
    e.preventDefault();

    await fetch('/upload/bom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": token
      },
      body: JSON.stringify(formData)
    }).then((res) => {
      res.json()
      window.location.replace('/boms')
    }).then(result => console.log(result))

  }


  return (
    <>

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
                <input type="text" className='form-control' placeholder='Item Sequence' name="iSeq" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Operation Sequence</h5>
                <input type="text" className='form-control' placeholder='Operation Sequence' name="opSeq" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Item Code</h5>
                <input type="text" className='form-control' placeholder='Item Code' name="iCode" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Item Description</h5>
                <input type="text" className='form-control' placeholder='Item Description' name="iDes" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>UOM</h5>
                <input type="text" className='form-control' placeholder='UOM' name="uom" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Item Quantity</h5>
                <input type="text" className='form-control' placeholder='Item Quantity' name="iQuan" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Size</h5>
                <input type="text" className='form-control' placeholder='Size' name="size" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Supplier</h5>
                <input type="text" className='form-control' placeholder='Supplier' name="sup" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Garment Cost</h5>
                <input type="text" className='form-control' placeholder='Garment Cost' name="gCost" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Rate</h5>
                <input type="text" className='form-control' placeholder='Rate' name="rate" onChange={handleBom} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Comments</h5>
                <input type="text" className='form-control' placeholder='Comments' name="comments" onChange={handleBom} required />

              </div>
              <div className="col-sm-6 mb-4">
                <h5>Garment Picture</h5>
                {
                  success && <div className="alert alert-success">
                    {
                      success
                    }
                  </div>
                }
                <div class="form-group d-flex justify-content-center">
                  {
                    loading ?
                      <div className="text-center">
                        <div className="spinner-border" style={{ width: "100px", height: "100px" }}>
                          <span className="visually-hidden">
                            loading...
                          </span>
                        </div>
                      </div>


                      :
                      <input
                        type='file'
                        name='url'
                        onChange={handleImage}
                        class="form-control"
                        id="url"
                        placeholder="Profile Image"
                        disabled={bomOrder.uid ? true : false}
                      />
                  }
                  <button className='btn btn-primary mx-2' onClick={uploadImage}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              <h1>BOM ORDER</h1>
              <div className="col-md-6 mb-4">

                <h5>Finish Item Code</h5>
                <input type="text" className='form-control' placeholder='Finish Item Code' name="fItemCode" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Finish Item Description</h5>
                <input type="text" className='form-control' placeholder='Finish Item Description' name="fitemDesc" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Finish UOM</h5>
                <input type="text" className='form-control' placeholder='Finish UOM' name="fUom" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Standard Minutes</h5>
                <input type="text" className='form-control' placeholder='Standard Minutes' name="stMin" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Customer Name</h5>
                <input type="text" className='form-control' placeholder='Customer Name' name="cusName" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Style</h5>
                <input type="text" className='form-control' placeholder='Style' name="style" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>BOM Date</h5>
                <input type="date" className='form-control' placeholder='Bom Date' name="bomDate" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Exchange Rate</h5>
                <input type="text" className='form-control' placeholder='Exchange Rate' name="exRate" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Date Exchange Rate</h5>
                <input type="date" className='form-control' placeholder='Date Exchange Rate' name="dExrate" onChange={handleBomOrder} required />

              </div>
              <div className="col-md-6 mb-4">

                <h5>Customization</h5>
                <input type="text" className='form-control' placeholder='Customization' name="cust" onChange={handleBomOrder} required />

              </div>

            </div>



            {formFields.map((form, index) => {
              return (
                <div key={index} class="d-flex justify-content-between">
                  <input
                    name='label'
                    placeholder='label name'
                    className='form-control mx-2 my-2'
                    onChange={event => handleFormChange(event, index)}
                    value={form.label}
                  />
                  <input
                    name='property'
                    className='form-control mx-2 my-2'
                    placeholder='property name'
                    onChange={event => handleFormChange(event, index)}
                    value={form.property}
                  />
                  <button onClick={() => removeFields(index)} className="btn btn-danger my-2" >Remove</button>
                </div>
              )
            })}

            <div className="d-grid">
              <button onClick={addFields} className="my-4 btn btn-primary">Add More Items</button>
            </div>
            <br />


            <div className="d-grid">
              <button type='submit' onClick={handleSubmit} className="btn btn-primary" >Submit</button>
            </div>

          </div>
        </div>

      </main>
    </>
  )
}

export default ADD_BOM





