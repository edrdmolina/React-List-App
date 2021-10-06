const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

const ListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Item'
        }
    ]
})

ListSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Item.deleteMany({
            _id: {
                $in: doc.items
            }
        })
    }
})



module.exports = mongoose.model('List', ListSchema);