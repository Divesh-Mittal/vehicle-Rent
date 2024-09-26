import {useState} from 'react';
import './SearchForm.css'
import SearchDate from './SearchDate'
import SearchTime from './SearchTime';

const calculatePickDropTime = ()=>{
    const now = new Date();
    
    let pickhours = parseInt(now.getHours().toString().padStart(2, '0'));
    let pickminutes = parseInt(now.getMinutes().toString().padStart(2, '0'));
    if(pickminutes > 30){ 
        pickhours = (pickhours+1)%24;
        pickminutes = 0;
    }
    else if(pickminutes > 0)
        pickminutes = 30;
    const dropminutes = (pickminutes+30)%60;
    const drophours = dropminutes<pickminutes?(pickhours+1)%24:pickhours;

    return {
        'pickhours':pickhours,
        'pickminutes':pickminutes,
        'drophours':drophours,
        'dropminutes':dropminutes
    };
}


const calculatePickDropDate = (pickDropTime)=>{
    const now = new Date();
    const year = (now.getFullYear().toString());
    const month = (now.getMonth()+1).toString().padStart(2,'0');
    const day = now.getDate().toString().padStart(2,'0');
    
    const today = year.concat("-").concat(month).concat("-").concat(day);
    
    return {'pickupDate':today,'dropDate':today};
}

const generateTimeOptions = ()=>{
    const time = [];
    for(let h = 0;h<24;h++){
        let hour;
        if(h<10)
            hour = '0' + h;
        else hour = String(h);
        let t1 = hour.concat(':00');
        let t2 = hour.concat(':30');
        time.push(t1);
        time.push(t2);
    }
    return time;
}

function SearchForm(props){
    
    const initialTime = calculatePickDropTime();
    const initialDate = calculatePickDropDate(initialTime);

    const initialPickupTime = `${initialTime.pickhours}:${initialTime.pickminutes === 0?"00":"30"}`;
    const initialDropTime = `${initialTime.drophours}:${initialTime.dropminutes === 0?"00":"30"}`;
    
    const timeIntervals = generateTimeOptions();
    let timeIntervalsStart = initialTime.pickhours;
    if(initialTime.pickminutes === 30) timeIntervalsStart+=0.5;

    const [isError,setError] = useState(false);
    const [location,setLocation] = useState('');
    const [date,setDate] = useState({'pickupDate':initialDate.pickupDate,'dropDate':initialDate.dropDate});
    const [time,setTime] = useState({'pickupTime':initialPickupTime,'dropTime':initialDropTime});
    const [pickupTimeIntervals,setPickupTimeIntevals] = useState(timeIntervals.slice(timeIntervalsStart*2));
    const [dropTimeIntervals,setDropTimeIntervals] = useState(timeIntervals.slice(timeIntervalsStart*2+1));
    
    const inputChangeHandler = (value,identifier)=>{
        if(identifier === 'pickupDate') {
            if(value === initialDate.pickupDate){
                const currentTime = calculatePickDropTime();
                const startTime = currentTime.pickhours + (currentTime.minutes === 30?0.5:0);
                setPickupTimeIntevals(timeIntervals.slice(startTime*2));
            }
            else setPickupTimeIntevals(timeIntervals);
            setDate(prevDate => ({
                ...prevDate,
                'pickupDate':value
            }))
        }
        else if(identifier === 'dropDate'){
            if(value === initialDate.dropDate){ 
                const currentTime = calculatePickDropTime();
                const startTime = currentTime.pickhours + (currentTime.minutes === 30?0.5:0);
                setDropTimeIntervals(timeIntervals.slice(startTime*2+1));
            }
            else setDropTimeIntervals(timeIntervals);
            setDate(prevDate => ({
                ...prevDate,
                'dropDate':value
            }))
        }
        else if(identifier === 'pickupTime'){
            setTime(prevTime => ({
                ...prevTime,
                'pickupTime':value
            }))
        }
        else if(identifier === 'dropTime'){
            setTime(prevTime => ({
                ...prevTime,
                'dropTime':value
            }))
        }
        else setLocation(value);
        if(isError === true) setError(false);
    }

    const formSubmitHandler = (event)=>{
        event.preventDefault();
        const formData = {
            'location':location,
            'date':date,
            'time':time
        };
        const sendData = {
            'location':location,
            'date':JSON.stringify(date),
            'time':JSON.stringify(time)
        }
        const queryParams = new URLSearchParams(sendData).toString();

        fetch(`${props.searchURL}?${queryParams}`)
        .then((response)=> {
            if(!response.ok)
                throw new Error("Oops Something went wrong");
            return response.json();
        })
        .then(data => {
            props.onSearch({'vehicleData':data,'searchData':formData});
        })
        .catch(error=>{
            setError(true);
        })
    }

    return(
        <div className = 'search-form'>
            {isError && <div style={{textAlign:'center',marginBottom:'5px'}}>Ooops, something went wrong!</div>}
            <form onSubmit = {formSubmitHandler}>
                <div className = 'location'>
                    <label htmlFor = 'city'>City</label><br />
                    <select
                        id = 'city'
                        name = 'city'
                        required
                        onChange = {
                            event => {inputChangeHandler(event.target.value,'location')}
                        } 
                        className = "city"
                        defaultValue = ''
                    >
                        <option value = "" disabled>Location</option>
                        <option>Dehradun</option>
                        <option>Rishikesh</option>
                        <option>Haldwani</option>
                        <option>Nainital</option>
                    </select>
                </div>

                <SearchDate
                    data = {date.pickupDate}
                    label = "Pickup Date"
                    onChange = {inputChangeHandler}
                    className = "pickup-date"
                    identifier = 'pickupDate'
                    defaultDate = {initialDate.pickupDate}
                />
                <SearchTime 
                    data = {time.pickupTime}
                    time = {pickupTimeIntervals}
                    label = "Pickup Time"
                    onChange = {inputChangeHandler}
                    className = "pickup-time"
                    identifier = "pickupTime" 
                />
                <SearchDate 
                    data = {date.dropDate}
                    label = "Drop Date"
                    onChange = {inputChangeHandler}
                    className = "drop-date"
                    identifier = "dropDate"
                    defaultDate = {initialDate.dropDate}
                />
                <SearchTime 
                    data = {time.dropTime}
                    time = {dropTimeIntervals}
                    label = "Drop Time"
                    onChange = {inputChangeHandler}
                    className = "drop-time"
                    identifier = "dropTime"
                />

                <button type = 'submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchForm;