import './DropDown.css'

function DropDown(props){
    const classes = "dropdown".concat(` ${props.className}`);
    const dropDownChangeHandler = event =>{
        props.onOptionChange(event.target.value,props.identifier);
    }
    return(
        <div className = {classes} >
            <label htmlFor = {props.id}> {props.label} </label>
            <br />
            <select
                id = {props.id}
                name = {props.name}
                defaultValue = {props.data}
                onChange = {dropDownChangeHandler}
            >
                <option value = "" disabled >{props.defaultOption}</option>
                {
                    props.options.map( element => (
                        <option key = {element}> {element} </option>
                    ))
                }
            </select>
        </div>
    );
}
export default DropDown;