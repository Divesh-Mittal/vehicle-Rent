import { useState } from 'react';
import './Dashboard.css';
import Row from './Row';
const data = {
    'data': [
      {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
      {"key": 2, "vehicleName": "Civic", "vehiclePrice": 22000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
      {"key": 3, "vehicleName": "Accord", "vehiclePrice": 27000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
      {"key": 4, "vehicleName": "Model 3", "vehiclePrice": 35000, "fuelType": "electric", "vehicleType": "car", "imageSrc": ""},
      {"key": 5, "vehicleName": "Mustang", "vehiclePrice": 30000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
      {"key": 6, "vehicleName": "FZ6R", "vehiclePrice": 8000, "fuelType": "petrol", "vehicleType": "bike", "imageSrc": ""},
      {"key": 7, "vehicleName": "LX 50", "vehiclePrice": 4000, "fuelType": "petrol", "vehicleType": "scooter", "imageSrc": ""},
      {"key": 8, "vehicleName": "F-150", "vehiclePrice": 30000, "fuelType": "diesel", "vehicleType": "car", "imageSrc": ""},
      {"key": 9, "vehicleName": "Ninja 400", "vehiclePrice": 10000, "fuelType": "petrol", "vehicleType": "bike", "imageSrc": ""},
      {"key": 10, "vehicleName": "Elantra", "vehiclePrice": 22000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""}
    ]
}

const heading = {
    "key":0,
    "vehicleName":'Vehicle Name',
    "vehiclePrice":'Price',
    "vehicleType":'Vehicle Type',
    "fuelType":'Fuel Type'
}

function Dashboard(props){
    let x = {0:false};
    for(let i=0;i<data.data.length;i++)
        x[data.data[i].key] = false;

    const [rowSelected,setRowSelected] = useState(x);
    const rowSelectHandler = (key)=>{
        setRowSelected(rows=>{
            const newState = {...rows};
            if(key === 0){
                const checked = !newState[key];
                for(let key in rowSelected){
                    newState[key] = checked;
                }

            }
            else    newState[key] = !newState[key];
            return newState;
        });
    }
    return(
        <div className = 'dashboard'>
            <div className = 'sidebar'>

            </div>
            <div className = 'content'>
                <div className = 'table'>
                    <Row 
                        key = {0}
                        data = {heading}
                        value = {rowSelected[0]}
                        className = 'heading'
                        onSelection = {rowSelectHandler}
                    />
                    {
                        data.data.map(element=>(
                            <Row
                                key = {element.key}
                                data = {element}
                                value = {rowSelected[element.key]}
                                divClasses = {rowSelected[element.key] === true?'row-element':''}
                                onSelection = {rowSelectHandler}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;