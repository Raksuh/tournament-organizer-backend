import mongoose from 'mongoose';

const tournamentSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  createdBy: String,
  name: String,
  location: String,
  at: String,
  dueDate: String,
  selectedFile: String,
  comments: {
    type: [String],
    default: [],
  },
  players: {
    type: [String],
    default: [],
  },
  // [{
  //     firstName: String,
  //     lastName: String,
  //     isPlayer: Boolean,
  //     isAnAccompanyingPerson: Boolean,
  //     isDriver: Boolean,
  // }],
  playerCount: {
    type: Number,
    default: 0,
  },
  accompagnyingPeople: [String],
  vehicules: [
    {
      driver: String,
      numberOfSeat: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
