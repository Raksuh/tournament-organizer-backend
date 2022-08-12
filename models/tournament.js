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
  registrations: [
    {
      // Identity
      playerId: String,
      typeOfPerson: String,
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      // Meals
      needLunchPack: Boolean,
      isVegetarianLunchPack: Boolean,
      needDinner: Boolean,
      isVegetarianDinner: Boolean,
      // Journey
      personnalVehicle: Boolean,
      seats: {
        type: Number,
        default: 0,
      },
      isDepartureIndepedent: Boolean,
      departureTime: {
        type: Date,
        default: new Date(),
      },
      isReturnIndepedent: Boolean,
      returnTime: {
        type: Date,
        default: new Date(),
      },
      needHotelForFriday: Boolean,
      needHotelForSaturday: Boolean,
      // Remarks
      remarks: String,
    },
  ],
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
