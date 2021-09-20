const mongoose = require('mongoose');
const Schema = mongoose.Schema;






const pollSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    opts:[{
        type: mongoose.Types.ObjectId,
        ref: "Opt"
    }],
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
    multi_opt: {
        type: Boolean,
        required: true
    }
});


module.exports = new mongoose.model('Poll', pollSchema);