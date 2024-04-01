import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Header from './Components/Header'
import AdminProtectedRoutes from './middlewares/AdminProtectedRoutes'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import './Assets/style.css';
import './Assets/responsive.css';
import LandingPage from './pages/LandingPage'
import MainNavBar from './Components/ShareUI/MainNavBar'
import Admin from './Components/Admin/Admin'
import PlannerProtectedRoute from './middlewares/PlannerProtectedRoutes'
import PlannerDashboard from './Components/Planner/PlannerDashboard'
import AddActivity from './Components/Planner/ActivityMonitoring/AddActivity'
import ShowActivity from './Components/Planner/ActivityMonitoring/ShowActivity'
import AddSAM from './Components/Planner/SAM/AddSAM'
import ShowSAM from './Components/Planner/SAM/ShowSAM'
import ViewOperations from './Components/Planner/SAM/ViewOperations'
import UpdateOperation from './Components/Planner/SAM/UpdateOperation'
import SamDashboard from './Components/Planner/SAM/SAMDashBoard'
import CapacityAdd from './Components/Planner/CompanyCapcaity/CapacityAdd'
import ShowCompanyCapcity from './Components/Planner/CompanyCapcaity/ShowCompanyCapcity'
import UpdateActivity from './Components/Planner/ActivityMonitoring/UpdateActivity'
import ADD_BOM from './Components/Planner/BOM/AddBomM'
import BOMPlanner from './Components/Planner/BOM/BOMPlanner'
import BillOfMaterial from './Components/Planner/BOM/UpdateBom'
import SowAllBoms from "./Components/Planner/BOM/SowAllBoms"
import OwnerProtectedRoutes from './middlewares/OwnerProtectedRoutes'
import Owner from './Components/Owner/Owner'
import AddOperation from './Components/Owner/AddOperation'
import ShowOperations from './Components/Owner/ShowOperations'
import EditOperation from './Components/Owner/UpdateOperations'
import ShowSAMAdmin from './Components/Admin/SAM/ShowSAM'
import AddPayment from './Components/Payment/AddPayment'
import ShowSingleActivity from './Components/Planner/ActivityMonitoring/ShowSingleActivity'
import ShowSingleBom from './Components/Planner/BOM/ShowSingleBom'
import ShowOrder from './Components/SubUser/ShowOrders'
import SubUserUpdate from './Components/SubUser/SubUserUpdate'
import StripContainer from './Components/Payment/StripContainer'
function App() {
  return (
    <>
      <Router>

        {/* <Header /> */}
        <MainNavBar />
        <Routes>


          <Route element={<PlannerProtectedRoute />}>
            <Route path="/app" element={<PlannerDashboard />} />
            <Route path="/addActivity" element={<AddActivity />} />
            <Route exact path="/showActivity" element={<ShowActivity />} />

            <Route exact path="/addSam" element={<AddSAM />} />
            <Route exact path="/showSam" element={<ShowSAM />} />
            <Route exact path="/showSam/:id" element={<ViewOperations />} />
            <Route exact path="/subOp/:id" element={<UpdateOperation />} />
            <Route exact path="/dashboardSam/:id" element={<SamDashboard />} />
            <Route exact path="/app/addCapacaity" element={<CapacityAdd />} />
            <Route exact path="/app/showcapacity" element={<ShowCompanyCapcity />} />
            <Route exact path="/editActivity/:id" element={<UpdateActivity />} />
            <Route exact path='/viewActivity/:id' element={<ShowSingleActivity />} />
            <Route exact path="/addbom" element={<ADD_BOM />} />
            <Route exact path="/plannerbom" element={<BOMPlanner />} />
            <Route exact path="/bom/:id" element={<BillOfMaterial />} />
            <Route exact path="/bomshow/:id" element={< ShowSingleBom />} />
            <Route exact path="/boms" element={<SowAllBoms />} />
          </Route>


          {/* onwerRoutes */}
          <Route element={<OwnerProtectedRoutes />}>
            <Route exact path="/owner" element={<Owner />} />
            <Route exact path="/addOperation" element={<AddOperation />} />
            <Route exact path="/showOperation" element={<ShowOperations />} />
            <Route exact path="/updateOperation/:id" element={<EditOperation />} />
          </Route>


          <Route exact path='/' element={<LandingPage />} />

          <Route element={<AdminProtectedRoutes />}>
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path="/showSamAdmin" element={<ShowSAM />} />
            <Route exact path="/samAdmin/:id" element={<SamDashboard />} />
            <Route exact path="/showOderAdmin" element={<ShowActivity />} />
            <Route exact path="/bomsAdmin" element={<SowAllBoms />} />
            <Route exact path='/viewActivityAdmin/:id' element={<ShowSingleActivity />} />
            <Route exact path='/upgrade' element={<StripContainer />} />

          </Route>

          <Route exact path='/showorders' element={<ShowOrder />} />
          <Route exact path='/updateOrders/:id' element={<SubUserUpdate />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>


        <ToastContainer />
      </Router>
    </>
  )
}

export default App
