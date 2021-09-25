const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const voterSchema = new Schema({
    voter:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});



const pollSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    opts:[{
        type: mongoose.Types.ObjectId,
        ref: "Opt"
    }],
    voters:[voterSchema],
    author:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: String,
    total_num:{
        type: Number,
        required: true
    },
    add_opt: {
        type: Boolean,
        required: true
    },
    multi_opt: {
        type: Boolean,
        required: true
    },
    allow_download: {
        type: Boolean,
        required: true
    }
});


module.exports = new mongoose.model('Poll', pollSchema);