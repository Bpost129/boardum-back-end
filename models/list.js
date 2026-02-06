import mongoose from "mongoose"

const Schema = mongoose.Schema

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }]
}, {
  timestamps: true
})

const List = mongoose.model('List', listSchema)

export { List }