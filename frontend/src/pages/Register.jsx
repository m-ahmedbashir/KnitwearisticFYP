import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { register, reset } from '../features/auth/authSlice'
import Spinner from '../Components/ShareUI/Spinner'
import { db, storage } from "../Config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    businessemail: '',
    capacity: '',
    companyDomain: '',
    companyName: '',
    url: '',
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [file, setFile] = useState(null);

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
          setFormData({ ...formData, url: downloadURL })
          setLoading(false);
        });
      }
    );
  }

  const { name, email, password, password2, businessemail, capacity, companyDomain, companyName, url } = formData


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        businessemail,
        capacity,
        companyDomain,
        companyName,
        url,


      }

      dispatch(register(userData))
    }
  }
  console.log(formData.url);
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <main id="content" role="main" class="main py-5" >
        <div class="position-fixed top-0 end-0 start-0 bg-img-start bg-gradient" style={{ height: "32rem" }}>

          <div class="shape shape-bottom zi-1">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
              <polygon fill="#fff" points="0,198 1921,273 1921,0 " />
            </svg>
          </div>

        </div>


        <div class="container py-5 py-sm-7">


          <div class="mx-auto" style={{ maxWidth: "30rem" }}>

            <div class="card card-lg mb-5">

              <div class="card-body">
                <div className="display-6 text-dark text-center">
                  Sign Up
                </div>

                <section className='form'>
                  <form onSubmit={onSubmit}>
                    <label htmlFor="url" className='py-5'>Upload Profile Image</label>
                    <div class="form-group d-flex justify-content-center">
                      {
                        loading ? <Spinner /> :
                          <input
                            type='file'
                            name='url'
                            onChange={handleImage}
                            class="form-control"
                            id="url"
                            placeholder="Profile Image"
                            disabled={formData.url ? true : false}
                          />
                      }
                      <button className='btn btn-primary mx-2' onClick={uploadImage}>
                        Upload
                      </button>
                    </div>

                    <div className='form-group my-3'>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your Name'
                        onChange={onChange}
                        required
                      />

                    </div>
                    <div className="form-group my-3">
                      <input
                        type='text'
                        className='form-control'
                        id='companyName'
                        name='companyName'
                        value={companyName}
                        placeholder='Enter your Company Name'
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group my-3">
                      <input
                        type='number'
                        className='form-control'
                        id='capacity'
                        name='capacity'
                        value={capacity}
                        placeholder='Enter your Capacity e.g 3000 pices in month'
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group my-3">
                      <input
                        type='text'
                        className='form-control'
                        id='businessemail'
                        name='businessemail'
                        value={businessemail}
                        placeholder='Enter your Business Email'
                        onChange={onChange}
                        required
                      />

                    </div>

                    <div className="form-group my-3">
                      <input
                        type='text'
                        className='form-control'
                        id='companyDomain'
                        name='companyDomain'
                        value={companyDomain}
                        placeholder='Enter your Company Domain'
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className='form-group my-3'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter Your Email'
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className='form-group my-3'>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className='form-group my-3'>
                      <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm Password'
                        onChange={onChange}
                        required
                      />
                    </div>



                    <div className='form-group my-3 text-center'>
                      <button type='submit' className='btn btn-primary ' disabled={loading ? true : false} >
                        Register
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>

      </main>

    </>
  )
}

export default Register
