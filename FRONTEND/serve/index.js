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
            ['Car', 25000, 'Available', 'Toyota', 'Camry', 2023],
            ['Motorcycle', 15000, 'Out of Stock', 'Harley-Davidson', 'Iron 883', 2022],
            ['Truck', 35000, 'Available', 'Ford', 'F-150', 2024],
            ['SUV', 30000, 'Available', 'Honda', 'CR-V', 2023],
            ['Van', 28000, 'Available', 'Chrysler', 'Pacifica', 2023],
            ['Van', 22000, 'Available', 'Chrysler', 'Pacifica', 2023]
        ]
    })
})

app.get('/filter',(req,res)=>{
    res.status(201).send({
        'data':[
            ['Car', 25000, 'Available', 'Toyota', 'Camry', 2023],
            ['Motorcycle', 15000, 'Out of Stock', 'Harley-Davidson', 'Iron 883', 2022],
            ['Truck', 35000, 'Available', 'Ford', 'F-150', 2024]
        ]
    })
})

app.listen(8000,()=>{
    console.log(`Server started`);
})