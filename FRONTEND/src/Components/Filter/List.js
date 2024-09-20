function List(props){
    const changeHandler = event => {
        props.onCheck(props.label.toLowerCase(),event.target.checked);
    }
    return(
        <li>
            <input 
                id = {props.label.toLowerCase()}
                name = {props.label.toLowerCase()} 
                type = "checkbox"
                checked = {props.data} 
                onChange = {changeHandler} 
            />
            <label htmlFor = {props.label.toLowerCase()}>{props.label}</label>
        </li>
    );
}
export default List;