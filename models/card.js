import mongoose from "mongoose"

const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  }
}, {
  timestamps: true
})

const Card = mongoose.model('Card', cardSchema)

export { Card }