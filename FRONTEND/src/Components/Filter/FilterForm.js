import {useState} from 'react';
import './FilterForm.css';
import FuelType from  './FuelType';
import VehicleType from './VehicleType';
import PriceType from './PriceType';

function FilterForm(props){
    const [fuelType,setFuelType] = useState({
        'petrol':false,
        'diesel':false,
        'electric':false
    });
    const [vehicleType,setVehicleType] = useState({
        'scooter':false,
        'bike':false,
        'car':false
    });
    const [priceType,setPriceType] = useState({
        'hourly':false,
        'weekly':false,
        'daily':false
    });

    const [filterOpen,setFilterOpen] = useState(((window.innerWidth>1060 && window.innerWidth<=1250) || (window.innerWidth<=870))?false:true);
    window.addEventListener('resize',()=>{
        setFilterOpen(((window.innerWidth>1060 && window.innerWidth<=1250) || (window.innerWidth<=870))?false:true);
    });

    const inputChangeHandler = (type,key,isChecked) => {
        if(type === 'vehicle'){
            setVehicleType(prevState => {
                const newState = {...prevState};
                newState[key] = isChecked;
                return newState;
            });
        }
        else if(type === 'fuel'){
            setFuelType(prevState => {
                const newState = {...prevState};
                newState[key] = isChecked;
                return newState;
            });
        }
        else{
            setPriceType(prevState => {
                const newState = {...prevState};
                newState[key] = isChecked;
                return newState;
            });
        }
        return;
    }

    const filterHandler = event => {
        event.preventDefault();
        setFilterOpen(prevFlag => (!prevFlag));
    }

    const submitHandler = event=>{
        event.preventDefault();
        if(props.searchFormData === null) return;
        if(filterOpen){
            const sendData = {
                'location':props.searchFormData.location,
                'date':JSON.stringify(props.searchFormData.date),
                'time':JSON.stringify(props.searchFormData.time),
                'fuelType':JSON.stringify(fuelType),
                'vehicleType':JSON.stringify(vehicleType),
                'priceType':JSON.stringify(priceType)
            };
            
            setFilterOpen(((window.innerWidth>1060 && window.innerWidth<=1250) || (window.innerWidth<=870))?false:true);

            const queryParams = new URLSearchParams(sendData).toString();
            fetch(`http://localhost:8000/filter?${queryParams}`)
            .then(response => {
                if(!response.ok) return new Error("server error");
                return response.json()
            })
            .then(data => {
                props.onFilter(data);
            })
            .catch(error=>{console.log(error)});
        }
    }

    const classes = 'filter-form'.concat(`${props.className === undefined?'':props.className}`)
    return (
        <form onSubmit={submitHandler} method = 'get' className = 'filter-form'>
                <button 
                    type = {filterOpen?'submit':'button'} 
                    onClick = {filterOpen?submitHandler:filterHandler}
                    className = 'apply-filter-btn'
                >
                    {filterOpen?'Apply Filter':'Filter'}
                </button>
                {
                    filterOpen && <> 
                        <VehicleType
                            data = {vehicleType}
                            onSave = {inputChangeHandler}
                            className = 'vehicle-type'
                        />

                        <FuelType
                            data = {fuelType}
                            onSave = {inputChangeHandler}
                            className = 'fuel-type'
                        />
                        
                        <PriceType
                            data = {priceType}
                            onSave = {inputChangeHandler}
                            className = 'price-type'
                        />
                    </>
                }
        </form>
    );
}

export default FilterForm;