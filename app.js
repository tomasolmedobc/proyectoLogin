//1 - Invocamos a express
const express = require('express')
const app = express();

//2 - Seteamos urlendcoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 - Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});


//4 - El directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

//6 - Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//7 - Var. de session
const session = require ('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

//Llama router
app.use('/', require('./router/router'));

//8 - Invocamos al modulo de conexion de la DB
const connection = require('./config/db');
const connection2 = require('./config/db2');
const auth = require('./auth/auth')

//9 - Estableciendo las rutas
app.get('/login', (req, res) => {
    res.render('login', {msg: 'Esto es un mensaje desde NODE'});
})


app.get('/register', (req, res) => {
    res.render('register', {msg: 'Esto es un mensaje desde NODE'});
})

//10 - Registracion
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);

connection.query('INSERT INTO users (username, name, email, rol, password) VALUES (?, ?, ?, ?, ?)',
        [username, name, email, rol, passwordHash],
        async (error, results) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    // Error de duplicado: username o email ya registrados
                    let errorMessage = 'El nombre de usuario o el email ya están registrados.';
                    if (error.sqlMessage.includes('username')) {
                        errorMessage = 'El nombre de usuario ya está registrado.';
                    } else if (error.sqlMessage.includes('email')) {
                        errorMessage = 'El email ya está registrado.';
                    }
                    res.render('register', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: errorMessage,
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
                    });
                } else {
                    console.log(error);
                    res.render('register', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Error al registrar el usuario.",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''
                    });
                }
            } else {
                res.render('register', {
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "Registro exitoso.",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        });
});
//11 Autentication
app.post('/auth', async (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    
    if (username && pass) {
        connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (error, results) => {
            if (error) {
                console.log(error);
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Ocurrió un error en la autenticación",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].password))) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o contraseña incorrectos",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    });
                } else {
                    req.session.loggedin = true;
                    req.session.name = results[0].name;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión Exitosa",
                        alertMessage: "¡Login Correcto!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    });
                }
            }
        });
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "¡Por favor ingrese un usuario y/o contraseña!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
    }
});

//12 - Auth pages
app.get('/', (req, res)=>{
    if (req.session.loggedin) {
        res.render('index',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('index',{
            login:false,
            name:'Debe iniciar session'
        })
    }
})

//13 - Logout
app.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

//Ejecuta nodejs
app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})

console.log(__dirname);
