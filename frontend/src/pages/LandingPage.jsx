import React from 'react'
import '../backup.css';
import { Link } from 'react-router-dom';
import Footer from '../Components/ShareUI/Footer';
import Reveal from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";
function LandingPage() {

    return (
        <>

            <div class="main-wrapper">



                <section id="home-area" class="bg-1" data-scroll-index="0">
                    <div class="home-bg-circle ">

                        {/* <img class="circle1" src="asset-2.png" alt=""/> */}
                        <img class="circle2" src="asset-1.png" alt="" />
                    </div>
                    <div class="container">
                        <div class="row">

                            <div class="col-lg-8">
                                <div class="caption d-table">
                                    <div class="d-table-cell align-middle">
                                        <h1 class="text-white display-2">Knitwearistic Maximize your Garments Production Efficiency!</h1>
                                        <h4 class="text-light font-open-sans">Monitor Production in Every Garment Section and generate operation Bulliten, <br /> Capacity Holding, and, make Bill of Material Easy</h4>
                                        <div class="caption-btns">
                                            <a class="bg" href="">Start Now</a>
                                            <a class="popup-video" href="https://www.youtube.com/watch?v=iaj8ktgL3BY&t=5s"><i class=" fa fa-play"></i> Play video</a>
                                        </div>
                                        {/* <div class="caption-download-btns">
                                <ul>
                                    <li><a href=""><i class="fa-brands fa-android"></i></a></li>
                                    <li><a href=""><i class="fa-brands fa-apple"></i></a></li>
                                    <li><a href=""><i class="fa-brands fa-windows"></i></a></li>
                                </ul>
                            </div> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>







                <section id="core-feature-area" class="bg-2">
                    <div class="core-feature-circle">
                        <img class="circle1" src="asset-2.png" alt="" />
                        <img class="circle2" src="asset-2.png" alt="" />
                        <img class="circle3" src="asset-2.png" alt="" />
                    </div>
                    <div class="container px-5">
                        <div class="row">

                            <div class="col-md-10 offset-md-1">
                                <div class="section-heading text-center">
                                    <h1 class="text-dark display-2">Knitwearistic Features</h1>
                                    <p class="text-darks">Knitwearistic have the following features to help in the garments complex calculation, Activity monitoring, Bill of material making, Operation Builleten. </p>

                                </div>
                            </div>

                        </div>
                        <div class="row">

                            <div class="col-lg-3 col-md-6">
                                <div class="core-feature-single ">
                                    <div class="core-feature-single-item text-center">
                                        <div class="icon">
                                            <i class="fa-brands fa-watchman-monitoring"></i>
                                        </div>
                                        <h3 className='py-2'>Activity Monitoring</h3>
                                        <p className='py-4'>Allow to monitor the load in every section of garments like cutting,stiching,pritning,washing etc.</p>
                                    </div>
                                    <img class="hover-shape-1 hover-shape" src="shape-one.svg" alt="Shape One" />
                                    <img class="hover-shape-2 hover-shape" src="shape-two.svg" alt="Shape Two" />
                                    <img class="hover-shape-3 hover-shape" src="shape-three.svg" alt="Shape Three" />
                                    <img class="hover-shape-4 hover-shape" src="shape-four.svg" alt="Shape Four" />
                                    <img class="hover-shape-5 hover-shape" src="shape-five.svg" alt="Shape Five" />
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="core-feature-single">
                                    <div class="core-feature-single-item two text-center">
                                        <div class="icon">
                                            <i class="fa-solid fa-circle-pause"></i>
                                        </div>
                                        <h3 className='py-3'>Capacity Holding</h3>
                                        <p className='py-5'>Monitor the Production rate, hold and satisfy your customer needs.</p>
                                    </div>
                                    <img class="hover-shape-1 hover-shape" src="shape-one.svg" alt="Shape One" />
                                    <img class="hover-shape-2 hover-shape" src="shape-two.svg" alt="Shape Two" />
                                    <img class="hover-shape-3 hover-shape" src="shape-three.svg" alt="Shape Three" />
                                    <img class="hover-shape-4 hover-shape" src="shape-four.svg" alt="Shape Four" />
                                    <img class="hover-shape-5 hover-shape" src="shape-five.svg" alt="Shape Five" />
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="core-feature-single">
                                    <div class="core-feature-single-item three text-center">
                                        <div class="icon three">
                                            <i class="fa-solid fa-microchip"></i>
                                        </div>
                                        <h3>Operation Bulletin</h3>
                                        <p className='py-4'>This Software is developed by keeping the needs of industry in mind. It will calculate the SAM operations with zero failure rate.</p>
                                    </div>
                                    <img class="hover-shape-1 hover-shape" src="shape-one.svg" alt="Shape One" />
                                    <img class="hover-shape-2 hover-shape" src="shape-two.svg" alt="Shape Two" />
                                    <img class="hover-shape-3 hover-shape" src="shape-three.svg" alt="Shape Three" />
                                    <img class="hover-shape-4 hover-shape" src="shape-four.svg" alt="Shape Four" />
                                    <img class="hover-shape-5 hover-shape" src="shape-five.svg" alt="Shape Five" />
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="core-feature-single">
                                    <div class="core-feature-single-item four text-center">
                                        <div class="icon four">
                                            <i class="fa-solid fa-dollar"></i>
                                        </div>
                                        <h3>Bil of Material</h3>
                                        <p className='py-2'>You can easily Make Bill of Material with our software. As Every garment industry make BOM with their own style it will allow you to make your BOM as by you choice.</p>

                                    </div>
                                    <img class="hover-shape-1 hover-shape" src="shape-one.svg" alt="Shape One" />
                                    <img class="hover-shape-2 hover-shape" src="shape-two.svg" alt="Shape Two" />
                                    <img class="hover-shape-3 hover-shape" src="shape-three.svg" alt="Shape Three" />
                                    <img class="hover-shape-4 hover-shape" src="shape-four.svg" alt="Shape Four" />
                                    <img class="hover-shape-5 hover-shape" src="shape-five.svg" alt="Shape Five" />
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                <section class="hero-section ptb-120  " >
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-lg-6 col-md-10">
                                <div class="hero-content-wrap mt-5 mx-5 my-5">

                                    <h1 class="fw-bold display-3" style={{ color: "#6730e3" }}>Manage your entire fashion production online</h1>
                                    <Reveal effect="fadeInUp">
                                        <p class="lead text-dark">A powerful tool for fashion brands and manufacturers to collaborate through every step in product development.</p>
                                    </Reveal>
                                    <div class="action-btn mt-5 align-items-center d-block d-sm-flex d-lg-flex d-md-flex">
                                        <Link to="/login" class="btn btn-primary">Get Started</Link>

                                    </div>

                                </div>
                            </div>



                            <div class="col-lg-6 col-md-8 mt-3">
                                <div className="container px-5">
                                    <div class="hero-img position-relative">
                                        <div class="image-bg-positioning">
                                            <img src="header1.png" alt="" class="img-fluid rounded" style={{ marginTop: "0px", height: "500px", width: "100%" }} />
                                        </div>
                                        <div class="animation-item d-none d-md-block d-lg-block ">
                                            <div class="p-4 w-75 rounded-custom d-flex white-bg hero-animated-card-1">
                                                <p class="gr-text-11 mb-0 text-mirage-2 text-dark">“A better way to manage your Target Per day ,Target per Hour etc.”</p>
                                                <div class="small-card-img ml-3">
                                                    <img src="team-2.jpg" alt="" width="80px" class="rounded-circle img-fluid" />
                                                </div>
                                            </div>
                                            <div class="p-4 w-75 rounded-custom d-flex secondary-bg hero-animated-card-2 ">
                                                <div class="small-card-img mr-3 text-white">
                                                    <img src="team-5.jpg" alt="" width="80px" class="rounded-circle img-fluid" />
                                                </div>
                                                <p class="gr-text-11 mb-0 text-white">“Ensuring the best return SAM calculation,Flexible UI”</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>





                {/* about */}

                <section class="why-choose-us ptb-120" id='Bill of Material (BOM)'>
                    <div class="container px-4">
                        <div class="row justify-content-lg-between align-items-center">
                            <div class="col-lg-5 col-12">
                                <div class="why-choose-content">
                                    <div class="icon-box rounded-custom bg-primary shadow-sm d-inline-block">
                                        <i class="fas fa-shield-blank text-white"></i>
                                    </div>
                                    <Reveal effect="fadeInUp">
                                        <h2 className='display-3'>Bill of Material (BOM)</h2>
                                    </Reveal>
                                    <p>You can easily Make Bill of Material with our software. As Every garment industry make BOM with their own style it will allow you to make your BOM as by you choice.</p>
                                    <ul class="list-unstyled d-flex flex-wrap list-two-col mt-4 mb-4">
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Finish Item Code</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Finish Item Description</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Style and BOM date</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>UOM, Quantity, size, supplier</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Operation sequence</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Garment cost and comments</li>
                                    </ul>
                                    <a href="#" class="btn btn-primary py-3 px-4">Start Using<i class="fas fa-arrow-right ms-2"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <Fade left>
                                    <div class="feature-img-holder mt-4 mt-lg-0 mt-xl-0">
                                        <img src="header.png" class="img-fluid shadow rounded" alt="feature-image" style={{ height: "450px" }} />

                                    </div>
                                </Fade>

                            </div>
                        </div>
                    </div>
                </section>


                {/* match */}

                <section class="image-feature pt-60 pb-120" id='Capacity Holding'>
                    <div class="container">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-lg-5 col-12 order-lg-1">
                                <div class="feature-img-content">
                                    <div class="icon-box rounded-custom bg-dark shadow-sm d-inline-block">
                                        <i class="fal fa-fingerprint fa-2x text-white"></i>
                                    </div>
                                    <h2 className='display-3'>Capacity Holding</h2>
                                    <p>Keep monitoring on your customer order and prodcution status.Set alert on specified threshold. </p>
                                    <ul class="list-unstyled d-flex flex-wrap list-two-col mt-4 mb-4">
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>View and update quantity of order being cut  by selecting the Customer POID number or PO Number.</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>View and Update quantity of order being  Stich, Printing, Embroidery, Washing, Packing, by selecting the Customer POID number or PO Number.</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Style and BOM date</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Set Threshold</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Give Aert on Production Department.</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Allow to Close Production.</li>
                                    </ul>

                                    <a href="#" class="btn btn-primary px-4 py-3 d-block mt-4">Start Using <i class="fas fa-arrow-right ms-2"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12 order-lg-0">
                                <Fade right>
                                    <div class="feature-img-holder mt-4 mt-lg-0 mt-xl-0">
                                        <img src="header1.png" class="img-fluid shadow rounded" alt="feature-image" style={{ height: "450px" }} />
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activity Monitoring */}
                <section class="why-choose-us ptb-120" id="Activity Monitoring" >
                    <div class="container px-4">
                        <div class="row justify-content-lg-between align-items-center">
                            <div class="col-lg-5 col-12">
                                <div class="why-choose-content">
                                    <div class="icon-box rounded-custom bg-primary shadow-sm d-inline-block">
                                        <i class="fas fa-shield-blank text-white"></i>
                                    </div>
                                    <h2 className='display-3'>Activity Monitoring</h2>
                                    <p>Monior prodcition rate , Quantity shipped ,cutting,SAM precost and number of orders canncelled.</p>
                                    <ul class="list-unstyled d-flex flex-wrap list-two-col mt-4 mb-4">
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>SAM</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Production Dashbaord</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Load in every section </li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Canncelled orders </li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Warnings and details  in cutting ,stiching,shipping,packing etc</li>
                                        <li class="py-1"><i class="fas fa-check-circle me-2 text-primary"></i>Garment Main Summary Sheet</li>
                                    </ul>
                                    <a href="#" class="btn btn-primary py-3 px-4">Start Using<i class="fas fa-arrow-right ms-2"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <Fade left>
                                    <div class="feature-img-holder mt-4 mt-lg-0 mt-xl-0">
                                        <img src="header3.png" class="img-fluid shadow rounded" alt="feature-image" style={{ height: "450px" }} />
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </section>
                {/* portfolio */}




                <section id="video-area" class="bg-1">
                    <div class="video-area-circle">
                        <img class="circle1" src="asset-4.png" alt="" />
                        <img class="circle2" src="asset-4.png" alt="" />
                        <img class="circle3" src="asset-4.png" alt="" />
                    </div>
                    <div class="video-cont d-table text-center">
                        <div class="d-table-cell align-middle">
                            <div class="video-overlay"></div>
                            <a class="popup-video" href="/convert"><i class="fa fa-play"></i></a>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="video title">
                                    <h5 className='display-5'>Easy Production Management</h5>
                                    <h2 class="text-dark display-2 ">Make your production more fast</h2>
                                    <p class="text-muted"></p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-7 col-md-8">
                                <div class="counter title">
                                    <h5>Easy Production Management</h5>
                                    <h2 class="text-white">Make your production more fast</h2>

                                </div>
                            </div>
                        </div>
                        {/* <div class="row">

                <div class="col-md-3 col-6">
                    <div class="counter-single">
                        <div class="icon">
                            <img src="icon-like.png" class="img-fluid" alt=""/>
                        </div>
                        <h2>5,289</h2>
                        <p>Satisfaction rate</p>
                    </div>
                </div>
   
                <div class="col-md-3 col-6">
                    <div class="counter-single">
                        <div class="icon">
                            <img src="icon-user.png" class="img-fluid" alt="" />
                        </div>
                        <h2>4,188</h2>
                        <p>Happy Users</p>
                    </div>
                </div>
                
                <div class="col-md-3 col-6">
                    <div class="counter-single">
                        <div class="icon">
                            <img src="icon-cloud.png" class="img-fluid" alt=""/>
                        </div>
                        <h2>9,087</h2>
                        <p>app download</p>
                    </div>
                </div>
  
                <div class="col-md-3 col-6">
                    <div class="counter-single">
                        <div class="icon">
                            <img src="icon-trophy.png" class="img-fluid" alt=""/>
                        </div>
                        <h2>26</h2>
                        <p>Best Awards</p>
                    </div>
                </div>
              
            </div> */}
                    </div>
                </section>


                {/* pricing */}
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
                                        <i class="fa-brands fa-cc-discover text-primary" style={{ fontSize: "39px" }}></i>
                                    </div>
                                    <div class="media-body fw-medium h6 mb-0">
                                        Secure Payment
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="media d-flex align-items-center py-2 p-sm-2">
                                    <div class="icon-box mb-0 bg-success-soft rounded-circle d-block me-3">
                                        <i class="fa fa-calendar-check text-success" style={{ fontSize: "39px" }}></i>
                                    </div>
                                    <div class="media-body fw-medium h6 mb-0">
                                        Get 30 day free trial
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="media d-flex align-items-center py-2 p-sm-2">
                                    <div class="icon-box mb-0 bg-danger-soft rounded-circle d-block me-3">
                                        <i class="fa fa-calendar-times text-danger" style={{ fontSize: "39px" }}></i>
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
                                        <h3 class="package-name text-primary d-block">Basic</h3>
                                        <h4 class="display-6 fw-semi-bold">$49<span>/month</span></h4>
                                    </div>
                                    <div class="pricing-info  mb-4">
                                        <ul class="pricing-feature-list list-unstyled">
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>SAM Calculation</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Add Unlimited Garments Types</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Customizable SAM</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>No Of User Creation : 1</li>


                                        </ul>
                                    </div>
                                    <Link to="/pricing" class="btn text-center btn-outline-primary mt-2">Buy Now</Link>

                                    {/* <!--pattern start--> */}
                                    <div class="dot-shape-bg position-absolute z--1 left--40 bottom--40">
                                        <img src="dot-big-square.svg" alt="shape" />
                                    </div>
                                    {/* <!--pattern end--> */}
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="position-relative single-pricing-wrap rounded-custom  shadow p-5 mb-4 mb-lg-0">
                                    <div class="pricing-header mb-32">
                                        <h3 class="package-name text-warning d-block">Standerd</h3>
                                        <h4 class="display-6 fw-semi-bold ">$349<span>/6 months</span></h4>
                                    </div>
                                    <div class="pricing-info mb-4">
                                        <ul class="pricing-feature-list list-unstyled">
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>SAM Calculation</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Add Unlimited Garments Types</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Customizable SAM</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Order Production Monitoring</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Capacity Holding</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>No Of User Creation : 2</li>
                                        </ul>
                                    </div>
                                    <Link to="/pricing" class="btn btn-primary mt-2">Buy Now</Link>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 ">
                                <div class="position-relative single-pricing-wrap rounded-custom bg-white custom-shadow p-5 mb-4 mb-lg-0">
                                    <div class="pricing-header mb-32">
                                        <h3 class="package-name text-primary d-block">Enterprise Level</h3>
                                        <h4 class="display-6 fw-semi-bold">$899<span>/12 months</span></h4>
                                    </div>
                                    <div class="pricing-info mb-4">
                                        <ul class="pricing-feature-list list-unstyled">
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Add Unlimited Garments Types</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Customizable SAM</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>SAM Calculation</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Order Production Monitoring</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Capacity Holding</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Bill of Material (BOM) Built in templates</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Email Alerts</li>
                                            <li><i class="fas fa-circle fa-2xs text-primary me-2"></i>Unlimited User Creation</li>

                                        </ul>
                                    </div>
                                    <Link to="/pricing" class="btn btn-outline-primary mt-2">Buy Now</Link>

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

                <section id="faq-area" class="bg-1">
                    <div class="faq-area-img">
                        <img src="faq-bg-1.png" class="img-fluid" alt="" />
                    </div>
                    <div class="container ">
                        <div class="row px-5">

                            <div class="col-md-8 offset-md-2">
                                <div class="section-heading text-center">
                                    <h5 className='display-2'>Take A look</h5>
                                    <h2 className='dispaly-3'>Avoid redundant work so you can focus on designing great products. You were born to do more than cut and paste!</h2>
                                    <p>Design and manufacturing teams get a full view of what's happening so they can move product development forward with less headache..</p>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-7">
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <div className="card shadow">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Create Professional BOM in Minutes
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>Create Bill Of Material (BOM) with in build templates</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <div className="card shadow">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Get Alerts !!
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>Get alerts when capacity holding is reached.

                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <div className="card shadow">
                                            <h2 class="accordion-header" id="headingThree">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Unlimited Users
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <strong>Create Unlimited Users. That will help in manage the garment production</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-5">
                                <div class="faq-img">
                                    <img src="faq-img-1.png" class="img-fluid" alt="" />
                                    <img src="faq-img-2.png" class="img-icon" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>








                <Footer />

            </div>
        </>

    )
}

export default LandingPage;