import React, { useEffect } from 'react'
import RightSideBarNav from './RightSideBarNav'
import SideDetachedBar from './SideDetachedBar'
import VerticalNavbar from './VerticalNavbar'
import Header from '../ShareUI/Header'
function PlannerDashboard() {




  return (
    <div>

      <main id="content" role="main" class="main">
        <div className='pt-5'>
          <Header title={'Production Planner Dashboard'} />
        </div>
        <div class="content container" style={{ marginTop: "-20rem" }}>

          <VerticalNavbar active={'das'} />
          <SideDetachedBar />

        </div>
      </main>
      <RightSideBarNav />

    </div>
  )
}

export default PlannerDashboard