const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;




const userSchema = new Schema({
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
userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model('User', userSchema);



// ,
// author: {
//     type: mongoose.Types.ObjectId
// }