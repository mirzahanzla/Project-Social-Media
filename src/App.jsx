import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BrandRoutes from './Layout/Brand/BrandRoutes'
import SplashScreen from './Layout/SplashScreen';
import { useRef, useState, useEffect } from 'react';
import './index.css';
import InfluRoutes from './Layout/Influencer/InfluencerRoutes';
import InfluencerRoutes from './Layout/Influencer/InfluencerRoutes';
import UserRoutes from './Layout/User/UserRoutes';

import ErrorPage from './Layout/Brand/DashBoard/Pages/ErrorPage/ErrorPage';
import Test from './Test';
import Authentication from './Routes/Authentication';
import Login2 from './Layout/Login/Login2';
import RootSignUp from './Layout/SignUp/RootSignUp';
import BrandSignUp from './Layout/SignUp/BrandSignUp';
import Login from './Layout/Login/Login';
import InfluencerSignUp from './Layout/SignUp/InfluencerSignUp';
import UserSignUp from './Layout/SignUp/UserSignUp';

const App = () => {

  const TimeOutAnimation = useRef()

  const [AnimationState, setAnimationState] = useState(true)

  // useEffect(() => {
  //    let  TimeOutAnimation=setTimeout(() => {
  //     setAnimationState(false)
  //    },8000)
  // })
  console.log("App is called");

  return (

    <>
    
      <div className=" ">
        <BrowserRouter>




          <Routes>

            <Route path="/Login" element={<Login2 />} />

            <Route path="/SignUp/*" element={<RootSignUp />}>
              <Route index element={<RootSignUp />} />
              <Route path="Brand" element={<BrandSignUp />} />
              <Route path="Influencer" element={<InfluencerSignUp />} />
              <Route path="User" element={<UserSignUp />} />
            </Route>
            <Route path="/*" element={<Authentication />} />

          </Routes>
      
        </BrowserRouter>

      </div>

    </>

  )
}

export default App;