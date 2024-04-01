import React from 'react'
import Header from '../../ShareUI/Header'
import ProtectedNavBar from '../../ShareUI/ProtectedNavBar'
import VerticalNavbar from '../VerticalNavbar'
import BOMS from './BOMS'
import { useSelector } from 'react-redux'
import AdminVerticalNabar from '../../Admin/AdminVerticalNavbar'
function SowAllBoms() {
  const { user } = useSelector(state => state.auth)
  return (
    <div>
      <ProtectedNavBar />
      <div id="content" role="main" class="main">
        <div className="pt-5">
          <Header title="Sow All Boms" />
        </div>
        <div className="content container" style={{ marginTop: "-20rem" }}>
          {
            user && user.userRole === "Admin" ?
              <AdminVerticalNabar />
              :
              <VerticalNavbar active={"Sow All Boms"} />
          }
          <div className="row sidebar-detached-content mt-3 mt-lg-0 ">
            <BOMS />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SowAllBoms