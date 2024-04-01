import React from 'react'

import AdminSideDetached from './AdminSideDetached'

import SiderBars from '../Owner/SiderBars'
import RightSideBarNav from '../Planner/RightSideBarNav'
import Header from '../ShareUI/Header'
import ProtectedNavBar from '../ShareUI/ProtectedNavBar'

import ViewAllOrder from '../ShareUI/ViewAllOrder'

function Owner() {
  const changedark = () => {
    localStorage.setItem('mode', 'dark')
    window.location.reload();
  }
  const changelight = () => {
    localStorage.setItem('mode', 'light')
    window.location.reload();
  }
  return (
    <div>
      <ProtectedNavBar />

      <main id="content" role="main" class="main">


        <Header title={'Owner'} />



        <div class="content container" style={{ marginTop: "-20rem" }}>
          <SiderBars />
          <AdminSideDetached />
        </div>
      </main>
      <RightSideBarNav />

    </div>
  )
}

export default Owner