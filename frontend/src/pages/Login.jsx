import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../Components/ShareUI/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

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
                  Login Page
                </div>
                <section className='form'>
                  <form onSubmit={onSubmit}>
                    <div className='form-group my-3'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
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
                      />
                    </div>

                    <div className='form-group my-2 text-center'>
                      <button type='submit' className='btn btn-primary px-5'>
                        Submit
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

export default Login
