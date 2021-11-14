const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoute = require('./routes/users');
const ticketRoute = require('./controllers/ticketController');
const messageRoute = require('./controllers/contactUs');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();

dotenv.config();

mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (err) =>{
    console.log(err)
})

db.once('open', () =>{
    console.log('database connection established')
})

app.use(cors({
    origin: ['http://localhost:4300', 'http://127.0.0.1:4300'],
    credentials: true
}))

// passport config

app.use(session({
    name: 'myname.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    }
}));

require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session())

app.use(express.json());

//routes

app.use('/api/messages', messageRoute)
app.use('/api/ticket', ticketRoute);
app.use('/api', authRoute);

app.get('/', (req, res) =>{
    res.send('Hello, world');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app runing on localhost:${port}`));

