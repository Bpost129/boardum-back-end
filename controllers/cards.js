import { Card } from "../models/card.js"
import { List } from "../models/list.js"

async function index(req, res) {
  try {
    const cards = await Card.find({ list: req.params.listId})
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
    card.order = list.cards.length
    card.save()
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
    const { cardId } = req.params;
    let updateData = { ...req.body };
    const { listId: newListId, order: newOrder } = req.body;
    const oldListId = req.params.listId;

    // helper to normalise card.order values in a list to match array sequence
    const normaliseOrders = async (listId) => {
      const list = await List.findById(listId);
      if (!list) return;
      for (let i = 0; i < list.cards.length; i++) {
        await Card.findByIdAndUpdate(list.cards[i], { order: i });
      }
    };

    // If moving to a different list, adjust both lists
    if (newListId && newListId !== oldListId) {
      // remove from old list
      await List.findByIdAndUpdate(
        oldListId,
        { $pull: { cards: cardId } },
        { new: true }
      );

      // insert into new list at position if provided
      if (typeof newOrder === 'number') {
        await List.findByIdAndUpdate(
          newListId,
          { $push: { cards: { $each: [cardId], $position: newOrder } } },
          { new: true }
        );
      } else {
        await List.findByIdAndUpdate(
          newListId,
          { $push: { cards: cardId } },
          { new: true }
        );
      }

      // set card metadata
      updateData.list = newListId;
      if (typeof newOrder === 'number') {
        updateData.order = newOrder;
      }

      // normalise both lists so all card.order are consistent
      await normaliseOrders(oldListId);
      await normaliseOrders(newListId);
    } else if (newListId === oldListId && typeof newOrder === 'number') {
      // reorder within same list
      const list = await List.findById(oldListId);
      list.cards.pull(cardId);
      list.cards.splice(newOrder, 0, cardId);
      await list.save();
      updateData.order = newOrder;
      await normaliseOrders(oldListId);
    }

    const card = await Card.findByIdAndUpdate(
      cardId,
      updateData,
      { new: true }
    ).populate('list');
    res.status(201).json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteCard(req, res) {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId)
    const list = await List.findById(req.params.listId)
    list.cards.remove({ _id: req.params.cardId })
    await list.save()
    res.status(200).json(card)
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