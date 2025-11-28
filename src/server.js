const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
//IMPORTAR RUTAS
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const userRoutes = require('./routes/user.routes');



const app = express();
// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/users', userRoutes);




//Puerto
const  port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





