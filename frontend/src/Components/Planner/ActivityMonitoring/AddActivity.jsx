import React, { useState } from 'react'
import Header from '../../ShareUI/Header';
import VerticalNavbar from '../VerticalNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { AddAcitvity } from '../../../app/Services/Activity';
import { toast } from 'react-toastify';
import { db, storage } from "../../../Config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function AddActivity() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = user.token;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [file, setFile] = useState(null);

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


  });

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
          setActivity({ ...activity, garmentPicture: downloadURL });
          setLoading(false);
        });
      }
    );
  }


  // check date is equal to today or not
  //  var oder=203;
  //  var orderq=2334;
  //  if(orderq>oder){
  //   setTimeout(() => {
  //     axios.get('http://localhost:5000/sendEmail').then(res=>{
  //         console.log(res.data);
  //     }
  //     ).catch(err=>{
  //         console.log(err);
  //     }
  //     )
  //   }, 5000);
  //  }



  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }



  //handlechange
  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const userData = {
        token,
        toast,
        activity,

      }
      dispatch(AddAcitvity(userData))

      e.target.reset();


    }
    catch (err) {


    }

  }

  return (
    <>


      <main id="content" role="main" class="main">
        <div className='pt-5'>
          <Header title={'Add Oder Activity'} />
        </div>
        <div className=" content container" style={{ marginTop: "-20rem" }}>
          <VerticalNavbar active={"Add"} />
          <div className="sidebar-detached-content mt-3 mt-lg-0 card">
            <form className='py-5 px-5'>


              <div className="form-group">
                <label htmlFor="merchandizer">Merchandizer</label>
                <input type="text" className="form-control" id="merchandizer" required name="merchandizer" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="customer">Customer</label>
                <input type="text" className="form-control" id="customer" name="customer" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="leadingPerson">Leading Person</label>
                <input type="text" className="form-control" id="leadingPerson" name="leadingPerson" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="CustomerProductOrder">Customer Product Order</label>
                <input type="text" className="form-control" id="CustomerProductOrder" name="CustomerProductOrder" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input type="text" className="form-control" id="category" name="category" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="productStyle">Product Style</label>
                <input type="text" className="form-control" id="productStyle" name="productStyle" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="Emblishment">Emblishment</label>
                <input type="text" className="form-control" id="Emblishment" name="Emblishment" onChange={handleChange} required />
              </div>
              <label htmlFor="url" className='py-5'>Upload Profile Image</label>
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
                      disabled={activity.garmentPicture ? true : false}
                    />
                }
                <button className='btn btn-primary mx-2' onClick={uploadImage}>
                  Upload
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" name="price" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="text" className="form-control" id="quantity" name="quantity" onChange={handleChange} required />
              </div>




              <div className="d-grid my-4" >
                <button className='btn btn-primary' onClick={handleSubmit}>
                  Save
                </button>

              </div>


            </form>



          </div>


        </div>
      </main>

    </>
  )
}

export default AddActivity