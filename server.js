const express = require('express');
const routes = require('./Develop/config/connection');
// Importing the Sequelize connection
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.port || 3001;

// Connecting to the MySQL database using Sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
    // replace 'database_name', 'username', 'password'! configure with your actual database credentials.
    host: 'localhost',
    dialect: 'mysql',
  });

// Define the Product model
const Product = sequelize.define('Product', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce API!');
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Error getting products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
