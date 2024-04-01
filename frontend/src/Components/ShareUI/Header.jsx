import React from 'react'

function Header({title}) {
  return (
    <div class="bg-dark">
      
      <div class="content container py-5" style={{ height: "30rem"}} >
         
          <div class="page-header page-header-light page-header-reset py-3">
            <div class="row align-items-center">
              <div class="col " style={{paddingTop:"60px"}}>
                <h1 class="page-header-title ">{ title}</h1>
              </div>
             
            
            </div>
          
          </div>
          
        </div>
      </div>
  )
}

export default Header