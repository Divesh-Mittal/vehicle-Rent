import './SearchDate.css'

function SearchDate(props){
    const classes = "date".concat(` ${props.className}`);
    const dateChangeHandler = event=>{
        props.onChange(event.target.value,props.identifier);
    }
    
    return(
        <div className = {classes}>
            <label htmlFor = {props.className} >{props.label}</label><br />
            <input
                id = {props.className}
                min = {props.defaultDate}
                name = {props.identifier.toLowerCase()}
                type = "date"
                value = {props.data}
                onChange = {dateChangeHandler}
            />
        </div>
    );
}

export default SearchDate;