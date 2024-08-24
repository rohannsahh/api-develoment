import express from 'express';
import { addSchool, listSchools } from './db/connection.js';
import bodyParser from 'body-parser';
const app= express();

app.use(bodyParser.json());

app.get('/listSchools', async(req,res)=>{
    try {
        const {latitude,longitude}= req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }
        
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ error: "Latitude and longitude must be valid numbers" });
        }
        const list = await listSchools(lat, lon);
         res.status(200).json(list);

    } catch (error) {
        console.error('Error retrieving schools:', error);
        res.status(500).json({ error: "An error occurred while retrieving the list of schools" });
    }
    
  
})
app.post('/addSchool', async(req,res)=>{
    try {
        const {name ,address,latitude,longitude}=req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ error: "All fields are required" });
        }

      
        const data=  await addSchool(name,address,latitude,longitude);
        res.status(201).send('school added'); 
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: "An error occurred while adding the school" });
    }
    
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(501).send('error')
})

app.listen(8080,()=>{
    console.log('server is running  ')
})