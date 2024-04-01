import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function VerticalNavbar({ active }) {
  const [mode, setmode] = useState('light');
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
                  <Link class={active === "das" ? 'activebutton' : "nav-link"} to='/app'>
                    <i class="fas fa-th py-1 mx-2"></i>
                    <span class="nav-link-title">Dashboards</span>
                  </Link>


                </div>
                <span class=" dropdown-header mt-4 mb-3">Operation  Bulliten</span>
                <div class="nav-item my-2 ">
                  <Link class={active === 'addSam' ? 'activebutton' : 'nav-link'} to="/addSam">
                    <i className="fa fa-plus py-1  mx-2"></i> Add New SAM </Link>

                </div>
                <div class="nav-item my-2">
                  <Link class={active === 'showSam' ? 'activebutton' : 'nav-link'} to="/showSam">
                    <i className="fa fa-eye py-1 mx-2 "></i>View SAM Orders
                  </Link>


                </div>
                {/* <div class="nav-item my-2">
                  <a class={active === "ud" ? 'activebutton' : 'nav-link'} href="#gen" aria-expanded="true" aria-controls="navbarVerticalMenuDashboards">
                    <i className="fa fa-download mx-2 py-1"></i>
                    SAM Sheets
                  </a>


                </div> */}
                <span class="dropdown-header mt-4">Activity Monitoring</span>

                <div class="nav-item  my-2">
                  <Link class={active === "Add" ? 'activebutton' : 'nav-link'} to="/addActivity" >
                    <i className="fa fa-plus py-1 mx-2"></i>Add Activity</Link>

                </div>
                <div class="nav-item  my-2">
                  <a class={active === "activities" ? 'activebutton' : 'nav-link'} href="/showActivity">
                    <i className="fa fa-eye py-1 mx-2"></i>Show Activity</a>

                </div>



                <span class="dropdown-header mt-4">Bill of Material</span>
                <div class="nav-item my-2">
                  <Link class={active === "plannerbom" ? 'activebutton' : 'nav-link'} to="/plannerbom" >
                    <i class="fas fa-plus py-1 px-4"></i>
                    Planner BOM
                  </Link>

                </div>
                <div class="nav-item my-2">
                  <Link class={active === "addbom" ? 'activebutton' : 'nav-link'} to="/addbom" >
                    <i class="fas fa-plus py-1 px-4"></i>
                    Add BOM
                  </Link>

                </div>
                <div class="nav-item  my-2">
                  <Link class={active === "boms" ? 'activebutton' : 'nav-link'} to="/boms">
                    <i class="fas fa-eye py-1 px-4"></i>
                    Show All BOM
                  </Link>

                </div>
                {/* <div class="nav-item  my-2">
                    <Link class={active=="temp"?'activebutton':'nav-link'} href="#navbarVerticalMenuDashboards" role="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalMenuDashboards" aria-expanded="true" aria-controls="navbarVerticalMenuDashboards">
                    <i class="fas fa-download py-1 px-4"></i>
                     Templates
                    </Link>

                  </div> */}




              </div>

            </div>

            <div class="navbar-vertical-footer">
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

export default VerticalNavbar