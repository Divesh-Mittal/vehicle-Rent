import { useNavigate,Route,Routes } from 'react-router-dom'
import { useState,useEffect } from 'react';
import './App.css';
import Price from './Components/VehicleRegistration/Price';
import TypeDropDown from './Components/VehicleRegistration/TypeDropDown';
import RegisterVehicle from './Components/VehicleRegistration/RegisterVehicle';
import NavBar from './Components/Navigation/NavBar';
import Search from './Components/VehicleSearch/Search';
import LoginSignupForm from './Components/LoginSignup/LoginSignupForm'
import NotFound from './Components/PageNotFound/NotFound';

function App() {

  const navigate = useNavigate();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userData,setUserData] = useState({});

  const loginSignUpHandler = (formData)=>{
    setUserData(formData);
    setIsLoggedIn(true);
    navigate('/');
  }

  const logOut = ()=>{
    setIsLoggedIn(false);
    setUserData({});
    navigate('/');
  }
 
  return (
    <div className="App">
      <NavBar loggedIn = {isLoggedIn} onLogOut = {logOut} />
      <Routes>
        <Route path = '/' element = {<Search />} ></Route>
        { !isLoggedIn && 
          <Route path = '/login' element = {<LoginSignupForm onFormSubmit = {loginSignUpHandler} />}></Route>
        }
        <Route path = '*' element = {<NotFound />} />
      </Routes>
      {/* <RegisterVehicle /> */}
    </div>
  );
}

export default App;
