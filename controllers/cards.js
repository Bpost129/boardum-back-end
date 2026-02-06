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

export {
  index,
  create,

}