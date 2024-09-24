import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Search.css';
import Card from '../VehicleCard/Card';
import FilterForm from '../Filter/FilterForm';
import SearchForm from '../VehicleSearchForm/SearchForm';

function Search(props){
    const navigate = useNavigate();
    const [resultVehicleData,setResultVehicleData] = useState({});
    const [searchData,setSearchData] = useState({});

    const book = rentVehicleData => {
        navigate('/rent-vehicle')
        props.onSaveBookVehicleData({
            'vehicleData':rentVehicleData,
            'bookingInfo':searchData
        });
    }
    const searchHandler = data => {
        setResultVehicleData(data.vehicleData);
        setSearchData(data.searchData);
    }

    const filterHandler = data => {
        setResultVehicleData(data)
    }
    
    return(
        <div className = 'search'>
            <SearchForm onSearch = {searchHandler}/>
            <div className = 'search-filter-result'>
                <div className = 'search-filter'>
                    <FilterForm searchFormData = {Object.keys(searchData).length>0?searchData:null} onFilter = {filterHandler}/>
                </div>
                <div className = 'result-card'>
                    {
                        Object.keys(resultVehicleData).length > 0?
                        resultVehicleData.data.map( element=>(
                            <Card 
                                key = {element.key}
                                data = {element}
                                onBookRide = {book} //function to bookride
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