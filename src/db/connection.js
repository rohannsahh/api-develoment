import mysql from 'mysql2';
import { orderByDistance } from 'geolib';
import dotenv from 'dotenv';
dotenv.config();

const connection= mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise()
connection.connect((err)=>{
    if(err){console.error(err)}
    console.log('connected to database')
})
// const [rows] = await connection.query("SELECT * FROM schools");
// console.log(rows);


export const addSchool= async function(name,address,latitude,longitude ){
     await connection.query(`INSERT INTO schools( name ,address,latitude ,longitude) VALUES(?,?,?,?)`,[name,address,latitude,longitude]); 
}


export const listSchools = async function (latitude , longitude) {
    const [schools]= await connection.query("SELECT * FROM schools ");
    //  console.log(schools);
    const order = orderByDistance({latitude,longitude},schools)
    console.log(order)
    return order;
   
}

 //listSchools(90,400);

