import express from 'express';
import {
  getTournamentsByQuery,
  getTournaments,
  createTournament,
  getTournament,
  updateTournament,
  deleteTournament,
} from '../controllers/tournaments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getTournamentsByQuery);
router.get('/', getTournaments);
router.get('/:id', getTournament);

router.post('/', auth, createTournament);
router.patch('/:id', auth, updateTournament);
router.delete('/:id', auth, deleteTournament);

export default router;
