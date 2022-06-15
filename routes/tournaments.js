import express from "express";
import { getTournaments, createTournament } from "../controllers/tournaments.js";

const router = express.Router();

router.get('/', getTournaments)
router.post('/', createTournament)

export default router;