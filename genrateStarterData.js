const mongoose = require('mongoose');
const Product = require('./model'); // Importing the Product model

mongoose.connect('mongodb://127.0.0.1:27017/mensWearDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Use the Product model here
  const product = new Product({
    name: 'Shirt',
    price: 29.99,
    category: 'Tops',
    inStock: true
  });

  product.save().then(() => {
    console.log('Product saved');
    mongoose.connection.close();
  });
})
.catch(err => console.error('Connection error', err));

