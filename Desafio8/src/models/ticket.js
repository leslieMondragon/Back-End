import { Schema, model } from 'mongoose'
import pkg from 'mongoose-paginate-v2';

const ticketCollection = 'tickets'

const TicketSchema = new Schema({

    purchase_datetime: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    }
})

TicketSchema.plugin(pkg)
const TicketModel = model(ticketCollection, TicketSchema)

export default TicketModel