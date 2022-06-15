import TournamentMessage from "../models/tournamentMessage.js";

export const getTournaments = async (req, res) => {
    try {
        const tournaments = await TournamentMessage.find();
        
        console.log(tournaments);
        res.status(200).json(tournaments);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export const createTournament = async (req, res) => {
    const tournament = req.body;

    const newTournament = new TournamentMessage(tournament);
    
    try {
        await newTournament.save();  
        
        res.status(201).json(newTournament);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
};