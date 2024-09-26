// server side
const cors = require('cors')
const express = require('express');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json())

app.post('/register',(req,res)=>{
    console.log(req.body);
    res.status(201).send({user:'A',isAuthentic:true});
})

app.post('/login',(req,res)=>{
    console.log(req.body);
    res.status(201).send({user:'A',isAuthentic:false});
})

app.get('/search',(req,res)=>{
    console.log(true);
    console.log(req.query);
    res.status(201).send({
        'data':[
            {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "imageSrc": ""},
            {"key": 2, "vehicleName": "Civic", "vehiclePrice": 22000, "imageSrc": ""},
            {"key": 3, "vehicleName": "Accord", "vehiclePrice": 27000, "imageSrc": ""},
            {"key": 4, "vehicleName": "Model 3", "vehiclePrice": 35000, "imageSrc": ""},
            {"key": 5, "vehicleName": "Mustang", "vehiclePrice": 30000, "imageSrc": ""}
        ]
    })
})

app.get('/filter',(req,res)=>{
    console.log(req.query);
    res.status(201).send({
        'data':[
            {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000},
            {"key": 2, "vehicleName": "Civic", "vehiclePrice": 22000}
        ]
    })
})

app.post('/rent-vehicle',(req,res)=>{
    console.log(req.body);
    res.send({'res':true});
})

app.get('/listVehicles',(req,res)=>{
    res.send([
          {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
          {"key": 2, "vehicleName": "Civic", "vehiclePrice": 22000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
          {"key": 3, "vehicleName": "Accord", "vehiclePrice": 27000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
          {"key": 4, "vehicleName": "Model 3", "vehiclePrice": 35000, "fuelType": "electric", "vehicleType": "car", "imageSrc": ""},
          {"key": 5, "vehicleName": "Mustang", "vehiclePrice": 30000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
          {"key": 6, "vehicleName": "FZ6R", "vehiclePrice": 8000, "fuelType": "petrol", "vehicleType": "bike", "imageSrc": ""},
          {"key": 7, "vehicleName": "LX 50", "vehiclePrice": 4000, "fuelType": "petrol", "vehicleType": "scooter", "imageSrc": ""},
          {"key": 8, "vehicleName": "F-150", "vehiclePrice": 30000, "fuelType": "diesel", "vehicleType": "car", "imageSrc": ""},
          {"key": 9, "vehicleName": "Ninja 400", "vehiclePrice": 10000, "fuelType": "petrol", "vehicleType": "bike", "imageSrc": ""},
          {"key": 10, "vehicleName": "Elantra", "vehiclePrice": 22000, "fuelType": "petrol", "vehicleType": "car", "imageSrc": ""},
        ]
    )
})

app.get('/bookedVehicles',(req,res)=>{
    res.send([
          {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "fuelType": "petrol", "vehicleType": "car"},
          {"key": 9, "vehicleName": "Ninja 400", "vehiclePrice": 10000, "fuelType": "petrol", "vehicleType": "bike"},
          {"key": 10, "vehicleName": "Elantra", "vehiclePrice": 22000, "fuelType": "petrol", "vehicleType": "car"}
        ]
    )
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Handle the POST request
app.post('/register-vehicle', upload.single('file'), (req, res) => {
    console.log(req.body); // Access other fields
    console.log(req.file);  // Access the uploaded file

    res.send({});
});

app.post('/delete-vehicle',(req,res)=>{
    console.log(req.body);
    res.send({});
})

app.get('/calculate-cost',(req,res)=>{
    res.send({'cost':500});
})

app.get('/specificBookedVehicles',(req,res)=>{
    console.log(req.query);
    res.send([{"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "fuelType": "petrol", "vehicleType": "car"}]);
})
app.listen(8000,()=>{
    console.log(`Server started`);
})