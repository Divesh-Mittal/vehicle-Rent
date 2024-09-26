import './Row.css';
function Row(props){
    const classes = 'row'.concat(` ${props.className}`);
    const changeHandler = ()=>{
        props.onSelection(props.data.key);
    }
    return (
        <div className = {classes}>
            <div className = {'row-check'.concat(` ${props.divClasses}`)}>
                <label htmlFor = {props.data.key}></label>
                <input id = {props.data.key} type = 'checkbox' checked = {props.value} onChange={changeHandler}></input>
            </div>
            <div className = {'row-vehicle-name'.concat(` ${props.divClasses}`)}>{props.data.vehicleName}</div>
            <div className = {'row-fuel-type'.concat(` ${props.divClasses}`)}>{props.data.fuelType}</div>
            <div className = {'row-vehicle-type'.concat(` ${props.divClasses}`)}>{props.data.vehicleType}</div>
            <div className = {'row-vehicle-price'.concat(` ${props.divClasses}`)}>{props.data.vehiclePrice}</div>
            <div className = {'row-vehicle-location'.concat(` ${props.divClasses}`)}>{props.data.location}</div>
        </div>
    );
}

export default Row;