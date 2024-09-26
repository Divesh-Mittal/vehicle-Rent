import Text from "../FormElements/Text";
import DropDown from "../FormElements/DropDown";
import Number from "../FormElements/Number";
import './RegisterVehicle.css'
import { useState } from "react";

function RegisterVehicle(props){
    const vehicleTypeOptions = ['Scooter','Car','Bike']
    const fuelTypeOptions = ['Petrol','Electric','Diesel']
    const [vehicleName,setVehicleName] = useState('');
    const [vehicleType,setVehicleType] = useState('');
    const [fuelType,setFuelType] = useState('');
    const [price,setPrice] = useState({'hour':'','day':'','week':''});
    const [file,setFile] = useState();
    const [error,setError] = useState(false);

    const inputChangeHandler = (identifier,value)=>{
        if(identifier === 'vehicleName') setVehicleName(value);
        else if(identifier === 'vehicleType') setVehicleType(value);
        else if(identifier === 'fuelType') setFuelType(value);
        else if(identifier === 'hour' || identifier === 'day' || identifier === 'week'){
            setPrice((state)=>{
                const newState = {...state};
                newState[identifier] = value;
                return newState;
            })
        }
        else
            setFile(value);
        if(error === true) setError(false);
    }

    const submitHandler = event =>{
        event.preventDefault();
        // const formData = {
        //     'vehicleName':vehicleName,
        //     'vehicleType':vehicleType,
        //     'fuelType':fuelType,
        //     'Hour':price.hour,
        //     'Weekly':price.week,
        //     'Daily':price.day,
        //     // 'price':price,
        //     'file':file
        // }
        
        // fetch('http://localhost:3000/api/v1/vehicles/create',{
        //     method:"POST",
        //     headers:{
        //         'content-type':'multipart/form-data',
        //         body:formData
        //     }


        const formData = new FormData(); 
        formData.append('vehicleName',vehicleName);
        formData.append('vehicleType',vehicleType);
        formData.append('fuelType',fuelType);
        formData.append('hour',price.hour);
        formData.append('day',price.day);
        formData.append('week',price.week);
        formData.append('file',file)

        fetch('http://localhost:8000/register-vehicle',{
            method:'POST',
            body:formData
// >>>>>>> 0f602c6f1eb3666a6b248e8b41ce293b08813ff6
        })
        .then(response=>{
            if(!response.ok) throw new Error('network was not ok');
            return response.json();
        })
        // .then(data=>{
        //     console.log(data);
        // })
        .catch(error=>{
            setError(true);
            // console.log(error);
        })
    }
    return(
        <div className = "register">
            <form onSubmit = {submitHandler}>
                <header>
                    {error && <span>Oooops, something went wrong</span>}
                    <h1>Register Vehicle</h1>
                </header>
                <Text 
                    id = 'vehicleName'
                    key = 'vehicleName'
                    name = 'vehicleName'
                    data = {vehicleName}
                    label = 'Vehicle Name'
                    inputType = 'text'
                    className = 'register-vehicleName'
                    onInputChange = {inputChangeHandler}
                />
                <DropDown
                    id = 'vehicle-dropdown'
                    data = {vehicleType}
                    name = 'vehicleType'
                    label = 'Vehicle Type'
                    options = {vehicleTypeOptions}
                    className = 'vehicle'
                    defaultOption = 'Vehicle Type'
                    onOptionChange = {inputChangeHandler}
                />
                <DropDown
                    id = 'fuel-dropdown'
                    name = 'fuelType'
                    data = {fuelType}
                    label = 'Fuel Type'
                    options = {fuelTypeOptions}
                    className = 'fuel'
                    defaultOption = 'Fuel Type'
                    onOptionChange = {inputChangeHandler}
                />
                <br/>

                <div className = 'register-price'>
                    <Number 
                        id = 'hour'
                        name = 'hour'
                        data = {price.hour}
                        label = 'Hourly Price'
                        className = 'hour'
                        onNumberChange = {inputChangeHandler}
                    />

                    <Number 
                        id = 'day'
                        name = 'day'
                        data = {price.day}
                        label = 'Daily Price'
                        className = 'day'
                        onNumberChange = {inputChangeHandler}
                    />

                    <Number 
                        id = 'week'
                        name = 'week'
                        data = {price.week}
                        label = 'Weekly Price'
                        className = 'week'
                        onNumberChange = {inputChangeHandler}
                    />
                </div>
                <label htmlFor = 'register-image'></label>
                <input 
                    id = 'register-image' 
                    type = 'file' 
                    onChange = {event=> {inputChangeHandler('file',event.target.files[0])}}
                    className = 'register-image' 
                />
                <button type = 'submit'>Register</button>
            </form>
        </div>
    );
}
export default RegisterVehicle;