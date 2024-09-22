import './Card.css';

function Card(props){
    const classes = 'card'.concat(` ${props.className}`);

    const bookRideHandler = ()=>{
        props.onBookRide(props.key); // pending
    }
    return (
        <div className = {classes}>
            <div className = 'vehicle-image'>
                <img src = {props.imageSrc} alt = "Imag"/>
            </div>
            <section className = 'vehicle-info'>
                <div className = 'vehicle-name'>
                    <p>{props.vehicleName} Hyundai</p>
                </div>
                <div className = 'vehicle-price'>
                    <p>Rs. {props.vehiclePrice}/day</p>
                </div>
                <div className = 'vehicle-location'>
                    <p>See location on map</p>
                </div>
            </section>
            <button onClick = {bookRideHandler} >Book Ride</button>
        </div>
    )
}

export default Card;