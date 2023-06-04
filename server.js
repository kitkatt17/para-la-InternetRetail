const express = require('express');
const mysql = require('mysql');
const routes = require('./Develop/config/connection');
// Importing the Sequelize connection
const { Sequelize, DataTypes, DECIMAL } = require('sequelize');

const app = express();
const port = process.env.port || 3001;

// Routes
app.use(routes);

// Connecting to the MySQL database using Sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
    // replace 'database_name', 'username', 'password'! configure with your actual database credentials.
    host: 'localhost',
    dialect: 'mysql',
  });

// For the connection to db and server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Defining the Category database model
const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.FLOAT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

// Defining the Product database model
const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.FLOAT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      decimalNumbers: true,
      allowNull: false,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 10,
    },
  });

// Defining the Tag database model


// // Setting up the association between 'Category' and 'Product'
// Category.hasMany(Product);  
// Product.belongsTo(Category);


// Syncing the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// For the middleware
app.use(express.json());

// For the routes
app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce API.');
});

// Get all the products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Error getting products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Creating a new product
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

// Starting the server
app.listen(port, () => {
  console.log(`Server is running and listening on http://localhost:${port}`);
});
