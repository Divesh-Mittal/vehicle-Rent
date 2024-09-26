import { useState } from 'react';
import './RentVehicleForm.css';
import Text from '../FormElements/Text';
import Number from '../FormElements/Number'
function VehicleRentForm(props){
    const [isError,setError] = useState(false);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [aadharNo,setAadharNo] = useState('');
    const [cost,setCost] = useState(0);

    const inputChangeHandler = (identifier,value)=>{
        if(identifier === 'name') setName(value);
        else if(identifier === 'phone') setPhone(value);
        else if(identifier === 'address') setAddress(value);
        else setAadharNo(value);
        if(isError === true) setError(false);
    }

    const calculateCost = ()=>{
        const queryParams = new URLSearchParams(props.bookingData);
        fetch(`http://localhost:8000/calculate-cost?${queryParams}`)
        .then(response => {
            if(!response.ok) throw new Error("Ooops, something went wrong");
            return response.json();
        })
        .then(data => {setCost(data.cost)})
        .catch(error => {
            setError(true);
        })
    }

    const submitHandler = event =>{
        event.preventDefault();
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
        fetch("http://localhost:8000/rent-vehicle",{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response=>{
            if(!response.ok) throw new Error("Oops, something went wrong");
        })
        .catch(error=>{
            setError(true);
        })
    }

    return(
        <div className = 'rent'>
            {isError && <div style={{textAlign:'center',margin:'auto',marginBottom:'10px'}}>Ooops, something went wrong!</div>}
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
                <h2>Total Cost :- {cost} </h2>
                <button type = 'submit'>Rent</button>
            </form>
        </div>
    );
}
export default VehicleRentForm;