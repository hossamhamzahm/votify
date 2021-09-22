const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const voterSchema = new Schema({
    voter: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});



const optSchema = new Schema({
    val: {
        type: String,
        required: true
    },
    num_of_votes: {
        type: Number,
        required: true
    },
    poll:{
        type: mongoose.Types.ObjectId,
        ref: 'Poll'
    },
    voters: [voterSchema]
});


module.exports = new mongoose.model('Opt', optSchema);