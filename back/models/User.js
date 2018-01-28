import { model, Schema } from 'mongoose'

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    picture: String,
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model('User', userSchema);