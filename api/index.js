const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const database = require('./utils/database');
const uacRoutes = require('./routes/uac');
const drugRoutes = require('./routes/drug');
const appointmentRoutes = require('./routes/appointment')
const emailRoutes = require('./routes/email')
const userRoutes = require('./routes/user')

const app = express();

require('./utils/auth')();


const corsOptions = {
    origin:'https://electronic-medical-record-website.onrender.com', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// app.use((req, _res, next) => {
//     console.log(req.headers);
//     next();
// })
    
app.use(passport.initialize());

app.use('/api/uac', uacRoutes);
app.use('/api/appointments',appointmentRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/email/',emailRoutes);
app.use('/api/user', userRoutes);

app.listen(3000, () => {
    database.connect();

    console.log('Server running on port 3000');
});

