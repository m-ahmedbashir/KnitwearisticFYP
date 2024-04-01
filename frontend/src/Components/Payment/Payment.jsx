import React from 'react'
import {Link} from "react-router-dom";
import MainNavBar from '../MainNavBar';
import Header from '../ShareUI/Header';

function Payment() {
  return (
    <>
    <MainNavBar/>
    <main id="content" role="main" class="main">
    <Header title={'Pricing'}/>
    <div className='container card border-0 shadow' style={{marginTop:"-20rem"}}>

<div className="row">
    <div className="col-lg-12">
    <section class="pricing-section pt-60 pb-120  position-relative z-2" id="Pricing">
<div class="container ">
<div class="row justify-content-center px-5 py-5">
<div class="col-lg-6 col-md-10">
<div class="section-heading text-center">
    <h4 class="display-6 text-primary">Pricing</h4>
    <h2 className='display-3'>Check Our Valuable Price</h2>

</div>
</div>
</div>
<div class="row justify-content-center mb-5 px-lg-5">
<div class="col-lg-3">
<div class="media d-flex align-items-center py-2 p-sm-2">
    <div class="icon-box mb-0 bg-primary-soft rounded-circle d-block me-3">
    <i class="fa-brands fa-cc-discover text-primary" style={{fontSize:"39px"}}></i>
    </div>
    <div class="media-body fw-medium h6 mb-0">
        Secure Payment
    </div>
</div>
</div>
<div class="col-lg-3">
<div class="media d-flex align-items-center py-2 p-sm-2">
    <div class="icon-box mb-0 bg-success-soft rounded-circle d-block me-3">
        <i class="fa fa-calendar-check text-success" style={{fontSize:"39px"}}></i>
    </div>
    <div class="media-body fw-medium h6 mb-0">
        Get 30 day free trial
    </div>
</div>
</div>
<div class="col-lg-3">
<div class="media d-flex align-items-center py-2 p-sm-2">
    <div class="icon-box mb-0 bg-danger-soft rounded-circle d-block me-3">
        <i class="fa fa-calendar-times text-danger" style={{fontSize:"39px"}}></i>
    </div>
    <div class="media-body fw-medium h6 mb-0">
        Cancel anytime
    </div>
</div>
</div>
</div>
<div class="row pr-100 pl-100 ">
<div class="col-lg-4 col-md-6 ">
<div class="position-relative single-pricing-wrap rounded-custom bg-white custom-shadow p-5 mb-4 mb-lg-0">
    <div class="pricing-header mb-32">
        <h3 class="package-name text-primary d-block">Stater</h3>
        <h4 class="display-6 fw-semi-bold">$50<span>/month</span></h4>
    </div>
    <div class="pricing-info  mb-4">
        <ul class="pricing-feature-list list-unstyled">
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Operation Bulliten</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Capacity Holding</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Bill of Material (BOM)</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Client Admin Pannel</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Activity Monitoring</li>
      
        </ul>
    </div>
    <Link to="/payment" class="btn text-center btn-outline-primary mt-2">Buy Now</Link>

    {/* <!--pattern start--> */}
    <div class="dot-shape-bg position-absolute z--1 left--40 bottom--40">
        <img src="dot-big-square.svg" alt="shape"/>
    </div>
    {/* <!--pattern end--> */}
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="position-relative single-pricing-wrap rounded-custom  shadow p-5 mb-4 mb-lg-0">
    <div class="pricing-header mb-32">
        <h3 class="package-name text-warning d-block">Advanced</h3>
        <h4 class="display-6 fw-semi-bold ">$255<span>/6 months</span></h4>
    </div>
    <div class="pricing-info mb-4">
        <ul class="pricing-feature-list list-unstyled">
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Operation Bulliten</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Capacity Holding</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Bill of Material (BOM)</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Client Admin Pannel</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Activity Monitoring</li>
                     
        </ul>
    </div>
    <Link to="/payment" class="btn btn-primary mt-2">Buy Now</Link>
</div>
</div>
<div class="col-lg-4 col-md-6 ">
<div class="position-relative single-pricing-wrap rounded-custom bg-white custom-shadow p-5 mb-4 mb-lg-0">
    <div class="pricing-header mb-32">
        <h3 class="package-name text-primary d-block">Premium</h3>
        <h4 class="display-6 fw-semi-bold">$450<span>/12 months</span></h4>
    </div>
    <div class="pricing-info mb-4">
        <ul class="pricing-feature-list list-unstyled">
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Operation Bulliten</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Capacity Holding</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Bill of Material (BOM)</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Client Admin Pannel</li>
            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Activity Monitoring</li>
      
        </ul>
    </div>
    <Link to="/payment" class="btn btn-outline-primary mt-2">Buy Now</Link>

    {/* <!--pattern start--> */}
    <div class="dot-shape-bg position-absolute z--1 right--40 top--40">
        <img src="dot-big-square.svg" alt="shape" />
    </div>
    {/* <!--pattern end--> */}
</div>
</div>
</div>
</div>
</section>
    </div>
</div>
</div>
    </main>
    
    
    </>
  )
}

export default Payment