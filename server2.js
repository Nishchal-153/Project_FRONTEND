const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

const userDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userDataSchema);

// CRUD Endpoints
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(users);
        }
    });
});

app.post('/users', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(user);
        }
    });
});

app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true });
        }
    });
});

// Endpoint to serve the HTML
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding : 20px;
      background-image: url(login\ background.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      margin-top: 20px;
      
    }

    h1 {
      text-align: center;
    }

    form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
  
}
    label {
      margin-top: 20px;
    }

    input[type="email"],
    input[type="text"],
    input[type="password"] {
      padding: 5px;
      margin-top: 5px;
    }

    

    button[type="submit"] {
      padding: 10px;
      margin-top: 10px;
      width: 150px;
      margin-left: 70px;
    }

    button:hover {
      background-color: #459ba0;
      border-radius: 40%;
      width: 150px;
      transition-duration: 2s;
    }

    .signup-button {
      text-align: center;
      margin-top: 20px;
    }

    .signup-button a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #377077;
      color: white;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .signup-button a:hover {
      background-color: #9e91d4;
    }
  </style>
</head>
<body>
  <h1><b>Sign Up</b></h1>
  <form action="home.html">
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="Name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="abc@email.com" required>

    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="min 8 latters 1 capital ,and 1 sign required" required>

    <button type="submit">Sign Up</button>
  </form>
  <p class="signup-button">Don't have an account? <a href="login.html">Log in </a></p>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="app2.js"></script>
</body>
</html>
    `);
});

app.listen(27017, () => console.log('Server running on port 27017'));