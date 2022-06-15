import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import tournamentRoutes from './routes/tournaments.js';

const app = express();

app.use('/tournaments', tournamentRoutes);

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(cors());

const CONNECTION_URL =  'mongodb+srv://tournamentOrganizerBackend:UUMfCkyovAIljLjH@tournament-organizer-cl.qzvfh.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((error) => console.error(error.message));
mongoose.set('useFindAndModify', false);