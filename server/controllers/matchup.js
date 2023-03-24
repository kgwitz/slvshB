const express = require('express')
const router = express.Router()

const MatchupModel = require('../models/Matchups')

router.post('/Matchup', async (req, res) => {
    const matchInput = req.body
    const match = new MatchupModel(matchInput)

    try {
        match.save().then(result => {
            res.send(result)
        })
    } catch(err) {
        console.log(err)
    }
})

router.get('/Matchup', async (req, res) => {

    try {
         MatchupModel.find({}, (err, result) => {
            res.send(result)
        }
        ).clone()
    } catch (err) {
        console.log(err)
    }
})

router.put('/Matchup/Winner', async (req, res) => {
    const input = req.body.input
    const id = req.body.id
    
    try{
        await MatchupModel.findById(id, (err, updatedMatchup) => {
            updatedMatchup.winner = input.winner;
            updatedMatchup.save();
            res.send()
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.put('Matchup/Teams', async (req, res) => {
    const input = req.body.input
    const id = req.body.id

    try{
        await MatchupModel.findById(id, (err, updatedMatchup) => {
            updatedMatchup.round = input.round;
            updatedMatchup.team1 = input.team1;
            updatedMatchup.team2 = input.team2;
            updatedMatchup.save();
            res.send()
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router