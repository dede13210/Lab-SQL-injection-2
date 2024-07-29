const mongoose = require('mongoose');

// Replace the following with your MongoDB connection string, username, and password
const username = 'admin';
const password = 'password';
const host = 'localhost'; 
const port = '27017';  
const database = 'ecommerceDB';
const authDatabase = 'admin';  

// Construct the connection URI
const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authDatabase}`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: "Product 1", price: 10, description: "Description for product 1" },
  { name: "Product 2", price: 20, description: "Description for product 2" },
  { name: "Product 3", price: 30, description: "Description for product 3" }
];

Product.insertMany(products, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully inserted products into the database.");
  }
  mongoose.connection.close();
});
