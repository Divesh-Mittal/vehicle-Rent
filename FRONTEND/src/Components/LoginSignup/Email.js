function Email(props){
    const classes = 'email'.concat(` ${props.className}`);
    return(
        <div className = {classes}>
            <label htmlFor = {props.id}>{props.label}</label><br />
            <input
                id = {props.id}
                type = 'email'
                name = {props.name}
                value = {props.data}
                placeholder = {props.label}
                required
                onChange = {event => props.onEmailChange('Email',event.target.value)}
                autoComplete='on'
            />
        </div>
    );
}
export default Email;