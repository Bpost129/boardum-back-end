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
  label: {
    type: String,
  },
  labelColor: {
    type: String,
    enum: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple']
  },
  dueDate: {
    type: Date,
  },
  order: {
    type: Number,
    default: 1
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