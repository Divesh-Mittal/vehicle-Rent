import { useNavigate,Route,Routes } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import RegisterVehicle from './Components/VehicleRegistration/RegisterVehicle';
import NavBar from './Components/Navigation/NavBar';
import Search from './Components/VehicleSearch/Search';
import LoginSignupForm from './Components/LoginSignup/LoginSignupForm'
import NotFound from './Components/PageNotFound/NotFound';
import RentVehicleForm from './Components/VehicleRent/RentVehicleForm'
import Dashboard from './Components/Dashboard/Dashboard';

function App() {

  const navigate = useNavigate();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  // const [userData,setUserData] = useState({});
  const [bookVehicleData,setBookVehicleData] = useState({});
  const [bookingData,setBookingData] = useState({});

  const loginSignUpHandler = (formData)=>{
    setIsLoggedIn(true);
    navigate('/');
  }

  const logOut = ()=>{
    setIsLoggedIn(false);
    navigate('/');
  }

  const bookVehicleDataHandler = data =>{
    setBookVehicleData(data.vehicleData);
    setBookingData(data.bookingInfo)
  }
 
  return (
    <div className="App">
      <NavBar loggedIn = {isLoggedIn} onLogOut = {logOut} />
      <Routes>
        <Route path = '/' element = {<Search onSaveBookVehicleData = {bookVehicleDataHandler}/>} ></Route>
        <Route path = '/register-vehicle' element = {<RegisterVehicle />} ></Route>
        <Route path = '/rent-vehicle' element = {<RentVehicleForm bookingData = {{'vehicleData':bookVehicleData,'bookingInfo':bookingData}}/>}></Route>
        <Route path = '/dashboard' element = {<Dashboard />}></Route>
        { !isLoggedIn && 
          <Route path = '/login' element = {<LoginSignupForm onFormSubmit = {loginSignUpHandler} />}></Route>
        }
        <Route path = '*' element = {<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
