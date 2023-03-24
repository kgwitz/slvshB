const mongoose = require('mongoose')

const MatchupSchema = new mongoose.Schema({
    round: {
        type: Number,
        required: true,
    },
    team1: {
        type: String,
        required: true,
    },
    team2: {
        type: String,
        required: true,
    },
    winner: {
        type: String,
        required: false,
    }
})

const Matchup = mongoose.model('Matchup', MatchupSchema)
module.exports = Matchup