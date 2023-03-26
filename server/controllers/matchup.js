const express = require('express')
const router = express.Router()

const MatchupModel = require('../models/Matchups')
const UserModel = require('../models/Users')

router.post('/Matchup', async (req, res) => {
    const matchInput = req.body
    const match = new MatchupModel(matchInput)

    try {
        match.save().then(result => {
            res.send(result)
        })
    } catch (err) {
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

    try {
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

    try {
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

router.get('/Matchup/Votes', async (req, res) => {

    try {
        await MatchupModel.find({}, async (err, matchups) => {
            await UserModel.find({}, (err, users) => {
                const matchupVotes = matchups.map((matchup) => {
                    // const { matchupID, team1, team2 } = ;
                    const scores = findVotes(matchup, users)
                    return {matchupId: matchup._id, team1: scores[0], team2: scores[1]}
                })
                console.log("MATCHUP VOTES", matchupVotes)
                res.send(matchupVotes)
            }).clone()
        }).clone()
    } catch (err) {
        console.log(err)
        res.send(err)
    }

})

const findVotes = (matchup, users) => {
    let numberOfVotes = [0, 0];

    users.map((user) => {
        user.selection.forEach((selectionObj) => {
            if (!selectionObj.winner || selectionObj.winner == '') {
                console.log('here')
                return
            }

            if (selectionObj.winner == matchup.team1) {
                console.log('matchup team 1')
                numberOfVotes[0] = numberOfVotes[0] + 1
            } else if (selectionObj.winner == matchup.team2) {
                console.log('matchup team 2')
                numberOfVotes[1] = numberOfVotes[1] + 1
            }
        });
    });

    console.log('number of votes')
    return numberOfVotes
}



module.exports = router