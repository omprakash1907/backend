const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

//JWS 

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'your_secret_key');
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
};

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    images: { type: String, required: true },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // createdAt: { type: Date, default: Date.now },
});

const ratingSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const Rating = mongoose.model('Rating', ratingSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    User,
    Recipe,
    Rating,
    Comment
};