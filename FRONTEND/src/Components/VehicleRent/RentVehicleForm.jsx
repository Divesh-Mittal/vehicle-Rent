import { useState } from 'react';
import './RentVehicleForm.css';
import Text from '../FormElements/Text';
import Number from '../FormElements/Number'
function VehicleRentForm(props){
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [aadharNo,setAadharNo] = useState('');

    const inputChangeHandler = (identifier,value)=>{
        if(identifier === 'name') setName(value);
        else if(identifier === 'phone') setPhone(value);
        else if(identifier === 'address') setAddress(value);
        else setAadharNo(value);
    }

    const calculateCost = ()=>500;

    const submitHandler = event =>{
        event.preventDefault();
        const cost = calculateCost();
        const data = {
            'userCredentials':{
                'name':name,
                'phone':phone,
                'address':address,
                'aadharNo':aadharNo,
            },
            'bookingInfo':props.bookingData.bookingInfo,
            'vehicleData':props.bookingData.vehicleData,
            'cost':cost
        }
        console.log(data);
        fetch("http://localhost:8000/rent-vehicle",{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response=>{
            if(!response.ok) throw new Error("Oops, something went wrong");
            return response.json();
        })
        .then(data=>{
            console.log(data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return(
        <div className = 'rent'>
            <form onSubmit = {submitHandler}>
                <Text
                    id = 'name'
                    key = 'name'
                    name = 'name'
                    data = {name}
                    label = 'Name'
                    className = 'driver-name'
                    inputType = 'text'
                    onInputChange = {inputChangeHandler}
                />
                <Number 
                    id = 'phone'
                    name = 'phone'
                    data = {phone}
                    label = 'Phone No'
                    className = 'phone-no'
                    onNumberChange = {inputChangeHandler}
                />
                <Text
                    id = 'address'
                    key = 'address'
                    name = 'address'
                    data = {address}
                    label = 'Address'
                    className = 'address'
                    inputType = 'text'
                    onInputChange = {inputChangeHandler}
                />
                <Number 
                    id = 'aadhar-no'
                    name = 'aadhar'
                    data = {aadharNo}
                    label = 'Aadhar Number'
                    className = 'aadhar-no'
                    onNumberChange = {inputChangeHandler}
                />
                <h2>Total Cost :- {calculateCost()} </h2>
                <button type = 'submit'>Rent</button>
            </form>
        </div>
    );
}
export default VehicleRentForm;