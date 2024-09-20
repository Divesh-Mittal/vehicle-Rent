function TypeDropDown(props){
    const classes = 'type-dropdown'.concat(` ${props.className}`);
    return(
        <div className = {classes}>
            <label htmlFor = {props.id}>{props.label}</label><br />
            <select
                id = {props.id}
                name = {props.name}
                required
                onChange = {
                    event => {props.onTypeChange(props.name,event.target.value)}
                }
                defaultValue = ''
            >
                <option value = "" disabled>{props.defaultOption}</option>
                {
                    props.data.map(element=>(
                        <option key = {element} >{element}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default TypeDropDown;