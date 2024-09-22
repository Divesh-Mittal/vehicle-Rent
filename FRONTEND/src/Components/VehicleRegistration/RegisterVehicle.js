import Name from "../LoginSignup/Name";
import TypeDropDown from "./TypeDropDown";
import Price from "./Price";
import './RegisterVehicle.css'

import { useState } from "react";

function RegisterVehicle(props){
    const x = ['Scooter','Car','Bike']
    const [vehicleName,setVehicleName] = useState('');
    const [vehicleType,setVehicleType] = useState('');
    const [fuelType,setFuelType] = useState('');
    const [price,setPrice] = useState({'hour':0,'day':0,'week':0});

    const inputChangeHandler = (identifier,value)=>{
        if(identifier === 'vehicleName') setVehicleName(value);
        else if(identifier === 'vehicleType') setVehicleType(value);
        else if(identifier === 'fuelType') setFuelType(value);
        else setPrice((state)=>{
            const newState = {...state};
            newState[identifier] = value;
            return newState;
        })
    }
    return(
        <div className = "register">
            <Name 
                id = 'vehicleName'
                key = 'vehicleName'
                name = 'vehicleName'
                data = {vehicleName}
                label = 'Vehicle Name'
                className = 'vehicle-name'
                onNameChange = {inputChangeHandler}
            />
            <TypeDropDown
                id = 'vehicle-dropdown'
                name = 'vehicleType'
                data = {x}
                label = 'Vehicle Type'
                className = 'vehicle'
                defaultOption = 'Vehicle-type'
                onTypeChange = {inputChangeHandler}
            />
            <TypeDropDown
                id = 'fuel-dropdown'
                name = 'fuelType'
                data = {x}
                label = 'Fuel Type'
                className = 'fuel'
                defaultOption = 'Fuel-type'
                onTypeChange = {inputChangeHandler}
            />
            <Price
                data = {price}
                onPriceChange = {inputChangeHandler}
            />

        </div>
    );
}
export default RegisterVehicle;