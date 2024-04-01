import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
function MainNavBar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const changelight = () => {
    if (localStorage.getItem('mode') === 'dark') {
      localStorage.setItem('mode', 'light')
      window.location.reload();
    } else {
      localStorage.setItem('mode', 'dark')
      window.location.reload();
    }
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }



  return (
    <div className='mb-4'>
      <nav class="navbar navbar-expand-lg  navbar-fixed-lg navbar-light bg-white sticky">
        <div class="container-fluid">

          <img class="navbar-brand" style={{ height: "70px" }} src="https://firebasestorage.googleapis.com/v0/b/images-107c9.appspot.com/o/logo.png?alt=media&token=a96485fa-d7ac-4bf6-aa05-b7df0fff9592" alt="Logo" data-hs-theme-appearance="default" />
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarSupportedContent" >
            <ul class="navbar-nav px-lg-5  me-auto mb-2 mb-lg-0 d-flex justify-content-end ">
              <li class="nav-item">
                <Link to="/" className='nav-link'>Home</Link>
              </li>
              {
                user && user.userRole === 'Admin' ?
                  <li class='nav-item'>
                    <Link to="/admin" className='nav-link'>Admin</Link>
                  </li>
                  : null

              }

              {
                user && user.userRole === 'planner' ?
                  <li class='nav-item'>
                    <Link to="/app" className='nav-link'>Planner</Link>
                  </li>
                  : null
              }
              {
                user && user.userRole === 'owner' ?
                  <li className='nav-item'>
                    <Link to="/owner" className='nav-link'>Onwer</Link>
                  </li>
                  : null
              }


              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Feature
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#Activity Monitoring">Activity Monitoring</a></li>
                  <li><a class="dropdown-item" href="#Bill of Material (BOM)">Bill of Material</a></li>
                  <li><a class="dropdown-item" href="#Capacity Holding">Capacity Holding</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#Operation Bulletin">Operation Bulletin</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#Pricing">Pricing</a>
              </li>

              <li class="nav-item">
                <a class="nav-link " href="#FAQ" tabindex="-1" >FAQ</a>
              </li>
              <li class="nav-item">
                <a className="nav-link" href='#' onClick={changelight}>
                  <i class="fa-solid fa-moon" style={{ fontSize: '20px' }}></i>
                </a>
              </li>

              {
                user && (user.userRole === 'Admin' || user.userRole === "owner" || user.userRole === "planner") ?
                  null
                  : !user ?
                    null
                    :
                    <Link className='btn btn-primary' to='/showorders'>
                      Dashboard
                    </Link>
              }
              {
                user && (user.userRole === "Admin" && user.upgraded === false) ?
                  <li className='nav-item'>
                    <Link to="/upgrade" className='btn btn-primary'>Upgrade</Link>
                  </li>
                  : !user ?
                    null
                    : null
              }
            </ul>
            {user ?
              <>

                <a class="nav-link mt-2" href="#">{user.name}</a>

                <div class="avatar avatar-sm avatar-circle mt-2">
                  <img class="avatar-img " src={user.url ? user.url : 'https://firebasestorage.googleapis.com/v0/b/images-107c9.appspot.com/o/dummy.png?alt=media&token=4ab4c4bf-616d-4133-b36d-c82d4c023125'} alt="Image Description" />
                </div>
                <button class="btn btn-primary btn-lg mx-5 mt-2" onClick={onLogout} >Logout</button>

              </> :
              <form class="d-flex justify-content-center">
                <Link to='/register' class="btn btn-defualt  " type="submit">Sign Up</Link>
                <Link to='/login' class="btn btn-primary" type="submit" style={{ marginTop: "-4px" }}>Login</Link>
              </form>}

          </div>
        </div>
      </nav>

    </div>
  )
}

export default MainNavBar