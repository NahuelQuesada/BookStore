const express = require('express');
const router = express.Router();

//RUTA QUE ME LISTA TODOS MIS PRODUCTOS
router.get('/', (req, res) => {
    res.send('Lista de todos los libros de nuestro catalogo');
});

//RUTA QUE ME LISTA UN SOLO PRODUCTO
router.get('/libro', (req, res) => {
    res.send('Harry Potter y la piedra filosofal');
});

router.post('/newBook', (req, res) => {
    const {title, price} = req.body;

    res.send('El nuevo libro se llama: ' + title + ' y su precio es de: ' + price);
});


module.exports = router


