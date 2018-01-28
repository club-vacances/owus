import { model, Schema } from 'mongoose'

const transactionSchema = Schema({
    _id: Schema.Types.ObjectId,
    description: String,
    amount: Number,
    paidBy: { type: Schema.Types.ObjectId, ref: 'User' },
    paidFor: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model('Transaction', transactionSchema);