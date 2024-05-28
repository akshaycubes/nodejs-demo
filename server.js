const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// Middleware for parsing JSON requests
 app.use(bodyParser.json()); 
require("dotenv").config()

app.get('/api/get',(req,res) => {
    res.send({message:"hello Hardik Welcome to nodejs project "})
})

app.get('/api/get_user_details',(req,res) => {
    res.send({
        user:{
            name:"hardik",
            lastname: "Pansani",
            contact:12254
        },env :process.env.NAME
    })
});

// Dummy data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'John Doe', email: 'john@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'John Doe', email: 'john@example.com' },
    { id: 6, name: 'John Doe', email: 'john@example.com' },
    { id: 7, name: 'John Doe', email: 'john@example.com' },
    { id: 8, name: 'John Doe', email: 'john@example.com' },
    { id: 9, name: 'John Doe', email: 'john@example.com' },
    { id: 10, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'be', email: 'be@example.com' },
    { id: 11, name: 'be2', email: 'be@example.com' },
    { id: 11, name: 'kirtan', email: 'kirtan@example.com' },
];

// Routes
// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// Add a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update an existing user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    users = users.map(user => {
        if (user.id === userId) {
            return { ...user, ...updatedUser };
        }
        return user;
    });

    res.json(updatedUser);
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).end();
});



app.listen(process.env.PORT,() => {
    console.log("listening to 8000");
})