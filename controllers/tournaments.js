import mongoose from 'mongoose';
import Tournament from '../models/tournament.js';
// import { getMonth, startOfYear, startOfDay, endOfDay } from 'date-fns'

export const getTournaments = async (req, res) => {
  // const { page } = req.query;

  try {
    // const LIMIT = 8;
    // const startIndex = (Number(page) - 1) * LIMIT;

    // const total = await Tournament.countDocuments({});
    // const tournaments = await Tournament.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    // res.json({ data: tournaments, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

    const tournaments = await Tournament.find();

    console.log(tournaments);
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTournamentsByQuery = async (req, res) => {
  // const { location, year, month } = req.query
  const { location } = req.query;

  try {
    const locationRegExp = new RegExp(location, 'i');
    // TODO add at month = month !!!
    // let startOfDayDate = startOfDay(new Date(`${year}-09-01`));
    // let endOfDayDate = endOfDay(new Date(`${year + 1}-06-30`));
    // if(getMonth(new Date()) < 5) {
    //     startOfDayDate = startOfYear(new Date());
    //     endOfDayDate = endOfDay(new Date(`${year}-06-30`));
    // }

    const tournaments = await Tournament.find({
      $or: [
        { location: locationRegExp },
        // { at: {
        //     $gte: startOfDayDate,
        //     $lte: endOfDayDate
        //   }
        // }
      ],
    });

    console.log(tournaments);
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTournament = async (req, res) => {
  const tournament = req.body;

  const newTournament = new Tournament({
    ...tournament,
    createdBy: req.userId,
    createdAt: new Date(),
  });

  try {
    await newTournament.save();

    res.status(201).json(newTournament);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getTournament = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const tournament = await Tournament.findById(_id);

    res.status(200).json(tournament);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTournament = async (req, res) => {
  const { id: _id } = req.params;
  const tournament = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No tournament with id: ${_id}`);

  const updatedTournament = await Tournament.findByIdAndUpdate(
    _id,
    { ...tournament, _id: _id },
    { new: true },
  );

  res.json(updatedTournament);
};

export const addComment = async (req, res) => {
  const { id: _id } = req.params;
  const { comment } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No tournament with id: ${_id}`);

  const tournament = await Tournament.findById(_id);
  tournament.comments.push(comment);

  const updatedTournament = await Tournament.findByIdAndUpdate(_id, tournament, { new: true });

  res.json(updatedTournament);
};

export const addPlayer = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No tournament with id: ${_id}`);

  const tournament = await Tournament.findById(_id);
  if (!tournament.players.includes(String(req.userId))) {
    tournament.players.push(req.userId);
  }
  tournament.playerCount = tournament.players.length ?? 0;

  const updatedTournament = await Tournament.findByIdAndUpdate(_id, tournament, { new: true });

  res.json(updatedTournament);
};

export const removePlayer = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No tournament with id: ${_id}`);

  const tournament = await Tournament.findById(_id);
  if (tournament.players.includes(String(req.userId))) {
    tournament.players = tournament.players.filter((id) => id !== String(req.userId));
  }
  tournament.playerCount = tournament.players.length ?? 0;

  const updatedTournament = await Tournament.findByIdAndUpdate(_id, tournament, { new: true });

  res.json(updatedTournament);
};

export const deleteTournament = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No tournament with id: ${_id}`);

  await Tournament.findByIdAndRemove(_id);

  res.json({ message: `Tournament with id ${_id} deleted successfully` });
};
