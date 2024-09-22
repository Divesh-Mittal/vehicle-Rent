import List from './List';

function PriceType(props){
    const data = [
        { 'id': 1, 'label': 'Weekly', 'data': props.data.weekly },
        { 'id': 2, 'label': 'Daily', 'data': props.data.daily },
        { 'id': 3, 'label': 'Hourly', 'data': props.data.hourly }
    ];

    const checkHandler = (value,isChecked)=>{
        props.onSave('price',value,isChecked)
    }
    return(
        <div className = {props.className}>
            <h3>Price Type:</h3>
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
export default PriceType;