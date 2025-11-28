//MINI CRUD DE USUARIO / AUTH
const crypto = require('crypto');
const fs = require('fs'); //este modulo nos sirve para poder trabajar con archivos
const path = require('path'); // este modulo puede construir rutas de archivos

const filePath = path.resolve('./data/users.json'); //ruta absoluta al archivo users.json

//LEER USUARIOS DESDE EL ARCHIVO JSON
const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

//ESCRIBIR USUARIOS AL ARCHIVO JSON
const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

const getAllUsers = (req, res) => {
    try {
        const users = readUsers();
        if (users.length === 0) {
            return res.status(404).json({
                ok: false,
                error: 'No hay usuarios registrados'
            });
        } 
        return res.status(200).json({
            ok: true,
            message: 'Lista de usuarios obtenida exitosamente',
            data:{
                length: users.length,
                users,
            }
        });

     } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            error: 'Error interno del servidor'
        });
     }
}




const register = (req, res) => {
    

    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                error: 'El Email y la contraseña son obligatorios'
            });
        }

        //VALIDAMOS QUE EL EMAIL NO ESTE EN USO
        const users = readUsers();
        const exist = users.find(user => user.email === email);

        if (exist) {
            return res.status(409).json({
                ok: false,
                error: 'El Usuario ya existe'
            });
        }

        //CREAR UN OBJETO NUEVO DE USUARIO
        const newUser = {
            id: crypto.randomUUID(),
            email,
            password // En un entorno real, la contraseña debe ser hasheada antes de guardarla
        };

        //SUMO EL NUEVO USUARIO AL ARRAY DE USUARIOS
        users.push(newUser);

        //ESCRIBO EL ARRAY ACTUALIZADO EN EL ARCHIVO JSON
        writeUsers(users);

        return res.status(201).json({
            ok: true,
            message: 'Usuario registered successfully',
            id: newUser.id,
            email: newUser.email
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            error: 'Error interno del servidor'
        });
    }
}

const login = (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                error: 'El Email y la contraseña son obligatorios'
            });
        }

        const users = readUsers();
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            return res.status(401).json({
                ok: false,
                error: 'Credenciales inválidas'
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Login Exitoso',
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            error: 'Error interno del servidor'
        });
    }
}

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                ok: false,
                error: 'El ID del usuario es requerido'
            });
        }

        const users = readUsers();
       const exist = users.find(user => user.id === id);

        if (!exist) {
            return res.status(404).json({
                ok: false,
                error: 'Usuario no encontrado'
            });
        }

        const filtered = users.filter(user => user.id !== id);
        writeUsers(filtered);

        return res.status(200).json({
            ok: true,
            message: 'Usuario eliminado exitosamente',
            deleteUser: {
                id: exist.id,
                email: exist.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            error: 'Error interno del servidor'
        });
    }
}




module.exports = {
    register,
    login,
    getAllUsers,
    deleteUser,


};


