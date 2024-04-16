const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://omprakashkjat19:Mp6RjeJoLEx9SvC3@test.fkf1bxq.mongodb.net/Recipe')
    .then(() => console.log('Connected!'));
const { User, Recipe, Rating, Comment } = require('./Model/schema');


app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
    res.send('hellow')
});

app.get('/recipes', (req, res) => {
    res.json("recipes");
});

app.post('/recipes', async (req, res) => {
    const { title, instructions, ingredients, images } = req.body;
    try {
        const newRecipe = new Recipe({ title, instructions, ingredients, images });
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add recipe', error: error.message });
    }
});

app.get('userauth',  (req,res) =>{
    res.send('user')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});