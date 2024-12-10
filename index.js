
//=== npm i colors
//=== npm i express-graphql
//=== npm i graphql
//=== npm i mongoose
//=== npm install dotenv --save
//=== mongoose.connect('mongodb://username:password@host:port/database?options...');

const ProjectsCollection = require('./mongodb_tools/project');
const ClientsCollection = require('./mongodb_tools/client');

const schema = require('./grapql_schema/schema');

const mongoDBAdapter = require('./mongodb_tools/mongodb_connect');

const colors = require('colors');

require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');

const express = require('express');

mongoDBAdapter()

const bodyParser = require('body-parser'); // Middleware for parsing JSON

const app = express();
const port = 3100;

var cors = require('cors');

const ALLOWED_ORIGINS=
    'https://foo.example1 ' +
    'http://localhost:3000 ' +
    'http://localhost:8080 '

const customCorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ALLOWED_ORIGINS.split(" ");
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Request from unauthorized origin"));
        }
    },
};

app.use(cors(
    customCorsOptions
));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle HTTP GET requests
app.get('/hello', (req, res) => {
    res.send('Hello, Express!');
});

// Sample data for HTTP GET request example

const items2 = [
    {
        id: 1,
        name: 'item1'
    },
    {
        id: 2,
        name: 'item2'
    },
    {
        id: 3,
        name: 'item3'
    }
]

app.get('/items', (req, res) => {
    res.json(items2);
});

// Route to handle HTTP POST requests
app.post('/schema_settings', (req, res,next) => {
    console.log('=== post schema_settings  ')
    res.json({schema});
});

app.post('/items', (req, res,next) => {
    console.log('=== req.body  ',req.body)
    const { item, id } = req.body;
    items2.push({ id, item });
    res.json(items2);
});

// Route to handle HTTP PUT requests
app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;

    const updatedItem = req.body; // Use the whole body as the updated item
    const itemIndex = items2.findIndex(item => item.id == itemId); // Find the index of the item to update


    if (itemIndex !== -1) {
        items2[itemIndex] = updatedItem;
        res.json(items2);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Route to handle HTTP DELETE requests
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id); // Parse the ID to an integer
    const itemIndex = items2.findIndex(item => item.id === itemId); // Find the index of the item to delete

    if (itemIndex !== -1) {
        items2.splice(itemIndex, 1); // Remove 1 item at the found index
        res.json(items2);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

function logErrors (err, req, res, next) {
    console.error('=== logErrors === ',err.stack)
    //===DOC native resction  next(err)
}

app.use(logErrors)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
