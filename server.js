const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://omprakashkjat19:Mp6RjeJoLEx9SvC3@test.fkf1bxq.mongodb.net/Recipe')
    .then(() => console.log('Connected!'));
const {  Recipe, Rating, Comment } = require('./Model/schema');


app.use(bodyParser.json());
app.use(express.json());
app.use(cors())




app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
    res.send('hellow')
});

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
    }
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



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});