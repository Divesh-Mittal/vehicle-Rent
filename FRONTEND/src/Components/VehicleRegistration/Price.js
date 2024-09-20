import './Price.css'
function Price(props){
    return(
    <div className = 'price'>
        <label>Hourly :</label> <br />
        <input type = 'number' name = 'hour' value = {props.hour} onChange = {event => {props.onPriceChange(props.name,event.target.value)}}/> <br />
         
        <label>Daily : </label><br />
        <input type = 'number' name = 'day' value = {props.day} onChange = {event => {props.onPriceChange(props.name,event.target.value)}} /><br />

        <label>Weekly : </label><br />
        <input type = 'number' name = 'week' value = {props.week} onChange = {event => {props.onPriceChange(props.name,event.target.value)}} /><br />
     </div>
    );
}

export default Price;