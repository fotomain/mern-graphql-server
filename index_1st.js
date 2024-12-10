
const express = require('express');
const app = express();

var cors = require('cors');

var whitelist = [
    'http://0.0.0.0:3000',
    'http://0.0.0.0:3100',
    'http://0.0.0.0:8100',
    'http://localhost:3000',
    'http://localhost:3100',
];

var corsOption0 = {
    origin: true,
    // origin: function(origin, callback){
    //     var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    //     callback(null, originIsWhitelisted);
    // },
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: true,
    // credentials: true,
    // optionsSuccessStatus: 200,
    // exposedHeaders: ['x-auth-token',
    //     "Access-Control-Allow-Credentials",
    //     {'Access-Control-Allow-Origin' : '*'}
    // ]
};

const issue2options = {
    origin: true,
    methods: ["POST"],
    credentials: true,
    maxAge: 3600
};

app.use(function(req, res, next) {

    // res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors());
app.use(cors(

));

const routes = require("./routes");

app.use('/api/v1/', routes);

app.use(express.json());

const port = 3100;
app.listen(port, () => console.log('App listening on port ' + port));
