import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState, useContext } from "react";
import "../main.css"
import { useNavigate } from "react-router-dom";
import { Login, CreateUser } from '../../ApiRequests'
import { userContext } from '../userContext';


function LoginPage(props) {
    const navigate = useNavigate()

    const { userLogin } = useContext(userContext)
    const { user } = useContext(userContext)
    const { setUserLogin } = useContext(userContext)
    const { setUser } = useContext(userContext)

    const [showCreateAccount, setShowCreateAccount] = useState(false)
    const [accountAlreadyExists, setAccountAlreadyExists] = useState(false)
    const [couldNotLogin, setCouldNotLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [signUpDisabled, setSignUpDisabled] = useState(false)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const clearFields = () => {
        setUserName('')
        setPassword('')
    }

    const handleClickLogin = () => {
        setShowLogin(!showLogin)
        setShowCreateAccount(false)
        setPassword('')
        setUserName('')
    }

    const handleClickCreateAccount = () => {
        setShowLogin(false)
        setShowCreateAccount(!showCreateAccount)
        setPassword('')
        setUserName('')
    }

    const handleSignIn = async () => {
        if (password == '' || userName == '') {
            return
        }

        const response = await Login(userName, password)

        try {
            if (response.data.length > 0) {
                console.log('response', response)
                localStorage.setItem('userID', response.data[0]._id)
                localStorage.setItem('userName', response.data[0].userName)
                setUser({ userName: response.data[0].userName, userId: response.data[0]._id })
                setUserLogin(true)
                navigate('/')
            } else {
                console.log('could not sign in')
                clearFields()
                setCouldNotLogin(true)
            }
        } catch (err) {
            console.log('could not sign in ERROR')
            clearFields()
            setCouldNotLogin(true)
            console.log(err)
        }

    }

    const NavigateHome = () => {
        navigate('/')
    }

    const handleSignUp = async () => {
        if (password == '' || userName == '') {
            return
        }

        setSignUpDisabled(true)
        const data = {
            userName: userName,
            password: password,
        }
        try {
            const response = await CreateUser(data)
            if (response) {
                console.log(response)
                const userName = response.data.userName
                const id = response.data._id

                localStorage.setItem('userID', id)
                localStorage.setItem('userName', userName)

                setUser({ userName: response.data.userName, userId: response.data._id })
                setUserLogin(true)

                navigate('/')
            } else {
                console.log('no resposne ')
            }
        } catch (err) {
            setSignUpDisabled(false)
            setAccountAlreadyExists(true)
        }

    }

    return (
        <div className="" style={{ paddingTop: '4rem', height: '100vh' }}>
            <div className="container d-flex flex-row align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
                <Card style={{ width: '28rem' }}>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                        <Card.Title style={{ paddingTop: '25px' }}>SLVSH BRACKET</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" style={{ paddingTop: '10px' }}>Welcome</Card.Subtitle>
                        <Button className='w-50' style={{ marginTop: '25px' }} onClick={() => { handleClickLogin() }}>Login</Button>

                        {showLogin &&
                            <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '25px', paddingBottom: '25px' }}>
                                <hr className="w-100"></hr>
                                <div className="row w-50" style={{ paddingTop: '15px', height: '55px' }}>
                                    <input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} onClick={() => { setCouldNotLogin(false) }}></input>
                                </div>
                                <div className="row w-50" style={{ paddingTop: '10px', height: '55px' }}>
                                    <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <Button variant='outline-primary' className="w-50" style={{ marginTop: '10px' }} onClick={() => { handleSignIn() }}>Sign in</Button>
                                {/* {userLogin && <Button className="my-2" variant="outline-secondary">Enter</Button>}
                                <Button variant="secondary" className="my-2" onClick={() => {NavigateHome()}}>Home</Button> */}
                                {couldNotLogin && <div className="pt-2" style={{ color: 'red' }}>Could not login</div>}
                                <hr className="w-100" style={{ marginTop: '30px' }}></hr>
                            </div>
                        }

                        <div className="" style={{ paddingTop: '15px' }}>or</div>
                        <Card.Link className="hover-pointer" onClick={() => { handleClickCreateAccount() }} style={{ paddingTop: '15px' }}>Create Account</Card.Link>
                        {showCreateAccount &&
                            <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '25px', paddingBottom: '25px' }}>
                                <hr className="w-100"></hr>
                                <div className="row w-50" style={{ paddingTop: '15px', height: '55px' }}>
                                    <input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} onClick={() => { setAccountAlreadyExists(false) }}></input>
                                </div>
                                <div className="row w-50" style={{ paddingTop: '10px', height: '55px' }}>
                                    <input placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <Button variant='outline-primary' className="w-50" disabled={signUpDisabled} style={{ marginTop: '10px' }} onClick={() => { handleSignUp() }}>Sign Up</Button>
                                {accountAlreadyExists && <div className="pt-2" style={{ color: 'red', textAlign: 'start' }}>Account Already Exists</div>}
                            </div>

                        }
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;