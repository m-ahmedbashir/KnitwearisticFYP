import React from 'react'
import AdminVerticalNabar from './AdminVerticalNavbar'
import { Brands } from './Brands'
import OnwerSideDetached from './AdminSideSpace'
import RightSideBarNav from './RightSideBarNav'
import Header from '../ShareUI/Header'


function Admin() {
  const changedark = () => {
    localStorage.setItem('mode', 'dark')
    window.location.reload();
  }
  const changelight = () => {
    localStorage.setItem('mode', 'light')
    window.location.reload();
  }
  const data = {
    labels: ['Zara', 'Khadi', 'Alkram', 'GulAhmed'],
    datasets: [
      {

        data: [19, 15, 28, 70],
        backgroundColor: [
          'rgb(40,190,184)',
          'rgb(8,112,231)',
          'rgb(255,149,0)',
          'rgb(251,15,90)',

        ],

      },
    ],
  };
  return (
    <div>
      <main id="content" role="main" class="main">
        <div className='pt-5'>
          <Header title={'Admin Dashboard'} />
        </div>
        <div class="content container" style={{ marginTop: "-20rem" }}>
          <AdminVerticalNabar active={"das"} />
          <OnwerSideDetached />
        </div>
      </main>
      <RightSideBarNav />

    </div>
  )
}

export default Admin