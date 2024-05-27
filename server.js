const express = require("express");
const app = express();
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

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Dummy data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
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

// // Route to get a single user by ID
// app.get('/api/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find(user => user.id === id);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
// });


app.listen(process.env.PORT,() => {
    console.log("listening to 8000");
})