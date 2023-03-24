import React from 'react'

const userContext = React.createContext({
    userLogin: false,
    userName: '',
    user: {
        userName: '',
        _id: ''
    },
    setUserLogin: (usr) => { }, // Placeholder defining the shape of setUserLogin. setUserLogin will be replaced by the setState function
    setUserName: (usr) => { },
    setUser: (usr) => { }
})

export { userContext };