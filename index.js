const express = require("express");
const app = express();

// coba pake sessionn ya mas indra, kalo salah maap wkwkwk
const sessions = require('express-session')
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static('public'));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

app.use(function(req, res, next) {
    res.locals.email = req.session.email;
    next();
});

let auth = require('./db/auth.json');
const port = 4000;

//cek session sudah login atau belum
var sess;
app.get('/', (req, res) => {
    sess = req.session;
    if (sess.email) {
        return res.redirect('/index');
    }
    return res.render('login')
});

//kalau login sama masuk kesini
app.get('/index', (req, res) => {
    sess = req.session;
    if (sess.email) {
        res.render('index')
    }

});

app.get('/start', (req, res) => {
    res.render('start')
})

app.get('/auth', (req, res) => {
    res.status(200).json({
        message: "Success",
        data: auth,
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const session = req.session;
    console.log(session);
    let login = [];
    login = auth.find((item) => {
        if (item.email == req.body.email && item.password == req.body.password) {
            return item;
        }
    });
    console.log(login);
    if (login == undefined) {
        res.redirect("/login?fail=true")
            // res.redirect('/login');
    } else {
        session.email = req.body.email;
        res.redirect("/login?success=true")
            // res.redirect(`/`);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.listen(port);