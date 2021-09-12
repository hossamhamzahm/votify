const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    f_name: {
        type: String,
        required: true,
    },
    l_name: {
        type: String,
        required: true,
    },
    polls:[{
        type: mongoose.Types.ObjectId,
        ref: 'Poll'
    }],
    num_of_polls:{
        type: Number,
        required: true
    }
});
//remember to add passport here

module.exports = new mongoose.model('User', userSchema);



// ,
// author: {
//     type: mongoose.Types.ObjectId
// }