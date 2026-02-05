import mongoose from "mongoose"

const Schema = mongoose.Schema

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile' 
  },
  lists: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'List' 
  }]
}, {
  timestamps: true,
})

const Board = mongoose.model('Board', boardSchema)

export { Board }