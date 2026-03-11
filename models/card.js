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
    color: {
      type: String,
      default: 'Red',
      enum: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple']
    },
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