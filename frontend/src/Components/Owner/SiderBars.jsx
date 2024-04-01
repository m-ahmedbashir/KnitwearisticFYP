import React from 'react'
import { Link } from 'react-router-dom'
function SiderBars() {
  const changedark = () => {
    localStorage.setItem('mode', 'dark')
    window.location.reload();
  }
  const changelight = () => {
    localStorage.setItem('mode', 'light')
    window.location.reload();
  }
  return (
    <div class="navbar-expand-lg">
      <button class="navbar-toggler text-white border-white-10 w-100 mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalNavMenu" aria-controls="navbarVerticalNavMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="d-flex justify-content-between align-items-center">
          <span class="navbar-toggler-text text-white">Menu</span>
          <span class="navbar-toggler-default">
            <i class="fa fa-bars"></i>
          </span>
          <span class="navbar-toggler-toggled">
            <i class="fa fa-bars"></i>
          </span>
        </span>
      </button>


      <aside id="navbarVerticalNavMenu" class="js-navbar-vertical-aside navbar navbar-vertical navbar-vertical-absolute navbar-vertical-detached navbar-shadow navbar-collapse collapse bg-white rounded-2">
        <div class="navbar-vertical-container">
          <div class="navbar-vertical-footer-offset">

            <div class="navbar-vertical-content">
              <div id="navbarVerticalMenu" class="nav nav-pills nav-vertical card-navbar-nav">

                <div class="nav-item ">
                  <Link class={localStorage.getItem('mode') === 'dark' ? "nav-link text-white" : "nav-link"} to="/owner" >
                    <i class="fas fa-th py-1 px-4"></i>
                    <span class="nav-link-title">Admin Dashbaord</span>
                  </Link>
                  <Link class={localStorage.getItem('mode') === 'dark' ? "nav-link text-white" : "nav-link"} to="/addOperation" >
                    <i class="fas fa-add py-1 px-4"></i>
                    <span class="nav-link-title">Add Operations</span>
                  </Link>
                  <Link class={localStorage.getItem('mode') === 'dark' ? "nav-link text-white" : "nav-link"} to="/showOperation" >
                    <i class="fas fa-eye py-1 px-4"></i>
                    <span class="nav-link-title">Show Operations</span>
                  </Link>



                </div>



              </div>

            </div>

            <div class="navbar-vertical-footer py-lg-5">
              <ul class="navbar-vertical-footer-list">


                <li class="navbar-vertical-footer-list-item">

                  <div class="dropdown dropup">
                    <button type="button" class="btn btn-ghost-secondary btn-icon rounded-circle" id="otherLinksDropdown" data-bs-toggle="dropdown" aria-expanded="false" data-bs-dropdown-animation>
                      <i class="fa fa-info text-primary py-1 px-1"></i>
                    </button>

                    <div class="dropdown-menu navbar-dropdown-menu-borderless" aria-labelledby="otherLinksDropdown">
                      <span class="dropdown-header">Personlization</span>
                      <button class="dropdown-item" onClick={changedark}>
                        <i class="fa-solid fa-circle-half-stroke dropdown-item-icon"></i>
                        <span class="text-truncate" title="Dark Mode">Change to Dark Mode</span>
                      </button>
                      <button class="dropdown-item" onClick={changelight}>
                        <i class="fa-solid fa-circle-half-stroke dropdown-item-icon"></i>
                        <span class="text-truncate" title="Dark Mode">Change to light Mode</span>
                      </button>

                      <div class="dropdown-divider"></div>

                    </div>
                  </div>

                </li>


              </ul>
            </div>

          </div>
        </div>
      </aside>
    </div>
  )
}

export default SiderBars