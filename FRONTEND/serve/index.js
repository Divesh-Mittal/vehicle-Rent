// server side
const cors = require('cors')
const express = require('express');
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
    console.log(req.body);
    res.status(201).send({
        'data':[
            {"key": 1, "vehicleName": "Camry", "vehiclePrice": 25000, "imageSrc": ""},
            {"key": 2, "vehicleName": "Civic", "vehiclePrice": 22000, "imageSrc": ""}
        ]
    })
})

app.post('/rent-vehicle',(req,res)=>{
    console.log(req.body);
    res.send({'res':true});
})

app.listen(8000,()=>{
    console.log(`Server started`);
})