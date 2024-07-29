db.createCollection("products");

db.products.insertMany([
  { 
    name: "Product 1", 
    price: 10, 
    description: "A compact and powerful USB charger, ideal for travelers and those who need reliable power on-the-go. Features fast charging capabilities with dual USB ports.",
    category: "Electronics",
    quantity: 100,
    dateAdded: new Date()
  },
  { 
    name: "Product 2", 
    price: 20, 
    description: "Stylish and comfortable cotton t-shirt, available in various sizes and colors. Perfect for casual outings and light athletic activities.",
    category: "Clothing",
    quantity: 50,
    dateAdded: new Date()
  },
  { 
    name: "Product 3", 
    price: 30, 
    description: "Engaging contemporary novel by a bestselling author, exploring themes of adventure and self-discovery. A must-read for book lovers.",
    category: "Books",
    quantity: 150,
    dateAdded: new Date()
  }
]);

