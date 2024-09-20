import './Name.css';

function Name(props){
    const classes = 'name'.concat(` ${props.className}`);
    return (
        <div className = {classes}>
            <label htmlFor = {props.id}>{props.label}</label><br />
            <input 
                id = {props.id}
                type = 'text'
                name = {props.name} 
                value = {props.data} 
                required 
                placeholder = {props.label}
                onChange = {event => props.onNameChange('Name',event.target.value)} 
                autoComplete = 'on'
            />
        </div>
    );
}
export default Name;