const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '34.133.113.206',
  user: 'root',
  password: 'jam',
  database: 'db02',
  namedPlaceholders: true
});

// POPULATE TABLE
app.get('/api/populate', (req, res) => {
    const query = req.query;
    const params = req.params;

    connection.execute(
        `SELECT property_id, city, price_per_day, next_available_day, numerical_rating FROM react_table`, 
        (err, val) => {
        if (err) throw err;
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });

});

// ADD
app.post('/api/add_entry', (req, res) => {
    const query = req.query;
    const params = req.params;

    console.log('who called');

    connection.execute(
        `INSERT INTO react_table VALUES (:property_id, :city, :price_per_day, :next_available_day, :numerical_rating);`, 
        {property_id: req.query.property_id, city: req.query.city, price_per_day: parseInt(req.query.price_per_day), next_available_day: parseFloat(req.query.next_available_day), numerical_rating: parseFloat(req.query.numerical_rating)}, 
        (err, val) => {
        console.log(err, val);
        if (err) throw err;
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });

});

// EDIT
app.put('/api/:id', (req, res) => {
    const query = req.query;
    const params = req.params;

    console.log({id: req.params.id, ...req.query, price_per_day: parseInt(req.query.price_per_day), next_available_day: parseFloat(req.query.next_available_day), numerical_rating: parseFloat(req.query.numerical_rating) ?? null});

    connection.execute(
        `UPDATE react_table 
        SET city = :city, 
        price_per_day = :price_per_day,
        next_available_day = :next_available_day,
        numerical_rating = :numerical_rating
        WHERE property_id = :id;`, 
        {id: req.params.id, ...req.query, price_per_day: parseInt(req.query.price_per_day), next_available_day: parseFloat(req.query.next_available_day), numerical_rating: parseFloat(req.query.numerical_rating) ?? null}, 
        (err, val) => {
        if (err) throw err;
        console.log(val);
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });
});

// DELETE
app.post('/api/:id', (req, res) => {
    const query = req.query;
    const params = req.params;

    connection.execute(
        `DELETE FROM react_table WHERE property_id = :id`,
        {id: req.query.id}  ,
        (err, val) => {
        if (err) throw err;
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });
});

// QUERY 1
app.get('/api/query1', (req, res) => {
    const query = req.query;
    const params = req.params;
    // res.send(`hello\nqueries: ${JSON.stringify(query)}\nparams: ${JSON.stringify(params)}`);

    connection.execute(
        `SELECT property_id, next_available_day, AVG(price_per_day) 
        FROM Property_Information NATURAL JOIN Property_Location JOIN Rental_Period 
        USING (property_id) WHERE (city LIKE "Chicago" AND neighbourhood LIKE "Lake View") 
        GROUP BY property_id HAVING AVG(price_per_day) BETWEEN 50 AND 100 
        ORDER BY next_available_day;`, 
        (err, val) => {
        if (err) throw err;
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });
});

// QUERY 2
app.get('/api/query2', (req, res) => {
    const query = req.query;
    const params = req.params;

    connection.execute(
        `SELECT ui.first_name, ui.last_name FROM User_Information ui 
        WHERE ui.user_id IN (SELECT owner_id FROM Property_Information 
        NATURAL JOIN Property_Location WHERE city LIKE "Chicago" AND number_of_beds > 3) LIMIT 15;`, 
        (err, val) => {
        if (err) throw err;
        // val = [{...result here}, {...other result here}]
        res.send(val);
    });
});


app.use(cors());

app.listen(5000, () => {
    console.log('listening');
});