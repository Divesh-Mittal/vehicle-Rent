import List from './List';

function VehicleType(props){
    const data = [
        { 'id': 1, 'label': 'Scooter', 'data': props.data.scooter },
        { 'id': 2, 'label': 'Bike', 'data': props.data.bike },
        { 'id': 3, 'label': 'Car', 'data': props.data.car }
    ];

    const checkHandler = (value,isChecked)=>{
        props.onSave('vehicle',value,isChecked)
    }
    return(
        <div className = {props.className}>
            <h3>Vehicle Type:</h3>
            <ul>
                {
                    data.map(item=>(
                        <List 
                            key = {item.id}
                            data = {item.data}
                            label = {item.label}
                            onCheck = {checkHandler}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default VehicleType;