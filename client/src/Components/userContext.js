import React from 'react'

const userContext = React.createContext({
    userLogin: true,
    userName: '',
    user: {
        userName: '',
        userId: ''
    },
    setUserLogin: (usr) => { }, // Placeholder defining the shape of setUserLogin. setUserLogin will be replaced by the setState function
    setUserName: (usr) => { },
    setUser: (usr) => { }
})

export { userContext };