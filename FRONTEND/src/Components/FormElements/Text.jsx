import './Text.css';

function Text(props){
    const classes = `${props.className}`.concat(' input-field');
    return(
        <div className = {classes}>
            <label htmlFor = {props.id}>{props.label}</label><br />
            <input
                id = {props.id}
                type = {props.inputType}
                name = {props.name}
                value = {props.data}
                required
                onChange = {event => props.onInputChange(`${props.name}`,event.target.value)}
                placeholder = {props.label}
                autoComplete = 'on'
            />
        </div>
    );
}

export default Text;