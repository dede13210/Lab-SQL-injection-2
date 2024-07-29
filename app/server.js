const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const serverPort = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection Configuration
const username = 'admin';
const password = 'password';
const host = '127.0.0.1'; 
const portDB = '27017';
const database = 'ecommerceDB';

// Construct the MongoDB connection URI
const uri = `mongodb://${username}:${password}@${host}:${portDB}/${database}?authSource=admin`;

// MongoDB Connection with Error Handling
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully http://localhost:3000'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Routes using Promises
app.get('/', (req, res) => {
  Product.find({})
    .then(products => res.render('index.ejs', { products: products }))
    .catch(err => {
      console.error('Error retrieving products:', err);
      res.status(500).send("Error retrieving products.");
    });
});

app.get('/search', (req, res) => {
    const searchQuery = req.query.query; // Get the search keyword from the query parameter
    Product.find({ name: new RegExp(searchQuery, 'i') }) // Search for products with a case-insensitive match
      .then(products => {
        res.render('index.ejs', { products: products }); // Render the same page with the search results
      })
      .catch(err => {
        console.error('Error retrieving search results:', err);
        res.status(500).send("Error retrieving products.");
      });
  });
  

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
