import express from 'express';
import {
  getTournamentsByQuery,
  getTournaments,
  createTournament,
  getTournament,
  updateTournament,
  addComment,
  addPlayer,
  removePlayer,
  deleteTournament,
} from '../controllers/tournaments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getTournamentsByQuery);
router.get('/', getTournaments);
router.get('/:id', getTournament);

router.post('/', auth, createTournament);
router.patch('/:id', auth, updateTournament);
router.post('/:id/addComment', auth, addComment);
router.patch('/:id/addPlayer', auth, addPlayer);
router.patch('/:id/removePlayer', auth, removePlayer);
router.delete('/:id', auth, deleteTournament);

export default router;
