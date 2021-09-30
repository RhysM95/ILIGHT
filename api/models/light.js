const mongoose = require('mongoose');
module.exports = mongoose.model('Plant', new mongoose.Schema(
{
    id: Number,
    location: String,
    user: String,
    lightData: Array
    // volt: String,
    // light: String,
    // status: String,
}));