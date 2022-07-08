import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import tournamentRoutes from './routes/tournaments.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/tournaments', tournamentRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('NiortGAA Tournament Organizer Backend App running.');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }),
  )
  .catch((error) => console.error(error.message));
mongoose.set('useFindAndModify', false);
