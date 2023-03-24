import Axios from 'axios'

const URL = 'http://localhost:3001'

//Matchups
const GetMatchups = async () => {
    const res = await Axios.get(`${URL}/Matchup`)

    if (res) {
        return res
    }
}


//User
const Login = async (userName, password) => {
    const data = {
        userName: userName,
        password: password
    }

    console.log('data', data)
    const res = await Axios.post(`${URL}/Login`, data)

    if (res) {
        return res
    } else {
        console.log('no response')
    }
}

const CreateUser = async (data) => {
    const res = await Axios.post(`${URL}/CreateUser`, data)

    if (res) {
        return res
    } else {
        console.log('could not create user')
    }
}

const GetUser = async (id) => {
    const res = await Axios.get(`${URL}/User`, {params: {id: id}})

    if (res) {
        return res
    } else {
        console.log('could not find user with id:', id)
    }
} 

const UpdateUser = async (user) => {
    const res = await Axios.put(`${URL}/User`, user)

    if (res) {
        return res
    } else {
        console.log('User was not updated')
    }
}

const GetLeaderboard = async () => {
    const res = await Axios.get(`${URL}/Leaderboard`)

    if (res) {
        return res
    } else {
        console.log('no leaderboard')
    }
}

export {
    GetMatchups,
    Login,
    GetUser,
    CreateUser,
    UpdateUser,
    GetLeaderboard,
}