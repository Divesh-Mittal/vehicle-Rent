function Password(props){
    const classes = 'password'.concat(` ${props.className}`);
    return(
        <div className = {classes}>
            <label htmlFor = {props.id}> {props.label} </label><br />
            <input
                id = {props.id}
                type = 'password'
                name = {props.name}
                value = {props.data}
                title = "Password must contain at least 8 characters"
                onChange = {event => props.onPasswordChange('Password',event.target.value)}
                required
                minLength = "8"
                placeholder = {props.label}
                autoComplete = 'new-password'
            />
        </div>
    );
}
export default Password;