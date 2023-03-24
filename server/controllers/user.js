const express = require('express')
const router = express.Router()

const UserModel = require('../models/Users')
const MatchupModel = require('../models/Matchups')

router.post('/CreateUser', async (req, res) => {
    const userInput = req.body
    const user = new UserModel(userInput)

    try {
        user.save().then(result => {
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/Login', async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    if (password == null || '') {
        res.sendStatus(400)
    }

    try {
        UserModel.find({ userName: userName, password: password }, (err, result) => {
            if (err) {
                res.send(err)
            }
            res.send(result)
        }
        )
    } catch (err) {
        console.log(err)
    }
})

router.get('/User', async (req, res) => {
    const id = req.query.id

    try {
        UserModel.findById(id, (err, result) => {
            res.send(result)
        }
        ).clone()
    } catch (err) {
        console.log(err)
    }
})

router.put('/User', async (req, res) => {
    const userInput = req.body

    try {
        await UserModel.findById(userInput._id, (err, updatedUser) => {
            updatedUser.selection = userInput.selection;
            updatedUser.save();
            res.send(updatedUser)
        }).clone()
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/Leaderboard', async (req, res) => {

    try {
        await UserModel.find({}, async (err, users) => {
            console.log('found all users')

            await MatchupModel.find({}, (err, matchups) => {
                console.log('found matchups', matchups)

                const userScores = users.map((user) => {
                    const {userName, score} = user;
                    const updatedScore = findWinners(user, matchups)
                    return {userName, score: updatedScore}
                })

                console.log(userScores)

                res.send(userScores)
            }).clone()
        }).clone()
    } catch (err) {
        res.send(err)
    }
})

const findWinners = (user, matchups) => {
    let numberOfWinners = 0;
    user.selection.forEach(selectionObj => {
        let hasWinner = matchups.some(matchupObj => {return (matchupObj.winner == selectionObj.winner && matchupObj._id == selectionObj.id)});
        if (hasWinner) {
            numberOfWinners += 1;
        }
    });

    return numberOfWinners
}

module.exports = router