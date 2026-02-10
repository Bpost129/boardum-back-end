import { List } from "../models/list.js"
import { Board } from "../models/board.js"

async function index(req, res) {
  try {
    const lists = await List.find({ board: req.params.boardId })
      .populate('board')
      .sort({ createdAt: 'asc'})
      // .sort({ order: 'asc' })
    res.status(200).json(lists)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    req.body.board = req.params.boardId
    const list = await List.create(req.body)
    const board = await Board.findByIdAndUpdate(
      req.params.boardId,
      { $push: { lists: list } },
      { new: true }
    )
    list.board = board
    res.status(201).json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const list = await List.findById(req.params.listId)
      .populate('board')
    res.status(200).json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      req.body,
      { new: true }
    ).populate('board')
    res.status(201).json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteList(req, res) {
  try {
    const list = await List.findByIdAndDelete(req.params.listId)
    const board = await Board.findById(req.params.boardId)
    board.lists.remove({ _id: req.params.listId })
    await board.save()
    res.status(200).json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
  create,
  show,
  update,
  deleteList as delete,

}