import { List } from "../models/list.js"
import { Board } from "../models/board.js"

async function index(req, res) {
  try {
    const lists = await List.find({})
      .populate('board')
      .sort({ order: 'asc' })
    res.status(200).json(lists)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    // req.body.board = 
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
  create,

}