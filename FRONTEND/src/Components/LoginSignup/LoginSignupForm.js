import {useState,useEffect} from 'react';
import './LoginSignupForm.css';
import Email from './Email';
import Password from './Password';
import Name from './Name';

function LoginSignupForm(props){
    const [login,setLogin] = useState(true);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [formData,setFormData] = useState({});
    const [error,setError] = useState(false);

    useEffect(()=>{
        // 3000/api/v1/users/login
        const getUrl = ()=> login?"http://localhost:3000/api/v1/users/login":"http://localhost:3000/api/v1/users/register";
        const sendFormData = (data)=>{
            props.onFormSubmit(data);
        }
        if(Object.keys(formData).length > 0){
            fetch(getUrl(),{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData)
            })
            .then(response => {
                if(!response.ok) throw new Error("server was not ok");
                return response.json();
            })
            .then(data => {
                if(data.isAuthentic)
                    sendFormData(data);
                else throw new Error("User not authentic");
            })
            .catch(err=>{
                setError(true);
            })
        };
    },[formData]);

    const loginSignUpHandler = ()=>{
        setLogin(prevState => (!prevState));
    }

    const formSubmitHandler = event =>{
        event.preventDefault();
        let data = {
            email:email,
            password:password
        }
        if(!login){ 
            data.name = name;
            setName('');
        }
        
        setEmail('');
        setPassword('');

        setFormData(data);
    }


    const inputChangeHandler = (identifier,value)=>{
        if(identifier === 'Email') setEmail(value);
        else if(identifier === 'Name') setName(value);
        else setPassword(value);

        if(error === true) setError(false);
    }

    return(
        <div className = "login-signup-form">
            <form onSubmit = {formSubmitHandler}>
                <header>
                    <h1>
                        {
                            login?'Welcome Back':'Welcome'
                        }!
                        </h1>
                </header>
                
                <div className = 'credentials'>
                    { 
                    !login && 
                        <Name
                            id = 'name'
                            key = 'name'
                            name = 'name'
                            data = {name}
                            label = 'Name'
                            className = 'signup-name'
                            onNameChange = {inputChangeHandler}
                        />
                    }
                    <Email 
                        id = 'email'
                        key = 'email'
                        name = 'email'
                        data = {email}
                        label = 'Email'
                        className = 'login-signup-email'
                        onEmailChange = {inputChangeHandler}
                    />
                    <Password
                        id = 'password'
                        key = 'password'
                        name = 'password'
                        data = {password}
                        label = 'Password'
                        className = 'login-signup-password'
                        onPasswordChange = {inputChangeHandler}
                    />
                    {error && login && <span>Incorrect username or password!</span>}
                    <button className = 'login-signup-btn' type = 'submit'>{login?'Log in':'Sign up'}</button>
                    {login &&
                            <span>Forgot password?</span>
                        }
                </div>
                <div className = 'login-signup-options'>
                    <hr />
                    <p>or continue with</p>
                    <button>
                        {login?'Log in':'Sign up'} with Google
                    </button>
                    <p>
                        {
                            login?
                            "Don't have an account?":"Already have an account?"
                        } 
                        <span onClick={loginSignUpHandler}>
                            {!login?' Log in':' Sign up'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default LoginSignupForm;