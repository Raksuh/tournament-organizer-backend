import mongoose from 'mongoose';

const tournamentSchema = mongoose.Schema({
    location: String,
    at: Date,
    dueDate: Date,
    players: [{
        firstName: String,
        lastName: String,
        isPlayer: Boolean,
        isAnAccompanyingPerson: Boolean,
        isDriver: Boolean,
    }],
    vehicules: [{
        driver: String,
        numberOfSeat: {
            type: Number,
            default: 0
        }
    }],
    playerCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    createdBy: String
});

const TournamentMessage = mongoose.model('TournamentMessage', tournamentSchema);

export default TournamentMessage;