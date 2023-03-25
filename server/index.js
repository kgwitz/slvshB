const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3030;

// your code




const userRouter = require('./controllers/user')
const matchupRouter = require('./controllers/matchup')

app.use(express.json())
app.use(cors('https://slvsh-bracket.onrender.com'))

app.use(userRouter)
app.use(matchupRouter)

mongoose.connect('mongodb+srv://kurtisgassewitz:soDvbabtOaNpcTdp@slvshbracket.awyezl6.mongodb.net/bracket?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    }
)

// app.listen(3001, () => {
//     console.log('SERVER RUNNING ON PORT 3001...')
// })

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });