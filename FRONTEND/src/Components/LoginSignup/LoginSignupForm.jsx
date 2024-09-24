import {useState,useEffect} from 'react';
import './LoginSignupForm.css';
import Text from '../FormElements/Text';
import Password from './Password';

function LoginSignupForm(props){
    const [login,setLogin] = useState(true);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [formData,setFormData] = useState({});
    const [error,setError] = useState(false);

    useEffect(()=>{
        const getUrl = ()=> login?"http://localhost:8000/login":"http://localhost:8000/register";
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
        if(identifier === 'email') setEmail(value);
        else if(identifier === 'name') setName(value);
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
                        <Text
                            id = 'name'
                            key = 'name'
                            name = 'name'
                            data = {name}
                            label = 'Name'
                            className = 'signup-name'
                            inputType = 'text'
                            onInputChange = {inputChangeHandler}
                        />
                    }
                    <Text
                        id = 'email'
                        key = 'email'
                        name = 'email'
                        data = {email}
                        label = 'Email'
                        inputType = 'text'
                        className = 'login-signup-email'
                        onInputChange = {inputChangeHandler}
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