import './SearchTime.css';
function SearchTime(props){
    const classes = "time".concat(` ${props.className}`);
    const timeChangeHandler = event =>{
        props.onChange(event.target.value,props.identifier);
    }
    return(
        <div className = {classes}>
            <label htmlFor = {props.className}> {props.label} </label>
            <br />
            <select
                id = {props.className}
                name = {props.identifier.toLowerCase()}
                defaultValue = {props.data}
                onChange = {timeChangeHandler}
            >
                <option value = "" disabled className = 'hidden-option'>
                    HH:MM
                </option>
                {
                    props.time.map( element => (
                        <option key = {element}> {element} </option>
                    ))
                }
            </select>
        </div>
    );
}
export default SearchTime;