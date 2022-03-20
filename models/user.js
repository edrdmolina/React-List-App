const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./list')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: { 
        type: String,
        unique: true,
        required: true
    },
    email: { 
        type: String,
        unique: true,
        required: true
    },
    lists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'List'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

UserSchema.post('findOneAndDelete', async function (doc) {
    
    if(doc) {
        doc.lists.forEach(async list => {
            await List.findOneAndDelete(list)
        });
    }
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);