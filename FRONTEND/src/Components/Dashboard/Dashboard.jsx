import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import SearchForm from '../VehicleSearchForm/SearchForm';
import Row from './Row';

const heading = {
    "key":0,
    "vehicleName":'Vehicle Name',
    "vehiclePrice":'Price',
    "vehicleType":'Vehicle Type',
    "fuelType":'Fuel Type',
    "location":'Location'
}

function Dashboard(props){

    const navigate = useNavigate();
    const [isError,setError] = useState(false);
    const [showSideBar,setShowSideBar] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [option,setOption] = useState({'listVehicleOption':false,'bookingDetailOption':false});
    const [rowSelected,setRowSelected] = useState({0:false});
    
    const prepareTable = (table)=>{
        setTableData(table.data) 
        const newState = {0:false}
        for(let i=0;i<table.data.length;i++)
            newState[table.data[i].key] = false;
        setRowSelected(newState);
    }

    const listVehicles = ()=>{
        setOption({'listVehicleOption':true,'bookingDetailOption':false});

        fetch('http://localhost:8000/listVehicles')
        .then(response=>response.json())
        .then(data=>{
            prepareTable(data);
        })
        .catch(error=>{
            setError(true);
        })
    }

    const bookedVehicles = (formData)=>{
        setOption({'listVehicleOption':false,'bookingDetailOption':true});

        const queryParams = new URLSearchParams(formData).toString();
        fetch(`http://localhost:8000/bookedVehicles?${queryParams}`)
        .then(response=>response.json())
        .then(data=>{
            prepareTable(data);
        })
        .catch(error=>{
            setError(true);
        })
    }

    const rowSelectHandler = (key)=>{
        const newState = {...rowSelected};
        if(key === 0){
            const checked = !newState[0];
            for(let key in newState)
                newState[key] = checked;
        }
        else{
            newState[key] = !newState[key];
            let flag = true;
            for(let key in newState){
                if(parseInt(key) && !newState[key]){
                    flag = false;
                    break;
                }
            }
            if(flag) newState[0] = true;
            else newState[0] = false;
        } 
        setRowSelected(newState);
    }

    const searchHandler = data => {
        prepareTable(data.vehicleData);
    }

    const checkRowSelection = ()=>{
        for(let key in rowSelected){
            if(rowSelected[key]) return true;
        }
        return false;
    }

    const deleteRowHandler = ()=>{
        if(!checkRowSelection()) return;
        const vehicleId = [];
        for(let key in rowSelected){
            if(rowSelected[key]) vehicleId.push(key);
        }
        fetch('http://localhost:8000/delete-vehicle',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(vehicleId)
        })
        .then(response=>{
            if(!response.ok) throw new Error('network was not ok');
        })
        .catch(error=>{
            setError(true);
        })
    }

    const registerVehicle = ()=>{
        navigate('/register-vehicle');   
    }

    return(
        <div className = 'dashboard'>
            <div className = {showSideBar === true?'collapsed-sidebar':'sidebar'}>
                <button className = 'show-sidebar' onClick = {()=>setShowSideBar(prevState=>!prevState)}>Show</button>
                <div className = {showSideBar === true?'show-user':'user'}>
                    <h2>Hi,</h2>
                    <h2>User</h2>
                </div>
                <div className = {showSideBar === true?'show-functionality':'functionality'}>
                    <button onClick = {listVehicles}>List Vehicles</button>
                    <button onClick = {bookedVehicles}>Booking Details</button>
                    <button onClick = {registerVehicle}>Register Vehicle</button>
                </div>
            </div>
            <div className = 'content'>
                {
                    option.bookingDetailOption && <SearchForm onSearch = {searchHandler}/>
                }
                <div className = 'table'>
                    <Row 
                        key = {'0'}
                        data = {heading}
                        value = {rowSelected[0]}
                        className = 'heading'
                        onSelection = {rowSelectHandler}
                    />
                    <div className = 'result-rows'>
                    {
                        tableData.map(element=>
                            <Row
                                key = {element.key}
                                data = {element}
                                value = {rowSelected[element.key]}
                                divClasses = {rowSelected[element.key] === true?'row-element':''}
                                onSelection = {rowSelectHandler}
                            />
                        )
                    }
                    </div>
                <button className = {checkRowSelection() === true?'row-delete-active':'row-delete-inactive'} onClick = {deleteRowHandler}> Delete </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;