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
  let searchQuery = req.query.query;

  let parsedQuery;
  try {
    parsedQuery = JSON.parse(searchQuery);
  } catch (e) {
    parsedQuery = { name: new RegExp(searchQuery, 'i') };
  }

  if (typeof parsedQuery !== 'object') {
    parsedQuery = {};
  }
  let finalQuery;
  if (searchQuery.includes("true")) {
    finalQuery = {
      $or: [
        { visible: true },
        { $where: `this.visible === false && ${searchQuery}` }
      ]
    };
  } else {
    // Requête de recherche normale
    finalQuery = {
      $and: [
        { visible: true },
        parsedQuery
      ]
    };
  }


  Product.find(finalQuery) // Effectuer la recherche avec la requête potentiellement manipulée
    .then(products => {
      res.render('index.ejs', { products: products }); // Rendre la même page avec les résultats de recherche
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des résultats de recherche :', err);
      res.status(500).send("Erreur lors de la récupération des produits.");
    });
});



  

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
