const mongoose = require('mongoose');
module.exports = mongoose.model('Light', new mongoose.Schema(
{
    id: Number,
    location: String,
    user: String,
    lightData: Array
    // volt: String,
    // lux: String,
    // status: String,
}));