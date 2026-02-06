import { Board } from "../models/board.js"
import { Profile } from "../models/profile.js"

async function index(req, res) {
  try {
    const boards = await Board.find({})
      .populate('owner')
      .sort({ updatedAt: 'asc' })
    res.status(200).json(boards)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const board = await Board.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { boards: board } },
      { new: true }
    )
    board.owner = profile
    res.status(201).json(board)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const board = await Board.findById(req.params.boardId)
      .populate('owner')
    res.status(200).json(board)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.boardId,
      req.body,
      { new: true }
    ).populate('owner')
    res.status(201).json(board)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteBoard(req, res) {
  try {
    
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
  deleteBoard as delete,

}