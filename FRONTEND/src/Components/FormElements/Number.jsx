import './Number.css'
function Number(props){
    const classes = 'number'.concat(` ${props.className}`)
    return(
        <div className = {classes} >
            <label htmlFor = {props.id}>{props.label}</label>
            <input 
                id = {props.id}
                min = {props.min === undefined?'0.1':props.min}
                step = {props.min === undefined?'0.1':props.step}
                type = 'number' 
                name = {props.name} 
                value = {props.data} 
                required = {props.isRequired === undefined?true:false}
                onChange = {event => {
                    props.onNumberChange(props.name,event.target.value)
                    }
                }
                placeholder = {props.label}
                autoComplete = 'on'
            />
        </div>
    );
}

export default Number;