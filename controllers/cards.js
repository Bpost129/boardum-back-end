import { Card } from "../models/card.js"
import { List } from "../models/list.js"

async function index(req, res) {
  try {
    const cards = await Card.find({})
      .populate('list')
      .sort({ order: 'asc' })
    res.status(200).json(cards)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    req.body.list = req.params.listId
    const card = await Card.create(req.body)
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      { $push: { cards: card } },
      { new: true }
    )
    card.list = list
    res.status(201).json(card)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const card = await Card.findById(req.params.cardId)
      .populate('list')
    res.status(200).json(card)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      req.body,
      { new: true }
    ).populate('list')
    res.status(201).json(card)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteCard(req, res) {
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
  deleteCard as delete,

}