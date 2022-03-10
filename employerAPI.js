const express = require('express');
//const morgan = require('morgan');
const app = express();

app.use(express.urlencoded({extended: false})); 
app.use(express.json()); 
//app.use(morgan(':method :url :status - :response-time ms'));

let employers = [
    {id: 1001, name: "Shirley Temple", department: "Finance", salary: 100000},   
    {id: 1002, name: "Frank Smith", department: "Tech Services", salary: 150000},   
    {id: 1003, name: "Billy Bob", department: "Marketing", salary: 200000},   
    {id: 1004, name: "Mary Jane", department: "Administration", salary: 400000}   
];


// GET all employers
app.get('/', (req,res)=>{
    res.status(200).send(employers);
});


// UPDATE employer by employer ID parameter
app.patch('/:employer_id', (req,res)=>{
    let employerId = parseInt(req.params.employer_id);

    if(employerId){
        let employerIndex = employers.findIndex((s)=>{
            return s.id === employerId;
        });

        if(employerIndex >= 0){
            for(let i in req.body){
                employers[employerIndex][i] = req.body[i];
            }
            res.status(200).send(employers[employerIndex]);
        }else{
            res.status(404).send('No employer exists with this ID')
        }
    }else {
        res.status(400).send('Invalid employer id parameter.');
    }
});


// DELETE employer by employer ID parameter
app.delete('/:employer_id', (req,res)=>{
    let employerId = parseInt(req.params.employer_id);

    if(employerId){
        let employerIndex = employers.findIndex((s)=>{
            return s.id === employerId;
        });
        
        if(employerIndex >= 0){
            employers.splice(employerIndex, 1); //Deleting record

            res.status(200).send(employers); //send new list
        }else{
            res.status(404).send('No employer exists with this ID')
        }
    }else {
        res.status(400).send('Invalid employer id parameter.');
    }
});


// ADD employer
app.post('/', (req,res)=>{
    let nextID = parseInt(employers[employers.length-1]['id']) + 1;
    const employer = {
        id: nextID,
        name: req.body.name,
        department: req.body.department,
        salary: parseInt(req.body.salary)
    }
    employers.push(employer);
    res.status(200).send(employer);
});

// Start Server
app.listen(3000, ()=>{
    console.log('Server listening on port 3000....');
});
