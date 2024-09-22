import List from './List';

function FuelType(props){
    const data = [
        { 'id': 1, 'label': 'Electric', 'data': props.data.electric },
        { 'id': 2, 'label': 'Petrol', 'data': props.data.petrol },
        { 'id': 3, 'label': 'Diesel', 'data': props.data.diesel }
    ];

    const checkHandler = (value,isChecked)=>{
        props.onSave('fuel',value,isChecked);
    }

    return (
        <div className = {props.className}>
            <h3>Fuel Type:</h3>
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
    );
}
export default FuelType;