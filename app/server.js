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
const host = 'mongodb'; 
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

// Route for the home page with visible products filter
app.get('/', (req, res) => {
  Product.find({ visible: true }) // Only fetch products where visible is true
    .then(products => {
      res.render('index.ejs', { products: products });
    })
    .catch(err => {
      console.error('Error retrieving products:', err);
      res.status(500).send("Error retrieving products.");
    });
});

app.get('/search', (req, res) => {
  let searchQuery = req.query.query; // Get the search keyword from the query parameter

  try {
    // Parse searchQuery as JSON to allow for injection
    searchQuery = JSON.parse(searchQuery);
  } catch (e) {
    // If parsing fails, fall back to a regular expression search
    searchQuery = { name: new RegExp(req.query.query, 'i') };
  }

  // Ensure searchQuery is an object to avoid further errors
  if (typeof searchQuery !== 'object') {
    searchQuery = {};
  }

  // Add a NoSQL injection-like condition: OR 1=1 to bypass visible: true
  searchQuery = {
    $or: [searchQuery, { visible: { $ne: true } }]
  };

  Product.find(searchQuery) // Perform the search with the potentially unsafe query
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
