const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const optSchema = new Schema({
    val:{
        type: String,
        required: true
    },
    num_of_votes:{
        type: Number,
        required: true
    },
    // voters: [users]
});


const pollSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    opts:[optSchema],
    // voters:[{
    //     users
    // }],
    // author:{
    //      type: 
    //      required: true
    // }
    description: String,
    total_num:{
        type: Number,
        required: true
    },
    add_opt: {
        type: Boolean,
        required: true
    },
    mutli_opt: {
        type: Boolean,
        required: true
    }
});


module.exports = new mongoose.model('Poll', pollSchema);