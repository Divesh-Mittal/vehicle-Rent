import { useState } from 'react'
import './Search.css';
import Card from '../VehicleCard/Card';
import FilterForm from '../Filter/FilterForm';
import SearchForm from '../VehicleSearchForm/SearchForm';

// const vehicles = [
//     ['Car', 25000, 'Available', 'Toyota', 'Camry', 2023],
//     ['Motorcycle', 15000, 'Out of Stock', 'Harley-Davidson', 'Iron 883', 2022],
//     ['Truck', 35000, 'Available', 'Ford', 'F-150', 2024],
//     ['SUV', 30000, 'Available', 'Honda', 'CR-V', 2023],
//     ['Van', 28000, 'Available', 'Chrysler', 'Pacifica', 2023],
//     ['Van', 22000, 'Available', 'Chrysler', 'Pacifica', 2023]
//   ];

function Search(props){

    const [vehicleData,setVehicleData] = useState({});

    const vehicles = ()=>{}
    const searchHandler = (data)=>{
        setVehicleData(data);
    }
    
    return(
        <div className = 'search'>
            <SearchForm onSearch = {searchHandler}/>
            <div className = 'search-filter-result'>
                <div className = 'search-filter'>
                    <FilterForm onFilter = {searchHandler}/>
                </div>
                <div className = 'result-card'>
                    {
                        Object.keys(vehicleData).length > 0?
                        vehicleData.data.map( element=>(
                            <Card 
                                key = {element[0]}
                                imageSrc = {""}
                                onBookRide = {vehicles} //function to bookride
                                vehicleName = {element[0]}
                                vehiclePrice = {element[1]}
                            />
                        ))
                        :
                        <h2>No Results</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export default Search;