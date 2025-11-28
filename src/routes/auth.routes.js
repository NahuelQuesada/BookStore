const express = require('express');
const router = express.Router();
const {register} = require('../controllers/auth.controller');
const {login} = require('../controllers/auth.controller');
const {getAllUsers} = require('../controllers/auth.controller');
const {deleteUser} = require('../controllers/auth.controller');


//EndPoints
router.get("/users", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.delete("/users/:id", deleteUser); //Ruta Parametrizada
    



module.exports = router;