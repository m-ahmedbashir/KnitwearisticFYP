import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'
import BOMS from './BOMS'

function BOMPlanner() {
  return (
    <>

      <div id="content" role="main" class="main">
        <div className="pt-5">
          <Header title="BOM Planner" />
        </div>
        <div className="content container" style={{ marginTop: "-20rem" }}>
          <VerticalNavbar active={'plannerbom'} />
          <div className="row sidebar-detached-content mt-3 mt-lg-0 ">
            <div class="col-lg-4 mb-3 mb-lg-5">
              <Link to='/addbom'>
                <div class="card card-hover-shadow text-center h-100">
                  <div class="card-progress-wrap">
                    <div class="progress card-progress">
                      <div class="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                  </div>


                  <div class="card-body">
                    <div class="row align-items-center text-start mb-1">
                      <div class="col">
                        <span class="badge bg-soft-secondary text-secondary p-2">blank file</span>
                      </div>




                    </div>

                    <div class="d-flex justify-content-center ">


                      <img class="img-fluid" src="https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/blank.webp?alt=media&token=16746da2-04cc-44a8-ae67-94d14d56489b" alt="Image Description" />

                    </div>

                    <div class="mb-4">
                      <h2 class="mb-1">Blank File</h2>

                      <span class="fs-5">Updated 2 hours ago</span>
                    </div>

                    <a class="stretched-link" href="#">

                    </a>
                  </div>


                </div>
              </Link>


            </div>
            <BOMS />
          </div>
        </div>

      </div>
    </>
  )
}

export default BOMPlanner